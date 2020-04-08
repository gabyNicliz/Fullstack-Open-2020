import React from 'react'
import Course from './Course'

const Courses = (props) => {
    const { courses }  = props
  
    return (
      <>
        {courses.map((course, i) => {
          return (
            <div key={i}>
              <Course course={course} />
            </div>
          )
        })}
    </>)
  }

  export default Courses