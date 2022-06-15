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
  console.log(response.data);
  let cityName = document.querySelector("#city-name");
  let tempDay = document.querySelector("#temp-day");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  tempDay.innerHTML = Math.round(celciusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = response.data.wind.speed;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#weather");
  searchCity(input.value);
}
function showFahreinheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");
  let fahreinheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahreinheitLink");
fahrenheitLink.addEventListener("click", showFahreinheitTemperature);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", showCelciusTemperature);

searchCity("Nashville");
