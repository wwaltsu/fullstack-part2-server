import { useEffect, useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  console.log(selectedCountry)
  console.log(weather)

  let displayedCountry = null

  if (selectedCountry) {
    displayedCountry = selectedCountry
  } else if (filteredCountries.length === 1) {
    displayedCountry = filteredCountries[0]
  }

  let lat = null
  let lon = null

  if (displayedCountry) {
    lat = displayedCountry.capitalInfo.latlng[0]
    lon = displayedCountry.capitalInfo.latlng[1]
  }

  useEffect(() => {
    if (lat && lon)
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          setWeather(response.data)
        })
  }, [lat, lon])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const renderWeatherInformation = () => {
    if (weather)
      return (
        <>
          <h2>Weather in {displayedCountry.capital}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )
  }

  const renderCountryInformation = (country) => {
    if (country)
      return (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {' '}
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
        </>
      )
  }

  const renderSearchResults = () => {
    if (search === '') return null

    if (filteredCountries.length > 10) {
      return <div>Too many matches</div>
    }

    if (filteredCountries.length === 1) {
      return (
        <>
          {renderCountryInformation(displayedCountry)}
          {renderWeatherInformation()}
        </>
      )
    }

    if (selectedCountry) {
      return (
        <>
          {renderCountryInformation(selectedCountry)}
          {renderWeatherInformation()}
        </>
      )
    }

    return filteredCountries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}
        <button onClick={() => handleShowCountry(country)}>Show</button>
      </div>
    ))
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <div>
      <>
        find countries <input value={search} onChange={handleSearch} />
        {renderSearchResults()}
      </>
    </div>
  )
}

export default App
