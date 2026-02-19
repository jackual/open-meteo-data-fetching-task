// WMO weather code https://weather-sense.leftium.com/wmo-codes
const WMO_EMOJI = {
  0: "☀️",   // Clear sky
  1: "🌤️",  // Mainly clear
  2: "⛅",   // Partly cloudy
  3: "🌥️",  // Overcast
  45: "💨",   // Fog
  48: "💨",   // Icy fog
  51: "🌦️",  // Light drizzle
  53: "🌦️",  // Drizzle
  55: "🌦️",  // Dense drizzle
  56: "🌧️",  // Light freezing drizzle
  57: "🌧️",  // Freezing drizzle
  61: "🌦️",  // Slight rain
  63: "🌧️",  // Moderate rain
  65: "🌧️",  // Heavy rain
  66: "🌧️",  // Light freezing rain
  67: "🌧️",  // Freezing rain
  71: "🌨️",  // Slight snow
  73: "🌨️",  // Moderate snow
  75: "☃️",   // Heavy snow
  77: "🌨️",  // Snow grains
  80: "🌦️",  // Slight showers
  81: "🌧️",  // Moderate showers
  82: "🌧️",  // Violent showers
  85: "🌨️",  // Slight snow showers
  86: "☃️",   // Heavy snow showers
  95: "⛈️",  // Thunderstorm
  96: "🌩️",  // Thunderstorm + light hail
  99: "⚡",   // Thunderstorm + heavy hail
};

let data;

async function getData() {
  const params = {
    latitude: 51.5085,
    longitude: -0.1257,
    current: "apparent_temperature,weather_code",
  };

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  return await response.json();
}

async function setup() {
  createCanvas(400, 400);
  data = await getData();
  noLoop();
}

function draw() {
  let temperature = data?.current.apparent_temperature;
  let weatherCode = data?.current.weather_code;

  background(temperature * 10, 0, temperature * 10);
  textSize(20);
  let date = new Date(data?.current.time).toLocaleDateString().slice(0, -5);
  const textContent = [date, WMO_EMOJI[weatherCode] ?? "❓", `Feels like ${temperature}°C`]
  fill(255);
  text(textContent.join("\t"), 20, 40);
}