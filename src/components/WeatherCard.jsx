import { getWeatherIcon } from "../utils/weatherIcons"

function WeatherCard({ weatherData, city }) {
  if (!weatherData) return null

  const { main, weather, wind } = weatherData
  const temperature = Math.round(main.temp)
  const feelsLike = Math.round(main.feels_like)
  const description = weather[0].description
  const icon = getWeatherIcon(weather[0].icon)

  // Formatear la fecha actual
  const currentDate = new Date()
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  const formattedDate = currentDate.toLocaleDateString("es-ES", options)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Encabezado con fondo degradado */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{city}</h2>
          <p className="text-sm">{formattedDate}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-blue-600">{temperature}°</p>
          <p className="text-gray-600 capitalize">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 md:mt-0">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Humedad</p>
            <p className="text-lg font-medium text-blue-600">{main.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Viento</p>
            <p className="text-lg font-medium text-blue-600">{Math.round(wind.speed * 3.6)} km/h</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Sensación térmica</p>
            <p className="text-lg font-medium text-blue-600">{feelsLike}°C</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard