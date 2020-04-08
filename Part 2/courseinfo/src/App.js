import React from 'react'
import Courses from './components/Courses'

const App = (props) => {
  const { courses } = props
  
  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App