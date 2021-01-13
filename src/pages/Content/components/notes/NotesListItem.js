import React, { useState, useContext } from 'react'
import getClient from '../../../shared/utils/getClient'
import { deleteNote } from '../../../shared/gql_operations/mutations'
import TokenContext from '../../../context/TokenContext'
import NotesContext from '../../../context/NotesContext'
import EditModeContext from '../../../context/EditModeContext'
import CategoriesContainer from '../categories/CategoriesContainer'
import handlingCatChangesLogic from '../../utils/handlingCatChangesLogic'
import ConnectedCategoriesContext from '../../../context/ConnectedCategoriesContext'
import _ from 'lodash'

export default ({ note }) => {
  const [token] = useContext(TokenContext)
  const [notes, set_notes] = useContext(NotesContext)
  const [starStatus, set_starStatus] = useState(note.starred)
  const [content, set_content] = useState(note.content)
  const [time, set_time] = useState(note.time)
  const [preEditScalars, set_preEditScalars] = useState({
    content: note.content,
    time: note.time,
    starred: note.starred
  })

  const [initialCategories, set_initialCategories] = useState(note.categories)
  const [connectedCategories, set_connectedCategories] = useState(note.categories)

  const [editMode, set_editMode] = useState(false)

  // const [contentWriteTimer, set_contentWriteTimer] = useState(null)

  const handleEditModeChange = async (e) => {
    if (editMode) {
      console.log('exiting edit mode initiated')
      const dataTest = {
        content,
        time,
        starred: starStatus,
      }
      let data = {}
      console.log(preEditScalars, dataTest)
      if (!_.isEqual(preEditScalars, dataTest)) data = dataTest;


      console.log('debugging this, before calling handleingCatChangesLogic', initialCategories, connectedCategories, token, note.id, data)
      const result = await handlingCatChangesLogic(initialCategories, connectedCategories, token, note.id, data, 'note')
      console.log(result, 'logging note result debug')
      if (result) {
        set_preEditScalars({
          time: result.time,
          starred: result.starred,
          content: result.content
        })

        set_content(result.content)
        set_starStatus(result.starred)
        set_time(result.time)
        set_initialCategories(result.categories)
        set_editMode(!editMode)
      } else {
        set_editMode(!editMode)
      }
    } else {
      set_editMode(!editMode)
    }

  }

  const handleRemoveNote = async (e) => {
    const client = getClient(token)
    const variables = {
      id: note.id
    }
    const data = await client.mutate({ mutation: deleteNote, variables })
    console.log('deleteNote', data.data.deleteNote)
    set_notes(notes.filter((note) => note.id !== data.data.deleteNote.id))
  }

  return (
    <div>
      {editMode ? <input type="text" value={content} onChange={(e) => set_content(e.target.value)} /> : <p>{content}</p>}
      {editMode ? <input type="text" value={time} onChange={(e) => set_time(e.target.value)} /> : <p>{time}</p>}
      <div>
        <label htmlFor="__star-status" autoComplete="off">star status </label>
        <input type="checkbox" checked={starStatus} onChange={editMode ? ((e) => set_starStatus(!starStatus)) : undefined} id='__star-status' />
      </div>

      <EditModeContext.Provider value={[editMode]}>
        <ConnectedCategoriesContext.Provider value={[connectedCategories, set_connectedCategories]}>
          <CategoriesContainer />
        </ConnectedCategoriesContext.Provider>
      </EditModeContext.Provider>

      <button onClick={handleEditModeChange}><h3>{editMode ? 'save' : 'edit'}</h3></button>
      <button onClick={handleRemoveNote}><h3>remove</h3></button>
      <button onClick={() => console.log(JSON.stringify(note, null, 2))}><h3>info</h3></button>
    </div>
  )
}