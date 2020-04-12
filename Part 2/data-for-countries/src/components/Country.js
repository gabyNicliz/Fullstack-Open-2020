import React from 'react'
import Languages from './Languages'
import CountryFlag from './CountryFlag'
import Weather from './Weather'

const Country = (props) => {
  const { country } = props
  return (
    <>
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>{country.population}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <CountryFlag country={country} />
      <Weather countryCapital={country.capital} />
    </>
  )
}

export default Country