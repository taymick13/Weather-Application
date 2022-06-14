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
  let cardName = document.querySelector("#city-name");
  cardName.innerHTML = response.data.name;
  let tempDay = document.querySelector("#temp-day");
  tempDay.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let windElement = document.querySelector("wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
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
let form = document.querySelector("#search-weather");
form.addEventListener("submit", handleSubmit);
