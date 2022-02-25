import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../index'

function Weather() {
  const [weather, setWeather] = useState(null)
  const [zip, setZip] = useState('')
  const [unit, setUnit] = useState("metric")

  async function getWeather(unit) {
    try {
      const json = await client.query({
        query: gql`
          getWeather(zip:${zip}, unit:${unit}) {
            temperature
            description
            cod
            message
          }
        `,
      })
      setWeather(json.data.getWeather)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="Weather">
      <h1>Weather App</h1>
      <h4>Powered by GraphQL</h4>

      {weather ? <h1>{weather.data.getWeather.temperature}</h1> : null}

      <form onSubmit={(e) => {
        e.preventDefault()
        getWeather()
      }}>

        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <select
          name="unit"
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value)
            if (weather) {
              setWeather(null)
              getWeather(e.target.value)
            }
          }}
        >
          <option value='metric'>metric</option>
          <option value='imperial'>fahrenheit</option>
          <option value='standard'>kelvin</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {weather && weather.cod === 200 && (
        <div>
          <p>{weather.temperature}</p>
          <p>{weather.description}</p>
        </div>
      )}
      {weather && weather.cod === 404 && <h1>{weather.message}</h1>}
    </div>
  );
}

export default Weather