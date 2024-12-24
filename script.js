const inputBox = document.querySelector("input");
const weatherContent = document.querySelector(".weather-content");

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

    if (data && data.name) {
      const monthIndex = [
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
      const year = date.getFullYear();
      const month = monthIndex[date.getMonth()];
      const day = date.getDate();
      weatherContent.innerHTML = `
          <div>${month} ${day}, ${year}</div>
          <div class="city-name">${data.name}</div>
            <div class="weather-condition">
              <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].main}">
              <p>${data.weather[0].main}, ${data.weather[0].description}</p>
            </div>
          <div class="temp-wind-pressure-humidity">
            <div class="temp">
              <p>Temperature:</p>
              <p>${data.main.temp} °C</p>
            </div>
            <div class="wind">
              <p>Wind:</p>
              <p>${data.wind.speed} m/s, ${data.wind.deg} deg</p>
            </div>
            <div class="pressure">
              <p>Pressure:</p>
              <p>${data.main.pressure} hPa</p>
            </div>
            <div class="humidity">
              <p>Humidity:</p>
              <p>${data.main.humidity} %</p>
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
