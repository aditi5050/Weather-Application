function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearch").value;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = cityInput;
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function displayTime(tstamp) {
  let now = new Date(tstamp * 1000);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  let timeElement = document.querySelector("#time");
  console.log(`${hour}:${minute}:${second}`);
  if (minute < 10) timeElement.innerHTML = `${hour}:0${minute}:${second}`;
  if (second < 10) timeElement.innerHTML = `${hour}:${minute}:0${second}`;
  if (second < 10 && minute < 10)
    timeElement.innerHTML = `${hour}:0${minute}:0${second}`;
  else timeElement.innerHTML = `${hour}:${minute}:${second}`;
}
function displayTemp(response) {
  console.log(response.data);
  let cityTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}`;
  temperatureElement = temperature;

  let wDescription = document.querySelector("#weather-description");
  wDescription.innerHTML = `${response.data.weather[0].description}`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let timestamp = response.data.dt;
  let iconElement = response.data.weather[0].icon;
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconElement}@2x.png`);
  displayTime(timestamp);
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
  displayTime(timestamp);
}

function convertToFarenhiet() {
  let farenhiet = Math.round(1.8 * temperatureElement + 32);
  let newTemp = document.querySelector("#temperature");
  newTemp.innerHTML = farenhiet;
  let farenhietLink = document.querySelector("#farenhiet");
  farenhietLink.classList.add("active");
  document.querySelector("#celsius").classList.remove("active");
}

function convertToCelsius() {
  let newTemp = document.querySelector("#temperature");
  newTemp.innerHTML = temperatureElement;
  document.querySelector("#farenhiet").classList.remove("active");
  document.querySelector("#celsius").classList.add("active");
}

let form = document.querySelector("#input-form");
form.addEventListener("submit", showCity);

let temperatureElement = null;
console.log(temperatureElement);

let farenhietElement = document.querySelector("#farenhiet");
farenhietElement.addEventListener("click", convertToFarenhiet);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", convertToCelsius);
