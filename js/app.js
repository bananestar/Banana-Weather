/*
 * Created on Mon Jun 27 2022 15:59:52
 *
 * Copyright (c) 2022 Simon Vander Linden
 */

const displayResult = document.getElementById("weather");
const formQuery = document.forms["formQuery"];

const key = "bfc7ad09e553c1efc6f19c1e8c27126c";

formQuery.addEventListener("submit", (event) => {
  const InputCity = formQuery["city"];
  const city = InputCity.value;

  event.preventDefault();

  sendRequestData(city);

  formQuery.reset();
  InputCity.focus();
});

//! Request AJAX with fetch
const sendGetRequest = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

//! Request Search --> lat & lon for city
const sendRequestData = async (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;

  try {
    const data = await sendGetRequest(url);
    // console.log(data);
    sendRequestWeather(data);
  } catch (error) {
    console.log(error);
    displayResult.textContent = error;
  }
};

//! Request lat & lon -> weather for city
const sendRequestWeather = async (city) => {
  const lat = city[0].lat;
  const lon = city[0].lon;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&appid=${key}`;
  try {
    const data = await sendGetRequest(url);
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.log(error);
    displayResult.textContent = error;
  }
};

//! Display Result
const displayWeather = (city) => {
  const icon = city.weather[0].icon;
  const frag =
    "https://flagcdn.com/16x12/" + city.sys.country.toLowerCase() + ".png";
  const name = city.name;
  const temp = (city.main.temp - 273.15).toFixed(2);
  const feels_like = (city.main.feels_like - 273.15).toFixed(2);
  const weather = city.weather[0].description;

  console.log(icon);
  console.log(name);
  console.log(temp);
  console.log(feels_like);
  console.log(weather);

  const divPEl = document.createElement("div");
  divPEl.classList.add("ml-4", "mr-4", "mt-4", "col");
  divPEl.style.alignItems = "unset";

  const divTitleIconElEl = document.createElement("div");
  divTitleIconElEl.classList.add("ml-4", "mr-4", "mt-4", "row");

  const iconEl = document.createElement("img");
  iconEl.classList.add("rounded-circle");
  iconEl.style.backgroundColor = "white";
  iconEl.src = "../img/icons/" + icon + ".png";

  const titleEl = document.createElement("h4");
  titleEl.textContent = name;

  const fragEl = document.createElement("img");
  fragEl.src = frag;
  fragEl.srcset =
    "https://flagcdn.com/32x24/" +
    city.sys.country.toLowerCase() +
    ".png 2x,https://flagcdn.com/48x36/" +
    city.sys.country.toLowerCase() +
    ".png 3x";
  fragEl.width = "16";
  fragEl.height = "12";
  fragEl.alt = city.sys.country;

  const divTempfeels_likeEl = document.createElement("div");
  divTempfeels_likeEl.classList.add("mt-4");

  const pTempEl = document.createElement("p");
  const pfeels_likeEl = document.createElement("p");

  pTempEl.textContent = "Temperature: " + temp + " °C.";
  pfeels_likeEl.textContent = "Resenti: " + feels_like + " °C.";

  const divWeatherEl = document.createElement("div");
  divWeatherEl.classList.add("mt-4");

  const pWeatherEl = document.createElement("p");
  pWeatherEl.textContent = "La météo est: " + weather + ".";

  displayResult.textContent = "";

  divWeatherEl.appendChild(pWeatherEl);

  divTempfeels_likeEl.appendChild(pTempEl);
  divTempfeels_likeEl.appendChild(pfeels_likeEl);

  divTitleIconElEl.appendChild(iconEl);
  divTitleIconElEl.appendChild(titleEl);
  divTitleIconElEl.appendChild(fragEl);

  divPEl.appendChild(divTitleIconElEl);
  divPEl.appendChild(divTempfeels_likeEl);
  divPEl.appendChild(divWeatherEl);
  displayResult.appendChild(divPEl);
};
