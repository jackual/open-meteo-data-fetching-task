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
    current: [
      "apparent_temperature",
      "weather_code"
    ],
    daily: [
      "weather_code",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_probability_max"
    ],
    forecast_days: 15,
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
  textFont("Source Code Pro");
  textSize(12);
  fill(255);

  const days = data?.daily?.time?.map((time, i) => {
    let date = new Date(time).toLocaleDateString([], { month: "2-digit", day: "2-digit" });
    let emoji = WMO_EMOJI[data.daily.weather_code[i]] ?? "❓";
    let max = Math.round(data.daily.apparent_temperature_max[i]);
    let min = Math.round(data.daily.apparent_temperature_min[i]);
    let pop = data.daily.precipitation_probability_max[i];
    return { date, emoji, max, min, pop };
  });

  const colX = [20, 90, 140, 200, 255, 310];
  const rowH = 22;

  textStyle(BOLD);
  textSize(13);
  text("DATE", colX[0], 24);
  text("SKY", colX[1], 24);
  text("HIGH", colX[2], 24);
  text("LOW", colX[3], 24);
  text("PoP", colX[4], 24);

  textSize(12);
  (days ?? []).forEach(({ date, emoji, max, min, pop }, i) => {
    const y = 24 + rowH + i * rowH;
    text(date, colX[0], y);
    text(emoji, colX[1], y);
    text(`${max}°C`, colX[2], y);
    text(`${min}°C`, colX[3], y);
    text(`${pop}%`, colX[4], y);
  });
}