import React from 'react'

const Total = (props) => {
  const { parts } = props

  let totalAmountOfExercises = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <>
      <p>
        <strong>Total of {totalAmountOfExercises} exercises</strong>
      </p>
    </>
  )
}

export default Total