function refreshWeather(response) {
  let temp = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector(".city");

  cityElement.innerHTML = response.data.city;
  temp.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let Input = document.querySelector(".input");

  searchCity(Input.value);
}

let searchElement = document.querySelector(".search");
searchElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");