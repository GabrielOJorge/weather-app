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
  const unitBtns = document.querySelectorAll(".main-btn.-unit");

  unitBtns.forEach((btn) => {
    btn.addEventListener("click", () =>
      (0,_weather_searcher__WEBPACK_IMPORTED_MODULE_0__["default"])(lat, lon, btn.value)
    );
  });
};

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

  dateTime.textContent = (0,_js_functions_getTime__WEBPACK_IMPORTED_MODULE_2__["default"])();
  city.textContent = `${weatherData.city}, ${weatherData.country}`;
  temp.textContent = `${weatherData.temp}${unitsSymbols.temp}`;
  description.textContent = `Feels like ${weatherData.feelsLike}${unitsSymbols.temp}. ${weatherData.description}`;
  highLowTemp.textContent = `The high will be ${weatherData.maxTemp}${unitsSymbols.temp}, the low will be ${weatherData.minTemp}${unitsSymbols.temp}`;
  windSpeed.textContent = `Wind speed: ${weatherData.windSpeed}${unitsSymbols.speed}`;
  humidity.textContent = `Humidity ${weatherData.humidity}%`;
  tempIcon.className = (0,_js_functions_getWeatherIcon__WEBPACK_IMPORTED_MODULE_0__["default"])(weatherData.icon);
};

unitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentCoords = (0,_js_functions_displayResponses__WEBPACK_IMPORTED_MODULE_1__.getCurrentCoords)();
    const currentLat = currentCoords.currentLat;
    const currentLon = currentCoords.currentLon;

    displayWeatherData(currentLat, currentLon, btn.value);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  (0,_js_functions_displayResponses__WEBPACK_IMPORTED_MODULE_1__.displayResponses)();
});

window.addEventListener("load", () => {
  displayWeatherData(51.50853, -0.12574);
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
  const div = document.createElement("div");
  const h3 = document.createElement("h3");

  div.classList.add("responses");
  div.append(h3);

  return div;
};

const removeAllChildrenFrom = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const displayResponses = async () => {
  const location = form[0].value;
  const locations = await (0,_js_functions_getLocations__WEBPACK_IMPORTED_MODULE_1__["default"])(location);
  const locationsResponses = document.querySelector(".locations-responses");

  removeAllChildrenFrom(locationsResponses);

  locations.forEach(() => locationsResponses.append(createResponseDiv()));

  const responses = document.querySelectorAll(".responses");

  locationsResponses.classList.add("-active");

  responses.forEach((response, index) => {
    response.textContent = `${locations[index].name}, ${locations[index].country}`;

    response.addEventListener("click", () => {
      currentLat = locations[index].lat;
      currentLon = locations[index].lon;

      locationsResponses.classList.remove("-active");
      (0,_components_weather_searcher__WEBPACK_IMPORTED_MODULE_0__["default"])(locations[index].lat, locations[index].lon);
    });
  });
};

const getCurrentCoords = () => {
  return { currentLat, currentLon };
};




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUQ7O0FBRXJEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sNkRBQWtCO0FBQ3hCO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWm9DO0FBSWxCO0FBQ1E7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxJQUFJLE9BQU8sSUFBSSxTQUFTLE1BQU07QUFDM0YsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixpRUFBVztBQUNwQyx3QkFBd0IsaUJBQWlCLElBQUksb0JBQW9CO0FBQ2pFLHdCQUF3QixpQkFBaUIsRUFBRSxrQkFBa0I7QUFDN0QsMENBQTBDLHNCQUFzQixFQUFFLGtCQUFrQixJQUFJLHdCQUF3QjtBQUNoSCxnREFBZ0Qsb0JBQW9CLEVBQUUsa0JBQWtCLG9CQUFvQixvQkFBb0IsRUFBRSxrQkFBa0I7QUFDcEoseUNBQXlDLHNCQUFzQixFQUFFLG1CQUFtQjtBQUNwRixxQ0FBcUMscUJBQXFCO0FBQzFELHVCQUF1Qix3RUFBYztBQUNyQzs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGdGQUFnQjtBQUMxQztBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUsZ0ZBQWdCO0FBQ2xCLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsa0JBQWtCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGaUM7QUFDUjs7QUFFM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixzRUFBWTtBQUN0Qzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUE4QixzQkFBc0IsSUFBSSx5QkFBeUI7O0FBRWpGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sd0VBQWtCO0FBQ3hCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRThDOzs7Ozs7Ozs7Ozs7Ozs7QUNwRDlDO0FBQ0EsZ0ZBQWdGLFNBQVMsb0RBQW9ELGNBQWM7QUFDM0o7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxZQUFZOzs7Ozs7Ozs7Ozs7OztBQ1AzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxXQUFXOzs7Ozs7Ozs7Ozs7OztBQ2QxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxjQUFjOzs7Ozs7VUNmN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOK0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb21wb25lbnRzL21haW4tYnRuL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbXBvbmVudHMvd2VhdGhlci1zZWFyY2hlci9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9mdW5jdGlvbnMvZGlzcGxheVJlc3BvbnNlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9qcy9mdW5jdGlvbnMvZ2V0TG9jYXRpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2pzL2Z1bmN0aW9ucy9nZXRUaW1lLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2pzL2Z1bmN0aW9ucy9nZXRXZWF0aGVySWNvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNwbGF5V2VhdGhlckRhdGEgZnJvbSBcIi4uL3dlYXRoZXItc2VhcmNoZXJcIjtcblxuY29uc3Qgc2V0QnRuRXZlbnQgPSAobGF0LCBsb24pID0+IHtcbiAgY29uc3QgdW5pdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1haW4tYnRuLi11bml0XCIpO1xuXG4gIHVuaXRCdG5zLmZvckVhY2goKGJ0bikgPT4ge1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIGRpc3BsYXlXZWF0aGVyRGF0YShsYXQsIGxvbiwgYnRuLnZhbHVlKVxuICAgICk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0QnRuRXZlbnQ7XG4iLCJpbXBvcnQgZ2V0V2VhdGhlckljb24gZnJvbSBcIi4uLy4uL2pzL2Z1bmN0aW9ucy9nZXRXZWF0aGVySWNvblwiO1xuaW1wb3J0IHtcbiAgZGlzcGxheVJlc3BvbnNlcyxcbiAgZ2V0Q3VycmVudENvb3Jkcyxcbn0gZnJvbSBcIi4uLy4uL2pzL2Z1bmN0aW9ucy9kaXNwbGF5UmVzcG9uc2VzXCI7XG5pbXBvcnQgZ2V0RGF0ZVRpbWUgZnJvbSBcIi4uLy4uL2pzL2Z1bmN0aW9ucy9nZXRUaW1lXCI7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1cIik7XG5jb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5XCIpO1xuY29uc3QgdGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcFwiKTtcbmNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcbmNvbnN0IGRhdGVUaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLXRpbWVcIik7XG5jb25zdCBoaWdoTG93VGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaC1sb3ctdGVtcFwiKTtcbmNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1zcGVlZFwiKTtcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1pZGl0eVwiKTtcbmNvbnN0IHRlbXBJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wLWljb25cIik7XG5jb25zdCB1bml0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFpbi1idG4uLXVuaXRcIik7XG5cbmNvbnN0IGdldFdlYXRoZXJEYXRhID0gYXN5bmMgKGxhdCwgbG9uLCB1bml0cykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mdW5pdHM9JHt1bml0c30mYXBwaWQ9YzBjZTVjNDM0NDU3ZTc5MWYwMTlmNGIzODZmNDFhZjNgLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGNpdHk6IHdlYXRoZXJEYXRhLm5hbWUsXG4gICAgICBjb3VudHJ5OiB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeSxcbiAgICAgIHRlbXA6IE1hdGgucm91bmQod2VhdGhlckRhdGEubWFpbi50ZW1wKSxcbiAgICAgIGZlZWxzTGlrZTogTWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2UpLFxuICAgICAgZGVzY3JpcHRpb246IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24ucmVwbGFjZSgvXlxcdy8sIChjKSA9PlxuICAgICAgICBjLnRvVXBwZXJDYXNlKClcbiAgICAgICksXG4gICAgICBtYXhUZW1wOiBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLm1haW4udGVtcF9tYXgpLFxuICAgICAgbWluVGVtcDogTWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWluKSxcbiAgICAgIHdpbmRTcGVlZDogTWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS53aW5kLnNwZWVkICogMTApIC8gMTAsXG4gICAgICBodW1pZGl0eTogd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eSxcbiAgICAgIGljb246IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0ubWFpbixcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2gge1xuICAgIChlcnIpID0+IGNvbnNvbGUubG9nKGVycik7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlXZWF0aGVyRGF0YSA9IGFzeW5jIChsYXQsIGxvbiwgdW5pdHMgPSBcIm1ldHJpY1wiKSA9PiB7XG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0V2VhdGhlckRhdGEobGF0LCBsb24sIHVuaXRzKTtcblxuICBjb25zdCB1bml0c1N5bWJvbHMgPSB7fTtcblxuICBpZiAodW5pdHMgPT09IFwibWV0cmljXCIpIHtcbiAgICB1bml0c1N5bWJvbHMudGVtcCA9IFwiwrBDXCI7XG4gICAgdW5pdHNTeW1ib2xzLnNwZWVkID0gXCJtL3NcIjtcbiAgfSBlbHNlIHtcbiAgICB1bml0c1N5bWJvbHMudGVtcCA9IFwiwrBGXCI7XG4gICAgdW5pdHNTeW1ib2xzLnNwZWVkID0gXCJtcGhcIjtcbiAgfVxuXG4gIGRhdGVUaW1lLnRleHRDb250ZW50ID0gZ2V0RGF0ZVRpbWUoKTtcbiAgY2l0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmNpdHl9LCAke3dlYXRoZXJEYXRhLmNvdW50cnl9YDtcbiAgdGVtcC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLnRlbXB9JHt1bml0c1N5bWJvbHMudGVtcH1gO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7d2VhdGhlckRhdGEuZmVlbHNMaWtlfSR7dW5pdHNTeW1ib2xzLnRlbXB9LiAke3dlYXRoZXJEYXRhLmRlc2NyaXB0aW9ufWA7XG4gIGhpZ2hMb3dUZW1wLnRleHRDb250ZW50ID0gYFRoZSBoaWdoIHdpbGwgYmUgJHt3ZWF0aGVyRGF0YS5tYXhUZW1wfSR7dW5pdHNTeW1ib2xzLnRlbXB9LCB0aGUgbG93IHdpbGwgYmUgJHt3ZWF0aGVyRGF0YS5taW5UZW1wfSR7dW5pdHNTeW1ib2xzLnRlbXB9YDtcbiAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQgc3BlZWQ6ICR7d2VhdGhlckRhdGEud2luZFNwZWVkfSR7dW5pdHNTeW1ib2xzLnNwZWVkfWA7XG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5ICR7d2VhdGhlckRhdGEuaHVtaWRpdHl9JWA7XG4gIHRlbXBJY29uLmNsYXNzTmFtZSA9IGdldFdlYXRoZXJJY29uKHdlYXRoZXJEYXRhLmljb24pO1xufTtcblxudW5pdEJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDb29yZHMgPSBnZXRDdXJyZW50Q29vcmRzKCk7XG4gICAgY29uc3QgY3VycmVudExhdCA9IGN1cnJlbnRDb29yZHMuY3VycmVudExhdDtcbiAgICBjb25zdCBjdXJyZW50TG9uID0gY3VycmVudENvb3Jkcy5jdXJyZW50TG9uO1xuXG4gICAgZGlzcGxheVdlYXRoZXJEYXRhKGN1cnJlbnRMYXQsIGN1cnJlbnRMb24sIGJ0bi52YWx1ZSk7XG4gIH0pO1xufSk7XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGRpc3BsYXlSZXNwb25zZXMoKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBkaXNwbGF5V2VhdGhlckRhdGEoNTEuNTA4NTMsIC0wLjEyNTc0KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5V2VhdGhlckRhdGE7XG4iLCJpbXBvcnQgZGlzcGxheVdlYXRoZXJEYXRhIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3dlYXRoZXItc2VhcmNoZXJcIjtcbmltcG9ydCBnZXRMb2NhdGlvbnMgZnJvbSBcIi4uLy4uL2pzL2Z1bmN0aW9ucy9nZXRMb2NhdGlvbnNcIjtcblxubGV0IGN1cnJlbnRMYXQ7XG5sZXQgY3VycmVudExvbjtcblxuY29uc3QgY3JlYXRlUmVzcG9uc2VEaXYgPSAoKSA9PiB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwicmVzcG9uc2VzXCIpO1xuICBkaXYuYXBwZW5kKGgzKTtcblxuICByZXR1cm4gZGl2O1xufTtcblxuY29uc3QgcmVtb3ZlQWxsQ2hpbGRyZW5Gcm9tID0gKHBhcmVudCkgPT4ge1xuICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG5jb25zdCBkaXNwbGF5UmVzcG9uc2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBsb2NhdGlvbiA9IGZvcm1bMF0udmFsdWU7XG4gIGNvbnN0IGxvY2F0aW9ucyA9IGF3YWl0IGdldExvY2F0aW9ucyhsb2NhdGlvbik7XG4gIGNvbnN0IGxvY2F0aW9uc1Jlc3BvbnNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25zLXJlc3BvbnNlc1wiKTtcblxuICByZW1vdmVBbGxDaGlsZHJlbkZyb20obG9jYXRpb25zUmVzcG9uc2VzKTtcblxuICBsb2NhdGlvbnMuZm9yRWFjaCgoKSA9PiBsb2NhdGlvbnNSZXNwb25zZXMuYXBwZW5kKGNyZWF0ZVJlc3BvbnNlRGl2KCkpKTtcblxuICBjb25zdCByZXNwb25zZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc3BvbnNlc1wiKTtcblxuICBsb2NhdGlvbnNSZXNwb25zZXMuY2xhc3NMaXN0LmFkZChcIi1hY3RpdmVcIik7XG5cbiAgcmVzcG9uc2VzLmZvckVhY2goKHJlc3BvbnNlLCBpbmRleCkgPT4ge1xuICAgIHJlc3BvbnNlLnRleHRDb250ZW50ID0gYCR7bG9jYXRpb25zW2luZGV4XS5uYW1lfSwgJHtsb2NhdGlvbnNbaW5kZXhdLmNvdW50cnl9YDtcblxuICAgIHJlc3BvbnNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjdXJyZW50TGF0ID0gbG9jYXRpb25zW2luZGV4XS5sYXQ7XG4gICAgICBjdXJyZW50TG9uID0gbG9jYXRpb25zW2luZGV4XS5sb247XG5cbiAgICAgIGxvY2F0aW9uc1Jlc3BvbnNlcy5jbGFzc0xpc3QucmVtb3ZlKFwiLWFjdGl2ZVwiKTtcbiAgICAgIGRpc3BsYXlXZWF0aGVyRGF0YShsb2NhdGlvbnNbaW5kZXhdLmxhdCwgbG9jYXRpb25zW2luZGV4XS5sb24pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IGdldEN1cnJlbnRDb29yZHMgPSAoKSA9PiB7XG4gIHJldHVybiB7IGN1cnJlbnRMYXQsIGN1cnJlbnRMb24gfTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlSZXNwb25zZXMsIGdldEN1cnJlbnRDb29yZHMgfTtcbiIsImNvbnN0IGdldExvY2F0aW9ucyA9IGFzeW5jIGxvY2F0aW9uID0+IHtcbiAgY29uc3QgZ2VvQ29kZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7bG9jYXRpb259JmxpbWl0PTUmYXBwaWQ9YzBjZTVjNDM0NDU3ZTc5MWYwMTlmNGIzODZmNDFhZjNgLCB7IG1vZGU6ICdjb3JzJyB9KVxuICBjb25zdCBnZW9Db2RlRGF0YSA9IGF3YWl0IGdlb0NvZGUuanNvbigpO1xuXG4gIHJldHVybiBnZW9Db2RlRGF0YTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldExvY2F0aW9uczsiLCJjb25zdCBnZXREYXRlVGltZSA9ICgpID0+IHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIGNvbnN0IG9wdGlvbnMgPSB7IFxuICAgIG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJyxcbiAgICBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLFxuICAgIGhvdXIxMjogdHJ1ZSxcbiAgfTtcblxuICBjb25zdCBmb3JtYXRlZERhdGVUaW1lID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywgb3B0aW9ucykuZm9ybWF0KGN1cnJlbnREYXRlKTtcblxuICByZXR1cm4gZm9ybWF0ZWREYXRlVGltZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF0ZVRpbWU7IiwiY29uc3QgZ2V0V2VhdGhlckljb24gPSBpY29uID0+IHtcbiAgY29uc3QgbG93ZXJDYXNlSWNvbiA9IGljb24udG9Mb3dlckNhc2UoKVxuXG4gIGNvbnN0IGljb25zT2JqID0ge1xuICAgIGNsZWFyOiAnZmEtc29saWQgZmEtc3VuJyxcbiAgICBjbG91ZHM6ICdmYS1zb2xpZCBmYS1jbG91ZCcsXG4gICAgcmFpbjogJ2ZhLXNvbGlkIGZhLWNsb3VkLXJhaW4nLFxuICAgIGRyaXp6bGU6ICdmYS1zb2xpZCBmYS1jbG91ZC1yYWluJyxcbiAgICB0aHVuZGVyc3Rvcm06ICdmYS1zb2xpZCBmYS1jbG91ZC1ib2x0JyxcbiAgICBzbm93OiAnZmEtc29saWQgZmEtc25vd2ZsYWtlJyxcbiAgfTtcblxuICByZXR1cm4gaWNvbnNPYmpbbG93ZXJDYXNlSWNvbl0gPyBpY29uc09ialtsb3dlckNhc2VJY29uXSA6ICdmYS1zb2xpZCBmYS1zbW9nJztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXJJY29uOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRpc3BsYXlXZWF0aGVyRGF0YSBmcm9tIFwiLi9jb21wb25lbnRzL3dlYXRoZXItc2VhcmNoZXJcIjtcbmltcG9ydCBtYWluQnRuIGZyb20gXCIuL2NvbXBvbmVudHMvbWFpbi1idG5cIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==