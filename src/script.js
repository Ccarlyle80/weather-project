let date = document.querySelector("#currentDate");
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let dateMonth = now.getDate();
let suffix = ["0", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"]
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

function formatForecastDay(time) {
let date = new Date(time *1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecastData(response) {
  forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if (index >0 && index < 6) {
    forecastHTML = forecastHTML + `  
  <div class="col future-info">
    ${formatForecastDay(forecastDay.time)}<br />
    <div id = forecastTemperature>${Math.round(forecastDay.temperature.maximum)}°</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="${forecastDay.condition.description}" width="70" height="70" id="forecastIcon" />
  </div>
  `;
  }})
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherData(response) {
  celsiusTemperature = response.data.temperature.current;
  let cityName = document.querySelector("#cityName");
  let todayWeatherIcon = document.querySelector("#todayIcon");
  let temperature = document.querySelector(".temperature");
  let weatherDescription = document.querySelector("#weatherDescription");
  let cityHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed"); 
    cityName.innerHTML = response.data.city;
    todayWeatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    todayWeatherIcon.setAttribute("alt", response.data.condition.description);
    temperature.innerHTML = Math.round(celsiusTemperature)+"°C";
    weatherDescription.innerHTML = response.data.condition.description;
    cityHumidity.innerHTML = response.data.temperature.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed); 
  }

function retrieveCityData(city){
  let apiKey = "28432465df08o7d6059bet758cfa8308";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
  axios.get(apiUrlForecast).then(displayForecastData);
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
  let apiKey = "28432465df08o7d6059bet758cfa8308";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
  axios.get(apiUrlForecast).then(displayForecastData);
}

function requestLocation() {
navigator.geolocation.getCurrentPosition(exactLocation);}

let exactLocationClick = document.querySelector("#location-button");
exactLocationClick.addEventListener("click", requestLocation);

function defaultCity(city){
  let apiKey = "28432465df08o7d6059bet758cfa8308";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
  axios.get(apiUrlForecast).then(displayForecastData);
}

let celsiusTemperature = null;

defaultCity("London");

