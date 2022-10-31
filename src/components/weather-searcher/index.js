import getWeatherIcon from "../../js/functions/getWeatherIcon";
import {
  displayResponses,
  getCurrentCoords,
} from "../../js/functions/displayResponses";
import getDateTime from "../../js/functions/getTime";

const form = document.getElementById("form");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const dateTime = document.getElementById("date-time");
const highLowTemp = document.getElementById("high-low-temp");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const tempIcon = document.getElementById("temp-icon");
const unitBtns = document.querySelectorAll(".main-btn.-unit");

const getWeatherData = async (lat, lon, units) => {
  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=c0ce5c434457e791f019f4b386f41af3`,
      { mode: "cors" }
    );
    const weatherData = await weather.json();

    const data = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temp: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      description: weatherData.weather[0].description.replace(/^\w/, (c) =>
        c.toUpperCase()
      ),
      maxTemp: Math.round(weatherData.main.temp_max),
      minTemp: Math.round(weatherData.main.temp_min),
      windSpeed: Math.round(weatherData.wind.speed * 10) / 10,
      humidity: weatherData.main.humidity,
      icon: weatherData.weather[0].main,
    };

    return data;
  } catch {
    (err) => console.log(err);
  }
};

const displayWeatherData = async (lat, lon, units = "metric") => {
  const weatherData = await getWeatherData(lat, lon, units);

  const unitsSymbols = {};

  if (units === "metric") {
    unitsSymbols.temp = "°C";
    unitsSymbols.speed = "m/s";
  } else {
    unitsSymbols.temp = "°F";
    unitsSymbols.speed = "mph";
  }

  dateTime.textContent = getDateTime();
  city.textContent = `${weatherData.city}, ${weatherData.country}`;
  temp.textContent = `${weatherData.temp}${unitsSymbols.temp}`;
  description.textContent = `Feels like ${weatherData.feelsLike}${unitsSymbols.temp}. ${weatherData.description}`;
  highLowTemp.textContent = `The high will be ${weatherData.maxTemp}${unitsSymbols.temp}, the low will be ${weatherData.minTemp}${unitsSymbols.temp}`;
  windSpeed.textContent = `Wind speed: ${weatherData.windSpeed}${unitsSymbols.speed}`;
  humidity.textContent = `Humidity ${weatherData.humidity}%`;
  tempIcon.className = getWeatherIcon(weatherData.icon);
};

unitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentCoords = getCurrentCoords();
    const currentLat = currentCoords.currentLat;
    const currentLon = currentCoords.currentLon;

    displayWeatherData(currentLat, currentLon, btn.value);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayResponses();
});

window.addEventListener("load", () => {
  displayWeatherData(51.50853, -0.12574);
});

export default displayWeatherData;
