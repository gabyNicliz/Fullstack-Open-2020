import React from 'react'

const Person = ({ person, deleteButton }) => {
    return (
      <>
        <p>
          {person.name} {person.number} <button onClick={deleteButton}>delete</button>
        </p>
      </>
    )
  }

export default Person