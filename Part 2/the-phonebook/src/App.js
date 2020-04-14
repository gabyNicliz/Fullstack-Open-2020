import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from  './components/FilterForm'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => { 
      setPersons(initialPersons) 
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let personExists = false
    const personObject = {
      name: newName,
      number: newNumber,
      id:  persons.length + 1
    }

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObject.name) {
        personExists = true
        break
      }
      personExists = false
    }

    if (!personExists) {
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
    } else {
      if (window
        .confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          const personToUpdate = persons.find(p => p.name === newName)
          const updatedPerson = { ...personToUpdate, number: newNumber}
          personService.update(updatedPerson.id, updatedPerson).then(updated =>
            setPersons(persons.map(person =>
              person.name !== newName 
              ? person 
              : updated)))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const removePerson = id => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id).then(() => { 
        setPersons(persons.filter(p => p.id  !== personToDelete.id))
      }).catch((err) => console.log('hehe'))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchFilterChange = (event) => {
    console.log(event.target.value)
    setSearchFilter(event.target.value)
  }

  const personsToSearch = searchFilter 
  ? persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm
        searchFilter={searchFilter}
        handleSearchFilterChange={handleSearchFilterChange}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {personsToSearch.map((person, i) => 
          <Person 
            key={i}
            person={person}
            deleteButton={() => removePerson(person.id)}
          />
        )}
      </div>
    </div>
  )
}

export default App