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



function fahrenheit(){
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = ("66");
}
let fahrenheitClick = document.querySelector("#fahrenheit-link");
fahrenheitClick.addEventListener("click", fahrenheit);

function celsius(){
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = ("20");
}
let celsiusClick = document.querySelector("#celsius-link");
celsiusClick.addEventListener("click", celsius);


function displayWeatherData(response) {
  let city = response.data.name;
  let tempCelsius = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let temperature = document.querySelector(".temperature");
  if (city) {
    h1.innerHTML = `${city}`;
    temperature.innerHTML = `${tempCelsius}`;
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

function exactLocationWeather(response) {
  let city = response.data.name;
  let tempCelsius = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let temperature = document.querySelector(".temperature");
  if (city) {
    h1.innerHTML = `${city}`;
    temperature.innerHTML = `${tempCelsius}`;
   };
  }

function exactLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(exactLocationWeather);
}

function requestLocation() {
navigator.geolocation.getCurrentPosition(exactLocation);}

let exactLocationClick = document.querySelector("#location-button");
exactLocationClick.addEventListener("click", requestLocation);
