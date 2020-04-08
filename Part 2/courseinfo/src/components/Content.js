import React from 'react'

const Content = (props) => {
  const { parts } = props
  return (
    <>
      {parts.map((part, i) => 
        <p key={i}>
          {part.name} {part.exercises}
        </p>)}
    </>
  )
}

export default Content