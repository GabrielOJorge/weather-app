const form = document.getElementById('form');

const getCoordinates = async location => {
  const geoCode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
  const geoCodeData = await geoCode.json();

  const lat = geoCodeData[0].lat;
  const lon = geoCodeData[0].lon;

  return { lat, lon };
};

const getWeatherData = async () => {
  const location = form[0].value;
  const coordinates = await getCoordinates(location);
  const lat = coordinates.lat;
  const lon = coordinates.lon;

  try {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
    const weatherData = await weather.json();
    
    console.log(weatherData);
    return weatherData;
  } catch {
    err => console.log(err);
  }
};

export default getWeatherData;