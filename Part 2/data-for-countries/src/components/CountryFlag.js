import React from 'react'

const CountryFlag = (props) => {
  const { country } = props
  
  return (
    <img 
      src={country.flag} 
      alt={`${country.name} flag`} 
      height={"125"} 
      width={"125"} 
    />
  )
}

export default CountryFlag