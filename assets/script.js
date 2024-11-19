const inputBox = document.querySelector("input");
const weatherContent = document.querySelector(".weather-content");
const cityName = document.querySelector(".city-name");
const weatherCondition = document.querySelector(".weather-condition p");
const temperature = document.querySelector(".temp p");
const wind = document.querySelector(".wind p");

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const inputCity = inputBox.value.trim();
    weatherContent.innerHTML = `<h1 class="text-xl">Searching...</h1>`;
    if (inputCity) {
      getWeatherDetails(inputCity);
    } else {
      weatherContent.innerHTML = `<h1 class="text-xl">Enter a city name :(</h1>`;
    }
  }
});

async function getWeatherDetails(inputCity) {
  try {
    const apiKey = "a2088036f9abfaa7704ec2488d1b763d";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (data && data.name) {
      weatherContent.innerHTML = `
          <div class="city-name text-3xl">${data.name}</div>
                <div class="weather-condition text-2xl">
                  <img class="mx-auto" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].main}">
                  <p>${data.weather[0].main}</p>
                </div>
                <div class="temp-wind text-xl grid grid-cols-2 gap-10">
                  <div class="temp">
                    <i class="fa-solid fa-temperature-half fa-lg"></i>
                    <p>${data.main.temp} °C</p>
                  </div>
                  <div class="wind">
                    <i class="fa-solid fa-wind fa-lg"></i>
                    <p>${data.wind.speed} m/s</p>
                  </div>
                </div>
          `;
    } else {
      weatherContent.innerHTML = `<h1 class="text-xl">Unknown City :(</h1>`;
    }
  } catch (err) {
    weatherContent.innerHTML = `<h1 class="text-xl">Try again later :(</h1>`;
  }
  inputBox.value = ``;
}

getWeatherDetails("Biratnagar");
