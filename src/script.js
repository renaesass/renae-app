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

function showWeather(response) {
  document.querySelector("#my-city").innerHTML = response.data.name;

  document.querySelector("#now-temp").innerHTML =
    Math.round(response.data.main.temp) + "°";

  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let mainicon = document.querySelector("#main-icon");
  mainicon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainicon.setAttribute("alt", response.data.weather[0].icon);
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
let searchForm = document.querySelector("#form-enter");
searchForm.addEventListener("submit", entertext);
