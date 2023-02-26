let now = new Date();
let p = document.querySelector("p");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
p.innerHTML = `${day},  ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let iconElement = document.querySelector("#weather-icon");
let form = document.querySelector("#search-text");
form.addEventListener("submit", searchForCity);

function displayWeather(response) {
  console.log(response);
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let tempHiElement = document.querySelector("#temp-hi");
  let tempLowElement = document.querySelector("#temp-lo");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  tempHiElement.innerHTML = Math.round(response.data.main.temp_max);
  tempLowElement.innerHTML = Math.round(response.data.main.temp_min);
}

function searchForCity(event) {
  event.preventDefault();
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((81 - 32) * 5) / 9;
}

let celsiusLink = document.querySelector("celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);
