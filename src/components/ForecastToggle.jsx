import { useState } from "react"
import { getWeatherIcon } from "../utils/weatherIcons"

function ForecastToggle({ dailyForecasts, hourlyForecasts }) {
  const [view, setView] = useState("daily") // "daily" para pronóstico diario, "hourly" para pronóstico por hora

  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
      {/* Botones de alternancia */}
      <div className="flex justify-center mb-6 bg-gray-100 rounded-lg overflow-hidden">
        <button
          onClick={() => setView("daily")}
          className={`w-1/2 py-3 font-semibold text-center transition-colors ${
            view === "daily"
              ? "bg-white text-blue-600 border-b-4 border-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pronóstico diario
        </button>
        <button
          onClick={() => setView("hourly")}
          className={`w-1/2 py-3 font-semibold text-center transition-colors ${
            view === "hourly"
              ? "bg-white text-blue-600 border-b-4 border-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pronóstico por hora
        </button>
      </div>

      {/* Contenedor de pronósticos */}
      <div
        className={`grid gap-4 min-h-[200px] ${
          view === "daily" ? "grid-cols-1 sm:grid-cols-5" : "grid-cols-1 sm:grid-cols-4"
        }`}
      >
        {view === "daily" &&
          dailyForecasts.map((forecast, index) => {
            const date = new Date(forecast.dt * 1000)
            const day = date.toLocaleDateString("es-ES", { weekday: "long" })
            const temp = Math.round(forecast.main.temp)
            const icon = getWeatherIcon(forecast.weather[0].icon)

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg capitalize text-gray-700">{day}</h3>
                <div className="text-4xl my-2">{icon}</div>
                <p className="text-2xl font-bold text-blue-600">{temp}°C</p>
                <p className="text-sm text-gray-500 capitalize">{forecast.weather[0].description}</p>
              </div>
            )
          })}

        {view === "hourly" &&
          hourlyForecasts.map((hour, index) => {
            const time = new Date(hour.dt * 1000).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })
            const temp = Math.round(hour.main.temp)
            const icon = getWeatherIcon(hour.weather[0].icon)

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg capitalize text-gray-700">{time}</h3>
                <div className="text-4xl my-2">{icon}</div>
                <p className="text-2xl font-bold text-blue-600">{temp}°C</p>
                <p className="text-sm text-gray-500 capitalize">{hour.weather[0].description}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ForecastToggle