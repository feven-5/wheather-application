function CityWeather(event){
  event.preventDefault();
  let input = document.querySelector(".input"); 
  let city = document.querySelector(".city");
  city.innerHTML = input.value;
  console.log(input.value);
}
let selector = document.querySelector(".search");
selector.addEventListener("submit",CityWeather)
