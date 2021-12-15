import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import axios from 'axios'

const App = () => {
   const [ persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('premise fulfilled')
      setPersons(response.data);
    })
  }, [])
  console.log('render', persons.length, 'notes')

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} has already been added to the phonebook.`)
    } 
    else {
      const newPerson = {
        id: persons.length+1,
        name: newName, 
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setFilter('')
      console.log('new contact created')
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const results = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log(results)
  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Search</h2>
      <Filter filter = {filter} handleFilter = {handleFilter}/>
      <h2>Add contact</h2>
      <PersonForm persons = {persons} 
        setPersons = {setPersons} 
        addNewName = {addNewName} 
        name = {newName} 
        handleNewName = {handleNewName}
        number = {newNumber} 
        handleNewNumber = {handleNewNumber}
      />
      <h2>Numbers</h2>
      <Phonebook persons = {results} />

    </div>
  )
}

export default App