import React, { useState, useEffect } from 'react';
import ShowCountries from './components/ShowCountries'
import axios from 'axios';

const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ searchFilter, setSearchFilter ] = useState('')

  console.log(process.env.REACT_APP_WEATHER_API_KEY)

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }, [])

  const handleSearchFilterChange = (event) => {
    console.log(event.target.value)
    setSearchFilter(event.target.value)
  }

  const countriesSearched = searchFilter
  ? countries.filter(country => country.name.toLowerCase().includes(searchFilter.toLowerCase()))
  : countries

  return (
    <div>
      <div>
        find countries
        <input 
          value={searchFilter}
          onChange={handleSearchFilterChange}
        />
      </div>
      <ShowCountries 
        countries={countriesSearched} 
        handleSearchFilterChange={handleSearchFilterChange}
      />
    </div>
  )
}

export default App;
