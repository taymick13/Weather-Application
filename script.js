//date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentDate = new Date();

dateElement.innerHTML = formatDate(currentDate);

//weather
function showWeather(response) {
  let cityName = document.querySelector("#city-name");
  let tempDay = document.querySelector("#temp-day");
  let description = document.querySelector("#description");
  let windElement = document.querySelector("wind");
  let humidityElement = document.querySelector("humidity");
  let iconElement = document.querySelector("icon");

  celciusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  tempDay.innerHTML = Math.round(celciusTemperature);
  description.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//search city
function searchCity(city) {
  let apiKey = `0e8c9bd3a0b9e6f1ec3e74301ee25378`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#weather");
  searchCity(input.value);
}
function showFahreinheitTemperature(event) {
  event.preventDefault();
  celciuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahreinheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  celciuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-weather");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#f-link");
fahrenheitlink.addEventListener("click", showFahreinheitTemperature);

let celciuslink = document.querySelector("#c-link");
celciuslink.addEventListener("click", showCelciusTemperature);

search("Nashville");
