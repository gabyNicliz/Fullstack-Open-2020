import React from 'react'
import Person from './Person'

const ShowPersons = (props) => {
    const { personsToSearch } = props
    return (
      <div>
        {personsToSearch.map((person, i) =>
          <Person key={i} person={person} />
        )}
      </div>
    )
  }

export default ShowPersons