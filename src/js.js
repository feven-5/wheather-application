function refreshWeather(response) {
  let temp = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.city;
  temp.innerHTML = Math.round(temperature);
  let decribe = document.querySelector(".description");
  let description = response.data.condition.description;
  decribe.innerHTML = description;
  let humidity = document.querySelector(".humidity");
  let humid = response.data.temperature.humidity;
  humidity.innerHTML = `${humid}%`;
  let wind = response.data.wind.speed;
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `${wind}Km/s`;
  let time = document.querySelector(".time");
  let date = new Date(response.data.time*1000);
  time.innerHTML = formatDate(date);
  let iconElement = document.querySelector(".icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="broken-clouds-night">`;
  iconElement.innerHTML = icon;

  getForecast(response.data.city);
}
function formatDate(date){
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];
  let day = days[date.getDay()];
  if (minute < 10){
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}, `;
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

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(Forecast);
}
function formatDay(timestemp){
  let date = new Date(timestemp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()]
}
function Forecast(response){
  console.log(response.data);
  let conforcast = document.querySelector(".weather-forecast");
  let forcastHtml = "";
  response.data.daily.forEach(function(day, index){
    if(index < 5){
      forcastHtml += `
      <div class="">
        <div class="text-center text-gray-400">${formatDay(day.time)}</div>
        <div class="text-center my-2 text-xl "><img class="w-16" src="${day.condition.icon_url}"></div>
        <div class="flex justify-center text-pink-500">
          <div class="pr-1">
            <strong>${Math.round(day.temperature.minimum)}°</strong>
          </div>
          <div class="pl-1">${Math.round(day.temperature.maximum)}°</div>
        </div>
      </div>`;
    }
  });
  conforcast.innerHTML = forcastHtml;
}
let searchElement = document.querySelector(".search");
searchElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
