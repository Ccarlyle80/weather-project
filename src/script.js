let date = document.querySelector("#currentDate");
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hour = now.getHours();
hour = hour.toString().padStart(2, "0");
let minutes = now.getMinutes();
minutes = minutes.toString().padStart(2, "0");
function formatDate(){
return `${day} ${hour}:${minutes}`;
}
date.innerHTML = formatDate(new Date());

function displayWeatherData(response) {
  
  celsiusTemperature = response.data.main.temp;
  
  let city = response.data.name;
  let tempCelsius = Math.round(celsiusTemperature);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let cityName = document.querySelector("#cityName");
  let temperature = document.querySelector(".temperature");
  let weatherDescription = document.querySelector("#weatherDescription");
  let cityHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed"); 
  if (city) {
    cityName.innerHTML = `${city}`;
    temperature.innerHTML = `${tempCelsius}`;
    weatherDescription.innerHTML = `${description}`;
    cityHumidity.innerHTML = `${humidity}`;
    windSpeed.innerHTML = `${wind}`;
   }
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
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature*9/5)+32);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = fahrenheitTemperature;
}

function celsius(event){
  event.preventDefault();
  fahrenheitClick.classList.remove("active");
  celsiusClick.classList.add("active");
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusClick = document.querySelector("#celsius-link");
celsiusClick.addEventListener("click", celsius);

let fahrenheitClick = document.querySelector("#fahrenheit-link");
fahrenheitClick.addEventListener("click", fahrenheit);

let celsiusTemperature = null;


defaultCity("London");