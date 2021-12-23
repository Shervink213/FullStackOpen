import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteServices from './services/notes';
import Notification from './components/Notification';

const Footer = () =>{
  const footerStyle = {    
    color: 'green',    
    fontStyle: 'italic',    
    fontSize: 16  
  }
  return(
    <div style={footerStyle}>
      <br />
      <em>Note app, made by Sherv</em>
    </div>
  )
  
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('effect')
    noteServices
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteServices
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const toggleImportanceOf= (id) => {
    const note  = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteServices
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() =>{
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
            <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
      <Footer />
    </div>
  )
}

export default App