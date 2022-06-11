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
let dateElement = document.querySelector("h2");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#weather");
  let h5 = document.querySelector("h5");
  if (searchInput.value) {
    h5.innerHTML = `${searchInput.value}`;
  } else {
    alert(`Please type a city`);
  }
}
let form = document.querySelector("#search-weather");
form.addEventListener("submit", search);

function showWeather(response) {
  document.querySelector("#card-title").innerHTML = response.data.name;
  document.querySelector("#temp-day").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#desricption").innerHTML =
    response.data.weather[0].main;
}

function searchLocation(position) {
  let apiKey = `0e8c9bd3a0b9e6f1ec3e74301ee25378`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}
