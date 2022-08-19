/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const form = document.getElementById('form');

const getCoordinates = async location => {
  const geoCode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
  const geoCodeData = await geoCode.json();

  const lat = geoCodeData[0].lat;
  const lon = geoCodeData[0].lon;

  return { lat, lon };
};

const getWeatherData = async location => {
  const coordinates = await getCoordinates(location);
  const lat = coordinates.lat;
  const lon = coordinates.lon;

  try {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}units=${units}&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
    const weatherData = await weather.json();
    
    console.log(weatherData);
    return weatherData;
  } catch {
    err => console.log(err);
  }
};
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0EsZ0ZBQWdGLFNBQVMsb0RBQW9ELGNBQWM7QUFDM0o7O0FBRUE7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUYsSUFBSSxPQUFPLElBQUksUUFBUSxNQUFNLDRDQUE0QyxjQUFjO0FBQzlLO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJyk7XG5cbmNvbnN0IGdldENvb3JkaW5hdGVzID0gYXN5bmMgbG9jYXRpb24gPT4ge1xuICBjb25zdCBnZW9Db2RlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtsb2NhdGlvbn0mbGltaXQ9MSZhcHBpZD1jMGNlNWM0MzQ0NTdlNzkxZjAxOWY0YjM4NmY0MWFmM2AsIHsgbW9kZTogJ2NvcnMnIH0pXG4gIGNvbnN0IGdlb0NvZGVEYXRhID0gYXdhaXQgZ2VvQ29kZS5qc29uKCk7XG5cbiAgY29uc3QgbGF0ID0gZ2VvQ29kZURhdGFbMF0ubGF0O1xuICBjb25zdCBsb24gPSBnZW9Db2RlRGF0YVswXS5sb247XG5cbiAgcmV0dXJuIHsgbGF0LCBsb24gfTtcbn07XG5cbmNvbnN0IGdldFdlYXRoZXJEYXRhID0gYXN5bmMgbG9jYXRpb24gPT4ge1xuICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGdldENvb3JkaW5hdGVzKGxvY2F0aW9uKTtcbiAgY29uc3QgbGF0ID0gY29vcmRpbmF0ZXMubGF0O1xuICBjb25zdCBsb24gPSBjb29yZGluYXRlcy5sb247XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2xhdH0mbG9uPSR7bG9ufXVuaXRzPSR7dW5pdHN9JmFwcGlkPWMwY2U1YzQzNDQ1N2U3OTFmMDE5ZjRiMzg2ZjQxYWYzYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG4gIH0gY2F0Y2gge1xuICAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==