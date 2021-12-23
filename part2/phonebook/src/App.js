import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification';
import phonebookServices from './services/phonebook';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSucessMessage] = useState(true);

  useEffect(() => {
    console.log('effect')
    phonebookServices
      .getAll()
      .then(initialPerson => {
        console.log('premise fulfilled')
        setPersons(initialPerson);
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const res = window.confirm(
        `${newName} is already added to the phonebook, 
        replace old number?`
      )
      if(res){
        const newGuy = persons.find(p => p.name === newName);
        const changedGuy = {...newGuy, number: newNumber};

        phonebookServices
          .update(changedGuy.id, changedGuy).then(returnedGuy => {
            console.log('map');
            setPersons(persons.map(person => 
              person.id !== changedGuy.id 
                ? person : returnedGuy
            ));
          })
          .catch(error => {
            setSucessMessage(false);
            setErrorMessage(`information on ${newName} has already been removed from server`);
            setPersons(persons.filter(n => n.name !== newName))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
            
          })
      }
    } 
    else {
      const newPerson = {
        name: newName, 
        number: newNumber,
        id: persons.length+1,
      }

      phonebookServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setFilter('');

          setSucessMessage(true)
          setErrorMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.message)
        })

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

  const deleteFromBook = (id) =>{
    
    console.log('start deleting');
    const person = persons.find(p => p.id === id);
    const changedPerson = {...persons };
    const answer = window.confirm(`delete ${person.name}?`);


    if(!answer){
      return;
    }


    phonebookServices
      .remove(id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
        console.log('true')
        setSucessMessage(true);
        setErrorMessage(
          `Deleted ${person.name}`
        );
        setPersons(persons.filter(n => n.id !== id))
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
      })
      .catch(error => {

        setSucessMessage(false);
        setErrorMessage(
          `that person was already deleted`
        )
        setPersons(persons.filter(n => n.id !== id))
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
      })
  }

  const results = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log(results)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {errorMessage} state = {successMessage} />
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
      <Phonebook persons = {results} deleteFromBook = {deleteFromBook} />

    </div>
  )
}

export default App