import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${countryCapital}`)
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

export default Weather