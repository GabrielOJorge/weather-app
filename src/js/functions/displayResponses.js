import displayWeatherData from "../../components/weather-searcher";
import getLocations from "../../js/functions/getLocations";

let currentLat;
let currentLon;

const createResponseDiv = () => {
  const div = document.createElement('div');
  const h3 = document.createElement('h3');

  h3.classList.add('responses');
  div.append(h3);

  return div;
};

const removeAllChildrenFrom = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};

const displayResponses = async () => {
  const location = form[0].value;
  const locations = await getLocations(location);
  const locationsResponses = document.querySelector('.locations-responses');
  
  removeAllChildrenFrom(locationsResponses);

  locations.forEach(() => locationsResponses.append(createResponseDiv()));
  
  const responses = document.querySelectorAll('.responses');

  locationsResponses.classList.add('-active');

  responses.forEach((response, index) => {
    response.textContent = `${locations[index].name}, ${locations[index].country}`;

    response.addEventListener('click', () => {
      currentLat = locations[index].lat;
      currentLon = locations[index].lon;

      locationsResponses.classList.remove('-active');
      displayWeatherData(locations[index].lat, locations[index].lon);
    });
  });
};

const getCurrentCoords = () => { return { currentLat, currentLon } };

export { displayResponses, getCurrentCoords };