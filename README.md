# London Weather Forecast

A p5.js sketch that fetches live weather data from the [Open-Meteo API](https://open-meteo.com/) and displays a 16-day forecast for London on a canvas.

Based on https://editor.p5js.org/jclarke-arts/sketches/zmH3MHaym

## What it shows

```text
| DATE   | Day of the forecast (DD/MM)      |
| SKY    | WMO weather condition emoji      |
| HIGH   | Max apparent temperature (°C)    |
| LOW    | Min apparent temperature (°C)    |
| PoP    | Probability of precipitation (%) |
```

The canvas background colour is driven by the current apparent temperature.

## Weather emojis

WMO condition codes are mapped to emojis using the [weather-sense WMO code table](https://weather-sense.leftium.com/wmo-codes):