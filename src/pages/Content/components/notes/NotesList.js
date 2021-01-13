import React, { useContext } from 'react'
import NotesListItem from './NotesListItem'
import NotesContext from '../../../context/NotesContext'
import NotesContainerBallContext from '../../../context/NotesContainerBallContext'


export default (props) => {
  const [notes, set_notes] = useContext(NotesContext)
  const { showingNotesList } = useContext(NotesContainerBallContext)

  return (
    <div style={{ display: showingNotesList ? 'block' : 'none' }}>
      {notes.length > 0 ? notes.map((note) => <NotesListItem note={note} key={note.id} />) : <h1>There are no notes!</h1>}


    </div>
  )
}