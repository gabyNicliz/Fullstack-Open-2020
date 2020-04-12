import React from 'react'

const Languages = (props) => {
  const { languages } = props
  console.log(languages)
  if (languages.length > 1) {
    return (
      <ul>
          {languages.map((language, i) =>
          <li key={i}>{language.name}</li>
        )}
      </ul>
    )  
  } else {
    return (
      <ul>
        <li>{languages[0].name}</li>
      </ul>
    )
  }
}

export default Languages