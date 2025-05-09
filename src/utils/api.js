const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeatherData(city, coords = null) {
  let url

  if (city) {
    url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
  } else if (coords) {
    url = `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`
  } else {
    throw new Error("Se requiere una ciudad o coordenadas")
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error al obtener datos del clima: ${response.statusText}`)
  }

  return await response.json()
}

export async function fetchForecastData(city, coords = null) {
  let url

  if (city) {
    url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
  } else if (coords) {
    url = `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`
  } else {
    throw new Error("Se requiere una ciudad o coordenadas")
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error al obtener datos del pronóstico: ${response.statusText}`)
  }

  return await response.json()
}

export function fetchDayDetails(forecastData, selectedDate) {
  // Filtrar los datos para el día seleccionado
  return forecastData.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    })
    return forecastDate === selectedDate
  })
}

export async function fetchHourlyData(city, coords = null, selectedDate) {
  // Obtener los datos del pronóstico
  const forecastData = await fetchForecastData(city, coords)

  // Filtrar los datos para el día seleccionado
  const hourlyData = forecastData.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    return forecastDate === selectedDate
  })

  return hourlyData
}