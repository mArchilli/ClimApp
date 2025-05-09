"use client"

import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastToggle from "./components/ForecastToggle"
import LoadingSpinner from "./components/LoadingSpinner"
import ErrorMessage from "./components/ErrorMessage"
import { fetchWeatherData, fetchForecastData } from "./utils/api"
import "./App.css"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState("")

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLoading(true)
          try {
            const weather = await fetchWeatherData(null, { lat: latitude, lon: longitude })
            setWeatherData(weather)
            const forecast = await fetchForecastData(null, { lat: latitude, lon: longitude })
            setForecastData(forecast)
            setCity(weather.name)
          } catch (err) {
            setError("No se pudo obtener el clima para tu ubicación")
            console.error(err)
          } finally {
            setLoading(false)
          }
        },
        () => {
          handleSearch("Buenos Aires")
        },
      )
    } else {
      handleSearch("Buenos Aires")
    }
  }, [])

  const handleSearch = async (searchCity) => {
    if (!searchCity) return

    setLoading(true)
    setError(null)

    try {
      const weather = await fetchWeatherData(searchCity)
      setWeatherData(weather)

      const forecast = await fetchForecastData(searchCity)
      setForecastData(forecast)

      setCity(searchCity)
    } catch (err) {
      setError(`No se pudo encontrar el clima para "${searchCity}"`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Preparar datos para ForecastToggle
  const dailyForecasts = []
  const hourlyForecasts = []
  if (forecastData) {
    const dailyGrouped = {}
    forecastData.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000)
      const day = date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "numeric" })

      if (!dailyGrouped[day] || date.getHours() === 12) {
        dailyGrouped[day] = forecast
      }

      // Filtrar datos horarios para el día actual
      const today = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "numeric", day: "numeric" })
      const forecastDate = date.toLocaleDateString("es-ES", { year: "numeric", month: "numeric", day: "numeric" })
      if (forecastDate === today) {
        hourlyForecasts.push(forecast)
      }
    })
    dailyForecasts.push(...Object.values(dailyGrouped).slice(0, 5))
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-black">
      <header className="text-blue-600 p-4">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-xl font-bold mb-4 sm:mb-0">ClimApp</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>
  
      <main className="flex-grow max-w-screen-xl md:mx-auto p-4">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            {weatherData && <WeatherCard weatherData={weatherData} city={city} />}
            {forecastData && (
              <ForecastToggle 
                dailyForecasts={dailyForecasts} 
                hourlyForecasts={hourlyForecasts} 
                buttonStyles={{
                  base: "w-1/2 py-3 text-center font-semibold transition-colors",
                  selected: "bg-white text-blue-600 border-b-4 border-blue-600",
                  unselected: "bg-gray-100 text-gray-600 hover:bg-gray-200",
                }}
              />
            )}
          </>
        )}
      </main>
  
      <footer className="bg-white text-gray-400 p-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>Desarrollado con React, Vite y Tailwind CSS</p>
          <p className="text-sm mt-1">Datos proporcionados por{" "}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              OpenWeatherMap API
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App