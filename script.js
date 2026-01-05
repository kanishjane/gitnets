function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();

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
    "Saturday"
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML =
    response.data.city;

  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.temperature.current);

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed);

  document.querySelector("#date-time").innerHTML =
    formatDate(new Date(response.data.time * 1000));

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url
  );
}

function searchCity(city) {
  let apiKey = "8297ctbc28addf64c89c09573c3d0o27";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearch);

// Default city
searchCity("Eldoret");
