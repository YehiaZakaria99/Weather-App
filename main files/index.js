let homeLink = document.querySelector(".nav-item [href ='#home']");
let contactLink = document.querySelector(".nav-item [href ='#contact']");
let homeSection = document.getElementById("home");
let contactSection = document.getElementById("contact");
let homeLinkContact = document.querySelector(".contact [href ='#home']");
let findInput = document.getElementById("findInput");
let loading = document.getElementById("loading");
let loc;
// ######### Weather
let todayWeather = document.getElementById("todayWeather");
let tomorrowWeather = document.getElementById("tomorrowWeather");
let afterTomorrowWeather = document.getElementById("afterTomorrowWeather");
// ######### Date
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedensday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
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
const date = new Date();
// #########
(function () {
  let playAudio = document.getElementById("playAudio");
  let bgImg = document.querySelector(".bg-img .empty");
  bgImg.addEventListener("click", function () {
    playAudio.play();
    playAudioEng.pause();
  });
  let playAudioEng = document.getElementById("playAudioEng");
  let tel = document.getElementById("tel");
  tel.addEventListener("click", function (e) {
    playAudioEng.play();
    playAudio.pause();
  });
})();

// <!-- ########## Home Section ########## -->
homeLink.addEventListener("click", function (e) {
  homePage();
});

homeLinkContact.addEventListener("click", function (e) {
  homePage();
});
function homePage() {
  homeLink.classList.add("active");
  contactLink.classList.remove("active");
  contactSection.classList.add("d-none");
  homeSection.classList.remove("d-none");
}
// <!-- ########## Contact Section ########## -->
contactLink.addEventListener("click", function (e) {
  contactPage();
});
function contactPage() {
  contactLink.classList.add("active");
  homeLink.classList.remove("active");
  contactSection.classList.remove("d-none");
  homeSection.classList.add("d-none");
}

(async function () {
  let ip = await getIp();
  loc = await getLocation(ip);
  await getWeather(loc);
})();

// findInput
findInput.addEventListener("input", function (e) {
  if (!e.target.value) {
    getWeather(loc);
  }
  console.log(e.target.value);
  getWeather(e.target.value.toLowerCase());
});
// API

async function getWeather(inputVal) {
  try {
    loading.classList.remove("d-none");
    let resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=0347946360ad420698000159240812&q=${inputVal}&days=3`
    );
    let finalResp = await resp.json();
    let forecastResp = finalResp.forecast.forecastday;
    displayWeatherToday(finalResp);
    weatherForecast(forecastResp, 1, tomorrowWeather);
    weatherForecast(forecastResp, 2, afterTomorrowWeather);
  } catch (error) {
    console.log("Error Input");
  } finally {
    loading.classList.add("d-none");
  }
}

function displayWeatherToday(obj) {
  let box = `
    <div class="header d-flex justify-content-between">
      <span class="day">
        ${day[date.getDay()]}
      </span>
      <span class="date">
        ${date.getDate()} ${month[date.getMonth()]}
      </span>
    </div>
    <div class="body py-4">
      <h2 class="h3 location fs-5 px-3">${obj.location.name}</h3>
      <div class= "weather-status">
        <p class="weather-degree display-1 text-white fw-bold px-4 ">${
          obj.current.temp_c
        }<sup>o</sup>C</p>
        <div class="img-box">
          <img class="w-50" src="${obj.current.condition.icon}" alt="hilal">
        </div>
      </div>
      <div class="status px-3 mb-2">${obj.current.condition.text}</div>
      <div class="more-details px-3 my-3 d-flex justify-content-between w-75">
        <span>
          <i class="fa-solid fa-umbrella"></i>
          20%
        </span>
        <span>
          <i class="fa-solid fa-wind"></i>
          18km/h
        </span>
        <span>
          <i class="fa-solid fa-compass"></i>
          East
        </span>
      </div>
    </div>
  `;
  todayWeather.innerHTML = box;
}

function weatherForecast(obj, index, id) {
  let box = `
    <div class="header d-flex justify-content-center">
      <span class="day">
        ${day[date.getDay() + index]}
      </span>
    </div>
    <div class="body py-4 text-center">
      <div class="img-box">
        <img class="" src="${obj[index].day.condition.icon}" alt="113">
      </div>
      <p class="weather-degree text-white fw-bold px-4 fs-4 mb-0 mt-2">${
        obj[index].day.maxtemp_c
      }<sup>o</sup>C</p>
      <p class="weather-degree fw-bold px-4 fw-light">${
        obj[index].day.mintemp_c
      }<sup>o</sup></p>
      <div class="status px-3 mb-2">${obj[index].day.condition.text}</div>
    </div>
  `;
  id.innerHTML = box;
}

// Geo API
async function getIp() {
  try {
    let resp = await fetch("https://api.ipgeolocation.io/getip");
    let finalResp = await resp.json();
    let userIp = finalResp.ip;
    return userIp;
  } catch (error) {
    console.log("Error ip");
  }
}

async function getLocation(ip) {
  try {
    let resp = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=9fc9774240d746dd8b95b968332ec86c&ip=${ip}`
    );
    let finalResp = await resp.json();
    let userLocation = finalResp.country_capital;
    return userLocation;
  } catch (error) {
    console.log("Error location");
  }
}
