import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from  './components/FilterForm'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

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
          setPersons(persons.concat(returnedPerson))
          
          setErrorMessage(
            `Added ${returnedPerson.name}`
          )
          
          setIsError(false)

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        })
    } else {
      if (window
        .confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          const personToUpdate = persons.find(p => p.name === newName)
          const updatedPerson = { ...personToUpdate, number: newNumber}
          personService
            .update(updatedPerson.id, updatedPerson)
            .then(updated => {
              setPersons(persons.map(person =>
                person.name !== newName 
                ? person 
                : updated))
                
                setErrorMessage(
                  `${personToUpdate.name}'s phone number was updated`
                )
              
                setIsError(false)

                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              }
            ).catch(err => {
                setErrorMessage(
                  `${personToUpdate.name} was already deleted from the server`
                )
                
                setIsError(true)

                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              }
            )

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
        
        setErrorMessage(
          `${personToDelete.name} was deleted`
        )
        
        setIsError(false)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(err => {
        setErrorMessage(
          `${personToDelete.name} was already deleted from the server`
        )
        
        setIsError(true)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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
      <Notification 
        message={errorMessage} 
        isError={isError}
      />
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