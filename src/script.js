let date = document.querySelector("#currentDate");
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let dateMonth = now.getDate();
let suffix = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"]
let dateSuffix = suffix[now.getDate()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let hour = now.getHours();
hour = hour.toString().padStart(2, "0");
let minutes = now.getMinutes();
minutes = minutes.toString().padStart(2, "0");
function formatDate(){
return `${day} ${dateMonth}${dateSuffix} ${month}, ${hour}:${minutes}`;
}
date.innerHTML = formatDate(new Date());

function displayWeatherData(response) {
  celsiusTemperature = response.data.main.temp;
  let cityName = document.querySelector("#cityName");
  let todayWeatherIcon = document.querySelector("#todayIcon");
  let temperature = document.querySelector(".temperature");
  let weatherDescription = document.querySelector("#weatherDescription");
  let cityHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed"); 
    cityName.innerHTML = response.data.name;
    todayWeatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    todayWeatherIcon.setAttribute("alt", response.data.weather[0].description);
    temperature.innerHTML = Math.round(celsiusTemperature);
    weatherDescription.innerHTML = response.data.weather[0].description;
    cityHumidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    }

function retrieveCityData(city){
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
}

function setCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let city = searchInput.value;
  retrieveCityData(city);
  }

let citySearchSubmit = document.querySelector("#search");
citySearchSubmit.addEventListener("submit", setCity);

let citySearchClick = document.querySelector("#search");
citySearchClick.addEventListener("click", setCity);

function exactLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
}

function requestLocation() {
navigator.geolocation.getCurrentPosition(exactLocation);}

let exactLocationClick = document.querySelector("#location-button");
exactLocationClick.addEventListener("click", requestLocation);

function defaultCity(city){
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
}

function fahrenheit(event){
  event.preventDefault();
  celsiusClick.classList.remove("hide-link");
  fahrenheitClick.classList.add("hide-link");
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round((celsiusTemperature*9/5)+32);
}

function celsius(event){
  event.preventDefault();
  fahrenheitClick.classList.remove("hide-link");
  celsiusClick.classList.add("hide-link");
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusClick = document.querySelector("#celsius-link");
celsiusClick.addEventListener("click", celsius);

let fahrenheitClick = document.querySelector("#fahrenheit-link");
fahrenheitClick.addEventListener("click", fahrenheit);

let celsiusTemperature = null;

defaultCity("London");