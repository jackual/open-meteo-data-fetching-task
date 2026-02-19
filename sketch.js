let data;

async function getData() {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=apparent_temperature`);
  return await response.json();
}

async function setup() {
  createCanvas(400, 400);
  data = await getData();
  noLoop();
}

function draw() {
  // Check that we have the data in the console 👀
  console.log(data?.current.apparent_temperature);
              
  // Get the temperature value & assign it to a variable 🌡
  let temperature = data?.current.apparent_temperature;
              
  // Set the background colour using that variable temperature 🎨
  background(temperature * 10, 0, temperature * 10);
  
  // If it is below 7.5°C show a 🥶 emoji, otherwise a 😐
  fill('white');
  textAlign(CENTER);
  textSize(80);
  if (temperature < 7.5)  {
    text("🥶", width/2, height/2);
  } else {
    text("😐", width/2, height/2);
  }
  
  // Write the temperature at the bottom of the canvas 📝
  textSize(20);
  text(`It feels like ${temperature}°C outside`, width/2, height-20);
}