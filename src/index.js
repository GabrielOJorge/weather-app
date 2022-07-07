const form = document.getElementById('form');

const getCoordinates = async location => {
  const geoCode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
  const geoCodeData = await geoCode.json();

  const lat = geoCodeData[0].lat;
  const lon = geoCodeData[0].lon;

  return { lat, lon };
};