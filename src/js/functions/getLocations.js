const getLocations = async location => {
  const geoCode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
  const geoCodeData = await geoCode.json();

  return geoCodeData;
};

export default getLocations;