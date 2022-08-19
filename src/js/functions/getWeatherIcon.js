const getWeatherIcon = icon => {
  const lowerCaseIcon = icon.toLowerCase()

  const iconsObj = {
    clear: 'fa-solid fa-sun',
    clouds: 'fa-solid fa-cloud',
    rain: 'fa-solid fa-cloud-rain',
    drizzle: 'fa-solid fa-cloud-rain',
    thunderstorm: 'fa-solid fa-cloud-bolt',
    snow: 'fa-solid fa-snowflake',
  };

  return iconsObj[lowerCaseIcon] ? iconsObj[lowerCaseIcon] : 'fa-solid fa-smog';
};

export default getWeatherIcon;