import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from '../src/index'

function Weather() {
  const [zip, setZip] = useState('')
  const [weather, setWeather] = useState(null)

  async function getWeather() {
    try {
      const json = await client.query({
        query: gql`
          getWeather(zip:${zip}) {
            temperature
            description
          }
        `
      })
    } catch (err) {
      console.log(err.message)
    }


  }

  return (
    <div className="Weather">
      <form>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Weather