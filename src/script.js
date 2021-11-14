let now = new Date();
let p1 = document.querySelector("p1");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Januaryy",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

p1.innerHTML = `${day}, ${date} ${month}, ${year}, ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class= "forecast col" id = "forecast" >
          <div class="card h-100">
            <div class="card-body">
              <div class="forecast-day">${formatDay(forecastday.dt)}</div>
              <p class="card-text">${Math.round(
                forecastday.temp.max
              )}°/ ${Math.round(forecastday.temp.min)}°</p>
              <img id = "fcimg"
                src="http://openweathermap.org/img/wn/${
                  forecastday.weather[0].icon
                }@2x.png"
          alt="" width = "90" height "100" id
              />
            </div>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showforecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#my-city").innerHTML = response.data.name;

  document.querySelector("#now-temp").innerHTML =
    Math.round(response.data.main.temp) + "°";

  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#cond").innerHTML =
    response.data.weather[0].description;

  let mainicon = document.querySelector("#main-icon");
  mainicon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainicon.setAttribute("alt", response.data.weather[0].icon);

  showforecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let city = document.querySelector("#enter-city").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let updateCity = document.querySelector("button");
updateCity.addEventListener("click", searchCity);

function entertext(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}
function showfartemp(event) {
  event.preventDefault();

  let fartemperature = (celsiusTemperature * 9) / 5 + 32;
  let h2 = document.querySelector("#now-temp");
  h2.innerHTML = Math.round(fartemperature) + "°";
}

function showceltemp(event) {
  event.preventDefault();
  let h2 = document.querySelector("#now-temp");
  h2.innerHTML = Math.round(celsiusTemperature) + "°";
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#form-enter");
searchForm.addEventListener("submit", entertext);

let farlink = document.querySelector("#unitfarlink");
farlink.addEventListener("click", showfartemp);

let cellink = document.querySelector("#unitcellink");
cellink.addEventListener("click", showceltemp);
