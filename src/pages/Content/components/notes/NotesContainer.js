import AddNote from "./AddNote"
import React, { useState } from 'react'

import NotesList from "./NotesList"
import NotesContext from "../../../context/NotesContext"
import NotesContainerBallContext from "../../../context/NotesContainerBallContext"

export default (props) => {
  const [notes, set_notes] = useState(props.video.notes)
  const [showingNotesList, set_showingNotesList] = useState(false)
  const [showingAddNote, set_showingAddNote] = useState(false)

  return (
    <React.Fragment>
      <NotesContainerBallContext.Provider value={{ showingAddNote, showingNotesList }}>
        <NotesContext.Provider value={[notes, set_notes]}>
          <AddNote video={props.video} />
          <NotesList notes={notes} video={props.video} />
        </NotesContext.Provider>
      </NotesContainerBallContext.Provider>

      <div className="__round-container">
        <div className="__left-half">
          <div onClick={() => set_showingNotesList(!showingNotesList)} style={{ backgroundColor: showingNotesList && 'green' }}></div>
          <div></div>
        </div>
        <div className="__add-note" onClick={() => set_showingAddNote(!showingAddNote)} style={{ backgroundColor: showingAddNote && 'green' }} ></div>
      </div>
    </React.Fragment>
  )
}