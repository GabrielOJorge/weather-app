import displayWeatherData from "../weather-searcher";

const setBtnEvent = (lat, lon) => {
  const unitBtns = document.querySelectorAll(".main-btn.-unit");

  unitBtns.forEach((btn) => {
    btn.addEventListener("click", () =>
      displayWeatherData(lat, lon, btn.value)
    );
  });
};

export default setBtnEvent;
