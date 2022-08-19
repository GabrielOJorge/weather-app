/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/main-btn/index.js":
/*!******************************************!*\
  !*** ./src/components/main-btn/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weather_searcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../weather-searcher */ "./src/components/weather-searcher/index.js");


const setBtnEvent = (lat, lon) => {
  const unitBtns = document.querySelectorAll('.main-btn.-unit');

  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => (0,_weather_searcher__WEBPACK_IMPORTED_MODULE_0__["default"])(lat, lon, btn.value));
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setBtnEvent);

/***/ }),

/***/ "./src/components/weather-searcher/index.js":
/*!**************************************************!*\
  !*** ./src/components/weather-searcher/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_functions_getWeatherIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/functions/getWeatherIcon */ "./src/js/functions/getWeatherIcon.js");
/* harmony import */ var _js_functions_displayResponses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/functions/displayResponses */ "./src/js/functions/displayResponses.js");
/* harmony import */ var _js_functions_getTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../js/functions/getTime */ "./src/js/functions/getTime.js");




const form = document.getElementById('form');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const dateTime = document.getElementById('date-time');
const highLowTemp = document.getElementById('high-low-temp');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const tempIcon = document.getElementById('temp-icon');
const unitBtns = document.querySelectorAll('.main-btn.-unit');

const getWeatherData = async (lat, lon, units) => {
  try {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
    const weatherData = await weather.json();
    
    const data = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temp: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      description: weatherData.weather[0].description.replace(/^\w/, (c) => c.toUpperCase()),
      maxTemp: Math.round(weatherData.main.temp_max),
      minTemp: Math.round(weatherData.main.temp_min),
      windSpeed: Math.round(weatherData.wind.speed * 10) / 10,
      humidity: weatherData.main.humidity,
      icon: weatherData.weather[0].main
    }

    return data;

  } catch {
    err => console.log(err);
  }
};

const displayWeatherData = async (lat, lon, units = 'metric') => {
  const weatherData = await getWeatherData(lat, lon, units);

  const unitsSymbols = {};
  
  if (units === 'metric') {
    unitsSymbols.temp = '°C';
    unitsSymbols.speed = 'm/s';
  } else {
    unitsSymbols.temp = '°F';
    unitsSymbols.speed = 'mph';
  };

  dateTime.textContent = (0,_js_functions_getTime__WEBPACK_IMPORTED_MODULE_2__["default"])();
  city.textContent = `${weatherData.city}, ${weatherData.country}`;
  temp.textContent = `${weatherData.temp}${unitsSymbols.temp}`;
  description.textContent = `Feels like ${weatherData.feelsLike}${unitsSymbols.temp}. ${weatherData.description}`;
  highLowTemp.textContent = `The high will be ${weatherData.maxTemp}${unitsSymbols.temp}, the low will be ${weatherData.minTemp}${unitsSymbols.temp}`;
  windSpeed.textContent = `Wind speed: ${weatherData.windSpeed}${unitsSymbols.speed}`;
  humidity.textContent = `Humidity ${weatherData.humidity}%`;
  tempIcon.className = (0,_js_functions_getWeatherIcon__WEBPACK_IMPORTED_MODULE_0__["default"])(weatherData.icon);
}

unitBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentCoords = (0,_js_functions_displayResponses__WEBPACK_IMPORTED_MODULE_1__.getCurrentCoords)();
    const currentLat = currentCoords.currentLat;
    const currentLon = currentCoords.currentLon;

    displayWeatherData(currentLat, currentLon, btn.value);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  (0,_js_functions_displayResponses__WEBPACK_IMPORTED_MODULE_1__.displayResponses)();
});

const loadingScreen = document.querySelector('.loading-screen');

window.addEventListener('load', () => {
  displayWeatherData(51.5085300, -0.1257400);
  loadingScreen.parentElement.removeChild(loadingScreen);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayWeatherData);

/***/ }),

/***/ "./src/js/functions/displayResponses.js":
/*!**********************************************!*\
  !*** ./src/js/functions/displayResponses.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayResponses": () => (/* binding */ displayResponses),
/* harmony export */   "getCurrentCoords": () => (/* binding */ getCurrentCoords)
/* harmony export */ });
/* harmony import */ var _components_weather_searcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/weather-searcher */ "./src/components/weather-searcher/index.js");
/* harmony import */ var _js_functions_getLocations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/functions/getLocations */ "./src/js/functions/getLocations.js");



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
  const locations = await (0,_js_functions_getLocations__WEBPACK_IMPORTED_MODULE_1__["default"])(location);
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
      (0,_components_weather_searcher__WEBPACK_IMPORTED_MODULE_0__["default"])(locations[index].lat, locations[index].lon);
    });
  });
};

const getCurrentCoords = () => { return { currentLat, currentLon } };



/***/ }),

/***/ "./src/js/functions/getLocations.js":
/*!******************************************!*\
  !*** ./src/js/functions/getLocations.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getLocations = async location => {
  const geoCode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=c0ce5c434457e791f019f4b386f41af3`, { mode: 'cors' })
  const geoCodeData = await geoCode.json();

  return geoCodeData;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLocations);

/***/ }),

/***/ "./src/js/functions/getTime.js":
/*!*************************************!*\
  !*** ./src/js/functions/getTime.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getDateTime = () => {
  const currentDate = new Date();

  const options = { 
    month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: true,
  };

  const formatedDateTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);

  return formatedDateTime;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDateTime);

/***/ }),

/***/ "./src/js/functions/getWeatherIcon.js":
/*!********************************************!*\
  !*** ./src/js/functions/getWeatherIcon.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeatherIcon);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_weather_searcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/weather-searcher */ "./src/components/weather-searcher/index.js");
/* harmony import */ var _components_main_btn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main-btn */ "./src/components/main-btn/index.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUQ7O0FBRXJEO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0MsNkRBQWtCO0FBQzFELEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZxQztBQUN5QjtBQUNuQzs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVGQUF1RixJQUFJLE9BQU8sSUFBSSxTQUFTLE1BQU0sNENBQTRDLGNBQWM7QUFDL0s7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLGlFQUFXO0FBQ3BDLHdCQUF3QixpQkFBaUIsSUFBSSxvQkFBb0I7QUFDakUsd0JBQXdCLGlCQUFpQixFQUFFLGtCQUFrQjtBQUM3RCwwQ0FBMEMsc0JBQXNCLEVBQUUsa0JBQWtCLElBQUksd0JBQXdCO0FBQ2hILGdEQUFnRCxvQkFBb0IsRUFBRSxrQkFBa0Isb0JBQW9CLG9CQUFvQixFQUFFLGtCQUFrQjtBQUNwSix5Q0FBeUMsc0JBQXNCLEVBQUUsbUJBQW1CO0FBQ3BGLHFDQUFxQyxxQkFBcUI7QUFDMUQsdUJBQXVCLHdFQUFjO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsZ0ZBQWdCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSxnRkFBZ0I7QUFDbEIsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRmtDO0FBQ1I7O0FBRTNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsc0VBQVk7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUE4QixzQkFBc0IsSUFBSSx5QkFBeUI7O0FBRWpGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sd0VBQWtCO0FBQ3hCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsaUNBQWlDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRDFDO0FBQ0EsZ0ZBQWdGLFNBQVMsb0RBQW9ELGNBQWM7QUFDM0o7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxZQUFZOzs7Ozs7Ozs7Ozs7OztBQ1AzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxXQUFXOzs7Ozs7Ozs7Ozs7OztBQ2QxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxjQUFjOzs7Ozs7VUNmN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOK0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL21haW4tYnRuL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbXBvbmVudHMvd2VhdGhlci1zZWFyY2hlci9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9mdW5jdGlvbnMvZGlzcGxheVJlc3BvbnNlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9mdW5jdGlvbnMvZ2V0TG9jYXRpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2pzL2Z1bmN0aW9ucy9nZXRUaW1lLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2pzL2Z1bmN0aW9ucy9nZXRXZWF0aGVySWNvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNwbGF5V2VhdGhlckRhdGEgZnJvbSBcIi4uL3dlYXRoZXItc2VhcmNoZXJcIjtcblxuY29uc3Qgc2V0QnRuRXZlbnQgPSAobGF0LCBsb24pID0+IHtcbiAgY29uc3QgdW5pdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWFpbi1idG4uLXVuaXQnKTtcblxuICB1bml0QnRucy5mb3JFYWNoKGJ0biA9PiB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGlzcGxheVdlYXRoZXJEYXRhKGxhdCwgbG9uLCBidG4udmFsdWUpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldEJ0bkV2ZW50OyIsImltcG9ydCBnZXRXZWF0aGVySWNvbiBmcm9tIFwiLi4vLi4vanMvZnVuY3Rpb25zL2dldFdlYXRoZXJJY29uXCI7XG5pbXBvcnQgeyBkaXNwbGF5UmVzcG9uc2VzLCBnZXRDdXJyZW50Q29vcmRzIH0gZnJvbSBcIi4uLy4uL2pzL2Z1bmN0aW9ucy9kaXNwbGF5UmVzcG9uc2VzXCJcbmltcG9ydCBnZXREYXRlVGltZSBmcm9tIFwiLi4vLi4vanMvZnVuY3Rpb25zL2dldFRpbWVcIjtcblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJyk7XG5jb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpdHknKTtcbmNvbnN0IHRlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVtcCcpO1xuY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKTtcbmNvbnN0IGRhdGVUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGUtdGltZScpO1xuY29uc3QgaGlnaExvd1RlbXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaC1sb3ctdGVtcCcpO1xuY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQtc3BlZWQnKTtcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB0ZW1wSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wLWljb24nKTtcbmNvbnN0IHVuaXRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1haW4tYnRuLi11bml0Jyk7XG5cbmNvbnN0IGdldFdlYXRoZXJEYXRhID0gYXN5bmMgKGxhdCwgbG9uLCB1bml0cykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0fSZsb249JHtsb259JnVuaXRzPSR7dW5pdHN9JmFwcGlkPWMwY2U1YzQzNDQ1N2U3OTFmMDE5ZjRiMzg2ZjQxYWYzYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAgIFxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBjaXR5OiB3ZWF0aGVyRGF0YS5uYW1lLFxuICAgICAgY291bnRyeTogd2VhdGhlckRhdGEuc3lzLmNvdW50cnksXG4gICAgICB0ZW1wOiBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLm1haW4udGVtcCksXG4gICAgICBmZWVsc0xpa2U6IE1hdGgucm91bmQod2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlKSxcbiAgICAgIGRlc2NyaXB0aW9uOiB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLnJlcGxhY2UoL15cXHcvLCAoYykgPT4gYy50b1VwcGVyQ2FzZSgpKSxcbiAgICAgIG1heFRlbXA6IE1hdGgucm91bmQod2VhdGhlckRhdGEubWFpbi50ZW1wX21heCksXG4gICAgICBtaW5UZW1wOiBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLm1haW4udGVtcF9taW4pLFxuICAgICAgd2luZFNwZWVkOiBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuc3BlZWQgKiAxMCkgLyAxMCxcbiAgICAgIGh1bWlkaXR5OiB3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5LFxuICAgICAgaWNvbjogd2VhdGhlckRhdGEud2VhdGhlclswXS5tYWluXG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG5cbiAgfSBjYXRjaCB7XG4gICAgZXJyID0+IGNvbnNvbGUubG9nKGVycik7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlXZWF0aGVyRGF0YSA9IGFzeW5jIChsYXQsIGxvbiwgdW5pdHMgPSAnbWV0cmljJykgPT4ge1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IGdldFdlYXRoZXJEYXRhKGxhdCwgbG9uLCB1bml0cyk7XG5cbiAgY29uc3QgdW5pdHNTeW1ib2xzID0ge307XG4gIFxuICBpZiAodW5pdHMgPT09ICdtZXRyaWMnKSB7XG4gICAgdW5pdHNTeW1ib2xzLnRlbXAgPSAnwrBDJztcbiAgICB1bml0c1N5bWJvbHMuc3BlZWQgPSAnbS9zJztcbiAgfSBlbHNlIHtcbiAgICB1bml0c1N5bWJvbHMudGVtcCA9ICfCsEYnO1xuICAgIHVuaXRzU3ltYm9scy5zcGVlZCA9ICdtcGgnO1xuICB9O1xuXG4gIGRhdGVUaW1lLnRleHRDb250ZW50ID0gZ2V0RGF0ZVRpbWUoKTtcbiAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmNpdHl9LCAke3dlYXRoZXJEYXRhLmNvdW50cnl9YDtcbiAgdGVtcC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLnRlbXB9JHt1bml0c1N5bWJvbHMudGVtcH1gO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7d2VhdGhlckRhdGEuZmVlbHNMaWtlfSR7dW5pdHNTeW1ib2xzLnRlbXB9LiAke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9ufWA7XG4gIGhpZ2hMb3dUZW1wLnRleHRDb250ZW50ID0gYFRoZSBoaWdoIHdpbGwgYmUgJHt3ZWF0aGVyRGF0YS5tYXhUZW1wfSR7dW5pdHNTeW1ib2xzLnRlbXB9LCB0aGUgbG93IHdpbGwgYmUgJHt3ZWF0aGVyRGF0YS5taW5UZW1wfSR7dW5pdHNTeW1ib2xzLnRlbXB9YDtcbiAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQgc3BlZWQ6ICR7d2VhdGhlckRhdGEud2luZFNwZWVkfSR7dW5pdHNTeW1ib2xzLnNwZWVkfWA7XG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5ICR7d2VhdGhlckRhdGEuaHVtaWRpdHl9JWA7XG4gIHRlbXBJY29uLmNsYXNzTmFtZSA9IGdldFdlYXRoZXJJY29uKHdlYXRoZXJEYXRhLmljb24pO1xufVxuXG51bml0QnRucy5mb3JFYWNoKGJ0biA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50Q29vcmRzID0gZ2V0Q3VycmVudENvb3JkcygpO1xuICAgIGNvbnN0IGN1cnJlbnRMYXQgPSBjdXJyZW50Q29vcmRzLmN1cnJlbnRMYXQ7XG4gICAgY29uc3QgY3VycmVudExvbiA9IGN1cnJlbnRDb29yZHMuY3VycmVudExvbjtcblxuICAgIGRpc3BsYXlXZWF0aGVyRGF0YShjdXJyZW50TGF0LCBjdXJyZW50TG9uLCBidG4udmFsdWUpO1xuICB9KTtcbn0pO1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGRpc3BsYXlSZXNwb25zZXMoKTtcbn0pO1xuXG5jb25zdCBsb2FkaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRpbmctc2NyZWVuJyk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBkaXNwbGF5V2VhdGhlckRhdGEoNTEuNTA4NTMwMCwgLTAuMTI1NzQwMCk7XG4gIGxvYWRpbmdTY3JlZW4ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChsb2FkaW5nU2NyZWVuKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5V2VhdGhlckRhdGE7IiwiaW1wb3J0IGRpc3BsYXlXZWF0aGVyRGF0YSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy93ZWF0aGVyLXNlYXJjaGVyXCI7XG5pbXBvcnQgZ2V0TG9jYXRpb25zIGZyb20gXCIuLi8uLi9qcy9mdW5jdGlvbnMvZ2V0TG9jYXRpb25zXCI7XG5cbmxldCBjdXJyZW50TGF0O1xubGV0IGN1cnJlbnRMb247XG5cbmNvbnN0IGNyZWF0ZVJlc3BvbnNlRGl2ID0gKCkgPT4ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuXG4gIGgzLmNsYXNzTGlzdC5hZGQoJ3Jlc3BvbnNlcycpO1xuICBkaXYuYXBwZW5kKGgzKTtcblxuICByZXR1cm4gZGl2O1xufTtcblxuY29uc3QgcmVtb3ZlQWxsQ2hpbGRyZW5Gcm9tID0gcGFyZW50ID0+IHtcbiAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgfTtcbn07XG5cbmNvbnN0IGRpc3BsYXlSZXNwb25zZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGxvY2F0aW9uID0gZm9ybVswXS52YWx1ZTtcbiAgY29uc3QgbG9jYXRpb25zID0gYXdhaXQgZ2V0TG9jYXRpb25zKGxvY2F0aW9uKTtcbiAgY29uc3QgbG9jYXRpb25zUmVzcG9uc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9ucy1yZXNwb25zZXMnKTtcbiAgXG4gIHJlbW92ZUFsbENoaWxkcmVuRnJvbShsb2NhdGlvbnNSZXNwb25zZXMpO1xuXG4gIGxvY2F0aW9ucy5mb3JFYWNoKCgpID0+IGxvY2F0aW9uc1Jlc3BvbnNlcy5hcHBlbmQoY3JlYXRlUmVzcG9uc2VEaXYoKSkpO1xuICBcbiAgY29uc3QgcmVzcG9uc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc3BvbnNlcycpO1xuXG4gIGxvY2F0aW9uc1Jlc3BvbnNlcy5jbGFzc0xpc3QuYWRkKCctYWN0aXZlJyk7XG5cbiAgcmVzcG9uc2VzLmZvckVhY2goKHJlc3BvbnNlLCBpbmRleCkgPT4ge1xuICAgIHJlc3BvbnNlLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb25zW2luZGV4XS5uYW1lfSwgJHtsb2NhdGlvbnNbaW5kZXhdLmNvdW50cnl9YDtcblxuICAgIHJlc3BvbnNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudExhdCA9IGxvY2F0aW9uc1tpbmRleF0ubGF0O1xuICAgICAgY3VycmVudExvbiA9IGxvY2F0aW9uc1tpbmRleF0ubG9uO1xuXG4gICAgICBsb2NhdGlvbnNSZXNwb25zZXMuY2xhc3NMaXN0LnJlbW92ZSgnLWFjdGl2ZScpO1xuICAgICAgZGlzcGxheVdlYXRoZXJEYXRhKGxvY2F0aW9uc1tpbmRleF0ubGF0LCBsb2NhdGlvbnNbaW5kZXhdLmxvbik7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgZ2V0Q3VycmVudENvb3JkcyA9ICgpID0+IHsgcmV0dXJuIHsgY3VycmVudExhdCwgY3VycmVudExvbiB9IH07XG5cbmV4cG9ydCB7IGRpc3BsYXlSZXNwb25zZXMsIGdldEN1cnJlbnRDb29yZHMgfTsiLCJjb25zdCBnZXRMb2NhdGlvbnMgPSBhc3luYyBsb2NhdGlvbiA9PiB7XG4gIGNvbnN0IGdlb0NvZGUgPSBhd2FpdCBmZXRjaChgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2xvY2F0aW9ufSZsaW1pdD01JmFwcGlkPWMwY2U1YzQzNDQ1N2U3OTFmMDE5ZjRiMzg2ZjQxYWYzYCwgeyBtb2RlOiAnY29ycycgfSlcbiAgY29uc3QgZ2VvQ29kZURhdGEgPSBhd2FpdCBnZW9Db2RlLmpzb24oKTtcblxuICByZXR1cm4gZ2VvQ29kZURhdGE7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRMb2NhdGlvbnM7IiwiY29uc3QgZ2V0RGF0ZVRpbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICBjb25zdCBvcHRpb25zID0geyBcbiAgICBtb250aDogJ3Nob3J0JywgZGF5OiAnbnVtZXJpYycsXG4gICAgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJyxcbiAgICBob3VyMTI6IHRydWUsXG4gIH07XG5cbiAgY29uc3QgZm9ybWF0ZWREYXRlVGltZSA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1VUycsIG9wdGlvbnMpLmZvcm1hdChjdXJyZW50RGF0ZSk7XG5cbiAgcmV0dXJuIGZvcm1hdGVkRGF0ZVRpbWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldERhdGVUaW1lOyIsImNvbnN0IGdldFdlYXRoZXJJY29uID0gaWNvbiA9PiB7XG4gIGNvbnN0IGxvd2VyQ2FzZUljb24gPSBpY29uLnRvTG93ZXJDYXNlKClcblxuICBjb25zdCBpY29uc09iaiA9IHtcbiAgICBjbGVhcjogJ2ZhLXNvbGlkIGZhLXN1bicsXG4gICAgY2xvdWRzOiAnZmEtc29saWQgZmEtY2xvdWQnLFxuICAgIHJhaW46ICdmYS1zb2xpZCBmYS1jbG91ZC1yYWluJyxcbiAgICBkcml6emxlOiAnZmEtc29saWQgZmEtY2xvdWQtcmFpbicsXG4gICAgdGh1bmRlcnN0b3JtOiAnZmEtc29saWQgZmEtY2xvdWQtYm9sdCcsXG4gICAgc25vdzogJ2ZhLXNvbGlkIGZhLXNub3dmbGFrZScsXG4gIH07XG5cbiAgcmV0dXJuIGljb25zT2JqW2xvd2VyQ2FzZUljb25dID8gaWNvbnNPYmpbbG93ZXJDYXNlSWNvbl0gOiAnZmEtc29saWQgZmEtc21vZyc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWF0aGVySWNvbjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkaXNwbGF5V2VhdGhlckRhdGEgZnJvbSBcIi4vY29tcG9uZW50cy93ZWF0aGVyLXNlYXJjaGVyXCI7XG5pbXBvcnQgbWFpbkJ0biBmcm9tIFwiLi9jb21wb25lbnRzL21haW4tYnRuXCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=