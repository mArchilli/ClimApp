// Mapeo de códigos de iconos de OpenWeatherMap a emojis
export function getWeatherIcon(iconCode) {
    const iconMap = {
      "01d": "☀️", // día despejado
      "01n": "🌙", // noche despejada
      "02d": "⛅", // día con algunas nubes
      "02n": "☁️", // noche con algunas nubes
      "03d": "☁️", // nubes dispersas
      "03n": "☁️", // nubes dispersas
      "04d": "☁️", // nubes rotas
      "04n": "☁️", // nubes rotas
      "09d": "🌧️", // lluvia ligera
      "09n": "🌧️", // lluvia ligera
      "10d": "🌦️", // lluvia durante el día
      "10n": "🌧️", // lluvia durante la noche
      "11d": "⛈️", // tormenta
      "11n": "⛈️", // tormenta
      "13d": "❄️", // nieve
      "13n": "❄️", // nieve
      "50d": "🌫️", // niebla
      "50n": "🌫️", // niebla
    }
  
    return iconMap[iconCode] || "🌤️" // emoji por defecto si no se encuentra el código
  }
  