import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Weather = (props) => {
  const {countryCapital } = props
  const [ weather, setWeather ] = useState(
    {
      current: {
        observation_time: "",
        temperature: 0,
        weather_code: 0,
        weather_icons: [
        ""
        ],
        weather_descriptions: [
        ""
        ],
        wind_speed: 0,
        wind_degree: 0,
        wind_dir: "",
        pressure: 0,
        precip: 0,
        humidity: 0,
        cloudcover: 0,
        feelslike: 0,
        uv_index: 0,
        visibility: 0,
        is_day: ""
      }
    }
  )

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=bc20330bd3d5f69d5ed7fcbac6862e17&query=${countryCapital}`)
      .then(response => {
        setWeather(response.data.current)
        console.log(weather)
      })
  }, [countryCapital])

  return (
    <div>
      <h2>Wheather in {countryCapital}</h2>
      <p>temperature: {weather.temperature} Celcius</p>
      <img 
        src={weather.weather_icons} 
        alt={weather.weather_descriptions}
      />
      <p><strong>wind:</strong> {weather.wind_speed} kph direction {weather.wind_dir}</p>
    </div>
  )
}

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

const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ searchFilter, setSearchFilter ] = useState('')

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
