import React, { useState, useEffect } from 'react'
import Country from './Country'

const ShowCountries = (props) => {
  const { countries } = props
  
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <Country country={country} />
      </div>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((country, i) =>
          <form key={i}>
            {country.name}
            <button
              value={country.name}
              onClick={props.handleSearchFilterChange}>
                show
            </button>
          </form>
        )}
      </div>
    )
  } else {
    return ( 
      <div> 
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default ShowCountries