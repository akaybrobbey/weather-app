let currentDate = new Date();

let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
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

let currentDay = days[currentDate.getDay()];

let dateAndTime = document.querySelector("#date-and-time");

dateAndTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");

  let cityElement = document.querySelector("h1");
  let description = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let high = document.querySelector("high");
  let low = document.querySelector("low");
  let pressure = document.querySelector("pressure");
  let humidity = document.querySelector("humidity");
  let sunrise = document.querySelector("sunrise");
  let sunset = document.querySelector("sunset");

  let celciusTemperature = Math.round(response.data.main.temp);

  temperature.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3056fd5bbb152c2a0c1ba637d3a4e4c&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-searched").value;
  searchCity(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}}&appid=e3056fd5bbb152c2a0c1ba637d3a4e4c&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
