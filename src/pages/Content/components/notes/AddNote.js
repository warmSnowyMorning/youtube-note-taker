import React, { useContext, useState } from 'react'
import NotesContext from '../../../context/NotesContext'
import TokenContext from '../../../context/TokenContext'
import getClient from '../../../shared/utils/getClient'
import { createNote } from '../../../shared/gql_operations/mutations'
import NotesContainerBallContext from '../../../context/NotesContainerBallContext'

export default (props) => {
  const { video } = props
  // const [notes, set_notes] = useContext(NotesContext)
  const [content, set_content] = useState('')
  const [star_note, set_star_note] = useState(false)
  const [token] = useContext(TokenContext)
  const [notes, set_notes] = useContext(NotesContext)

  const handleAddNote = (e) => {
    e.preventDefault()
    console.log('init handleAddNote')
    const client = getClient(token)

    const time = document.querySelector('.ytp-time-current').innerHTML
    const variables = {
      data: {
        starred: star_note,
        content,
        videoId: video.id,
        time,
      }
    }

    client.mutate({
      mutation: createNote,
      variables
    }).then((res) => {
      console.log(res.data.createNote)
      set_content('')
      set_star_note(false)
      set_notes([...notes, res.data.createNote])
    }, (err) => console.log(err))
    console.log(variables)
  }
  const { showingAddNote } = useContext(NotesContainerBallContext)
  return (
    <div style={{ display: showingAddNote ? 'block' : 'none' }} className="__add-note-container">
      <form action="" onSubmit={handleAddNote}>
        <textarea name="__note-content" id="__note-content" onChange={(e) => set_content(e.target.value)}></textarea>

        <div className="__create-star-note">
          <input type="submit" value="create" className='__create-input' />
          <label htmlFor="__star-note" autoComplete="off">
            <input type="checkbox" onChange={(e) => set_star_note(!star_note)} id='__star-note' />
              &nbsp;Star
          </label>
        </div>
      </form>
    </div>
  )
}