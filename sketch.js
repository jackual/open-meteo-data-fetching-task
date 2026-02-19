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
  // Check that we have the data in the console 👀
  console.log(data?.current);

  // Get the temperature & weather code 🌡
  let temperature = data?.current.apparent_temperature;
  let weatherCode = data?.current.weather_code;

  // Set the background colour using that variable temperature 🎨
  background(temperature * 10, 0, temperature * 10);

  // Show the WMO weather emoji ⛅
  fill('white');
  textAlign(CENTER);
  textSize(80);
  let emoji = WMO_EMOJI[weatherCode] ?? "❓";
  text(emoji, width / 2, height / 2);

  // Write the temperature at the bottom of the canvas 📝
  textSize(20);
  text(`It feels like ${temperature}°C outside`, width / 2, height - 20);
}