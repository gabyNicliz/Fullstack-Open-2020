import React, { useState } from 'react'
import ShowPersons from './components/ShowPersons'
import FilterForm from  './components/FilterForm'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let personExists = false
    const personObject = {
      name: newName,
      number: newNumber
    }

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObject.name) {
        personExists = true
        break
      }
      personExists = false
    }

    personExists 
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <ShowPersons 
        personsToSearch={personsToSearch}
      />
    </div>
  )
}

export default App