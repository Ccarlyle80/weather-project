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

function displayForecastData(response) {
//  console.log(response.data.daily);
// celsiusForecastTemperature = response.data.daily.temperature.maximum;
// let forecastWeatherIcon = document.querySelector("#forecastIcon");
// let forecastTemperature = document.querySelector("#forecastTemperature");
//    forecastWeatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily.condition.icon}.png`);
//    forecastWeatherIcon.setAttribute("alt", response.data.daily.condition.description);
//    forecastTemperature.innerHTML = Math.round(celsiusForecastTemperature);
 let forecastElement = document.querySelector("#forecast");
 let forecastHTML = `<div class="row">`;
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function(day){
  forecastHTML = forecastHTML + `  
  <div class="col future-info">
    ${day}<br />
    <div id = forecastTemperature>14</div>
    <img src="" alt="test" id="forecastIcon" />
  </div>
  `;
  })
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
    temperature.innerHTML = Math.round(celsiusTemperature);
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

let celsiusClick = document.querySelector("#celsiusLink");
celsiusClick.addEventListener("click", celsius);

let fahrenheitClick = document.querySelector("#fahrenheitLink");
fahrenheitClick.addEventListener("click", fahrenheit);

let celsiusTemperature = null;

defaultCity("London");
