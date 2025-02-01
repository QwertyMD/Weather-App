const inputBox = document.querySelector("input");
const weatherContent = document.querySelector(".weather-content");
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

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const inputCity = inputBox.value.trim();
    weatherContent.innerHTML = `<h1>Searching...</h1>`;
    if (inputCity) {
      getWeatherDetails(inputCity);
    } else {
      weatherContent.innerHTML = `<h1>Enter a city name :(</h1>`;
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
      weatherContent.innerHTML = `
          <div class="date">${month} ${day}, ${year}</div>
          <h1 class="city-name">${data.name}</h1>
            <div class="weather-condition">
              <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].main}">
              <p>${data.weather[0].main}, ${data.weather[0].description}</p>
            </div>
          <div class="temp-wind-pressure-humidity">
            <div class="temp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="none">
                <path d="M12 22C14.7614 22 17 19.7614 17 17C17 15.3644 16.2147 13.9122 15.0005 13V5.00049C15.0005 4.06815 15.0005 3.60198 14.8481 3.23428C14.6451 2.74451 14.256 2.35537 13.7662 2.15239C13.3985 2 12.9323 2 12 2C11.0677 2 10.6015 2 10.2338 2.15239C9.74402 2.35537 9.35488 2.74451 9.1519 3.23428C8.99951 3.60198 8.99951 4.06815 8.99951 5.00049V13C7.78534 13.9122 7 15.3644 7 17C7 19.7614 9.23858 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M12 15C10.8954 15 10 15.8954 10 17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17C14 15.8954 13.1046 15 12 15ZM12 15V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p>${data.main.temp}°C</p>
            </div>
            <div class="wind">
              <div class="speed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="none">
                  <path d="M2 5.94145C5.5 9.37313 10.5755 7.90241 11.7324 5.94145C11.9026 5.65301 12 5.31814 12 4.96096C12 3.87795 11.1046 3 10 3C8.89543 3 8 3.87795 8 4.96096" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M17 8.92814C17 7.31097 18.1193 6 19.5 6C20.8807 6 22 7.31097 22 8.92814C22 9.6452 21.7799 10.3021 21.4146 10.8111C19.3463 14.1915 9.2764 12.9164 4 11.8563" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M13.0854 19.8873C13.2913 20.5356 13.8469 21 14.5 21C15.3284 21 16 20.2528 16 19.331C16 19.0176 15.9224 18.7244 15.7873 18.4738C14.4999 15.9925 7.99996 14.3239 2 18.7746" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M19 15.5H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>${data.wind.speed}m/s</p>
              </div>
              <div class="direction">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="none">
                  <path d="M4.91872 4.43926C5.46116 3.73152 5.73238 3.37764 6.10315 3.18882C6.47393 3 6.89759 3 7.74491 3H10.1606C11.0277 3 11.4612 3 11.7306 3.29289C12 3.58579 12 4.05719 12 5V9H7.74491C6.89759 9 6.47393 9 6.10315 8.81118C5.73238 8.62236 5.46116 8.26848 4.91872 7.56074L4.70383 7.28037C4.23461 6.66816 4 6.36205 4 6C4 5.63795 4.23461 5.33184 4.70383 4.71963L4.91872 4.43926Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M19.0813 9.43926C18.5388 8.73152 18.2676 8.37764 17.8968 8.18882C17.5261 8 17.1024 8 16.2551 8H12V14H16.2551C17.1024 14 17.5261 14 17.8968 13.8112C18.2676 13.6224 18.5388 13.2685 19.0813 12.5607L19.2962 12.2804C19.7654 11.6682 20 11.362 20 11C20 10.638 19.7654 10.3318 19.2962 9.71963L19.0813 9.43926Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 21L12 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 21H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>${data.wind.deg}deg</p>
              </div>
            </div>
            <div class="pressure">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="none">
                <path d="M9 13H9.80031C10.4304 13 10.7454 13 10.9985 13.1493C11.2517 13.2987 11.3926 13.5677 11.6743 14.1056L13.1905 17L15.2857 11L16.8018 13.8944C17.0836 14.4323 17.2245 14.7013 17.4777 14.8507C17.7308 15 18.0458 15 18.6759 15H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.5 12C19.732 8.4154 16.7237 5.03871 14.5241 2.97222C13.1443 1.67593 11.04 1.67593 9.66019 2.97222C7.11961 5.35907 3.5 9.49387 3.5 13.678C3.5 17.7804 6.75366 22 12.0921 22C15.4851 22 18.0359 20.2955 19.4444 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              <p>${data.main.pressure}hPa</p>
            </div>
            <div class="humidity">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="none">
                <path d="M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M4 12.284C5.46463 11.8303 8.39159 11.6836 11.9842 13.7016C15.57 15.7157 18.516 14.9984 20 14.1354" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              <p>${data.main.humidity}%</p>
            </div>
          </div>
          `;
    } else {
      weatherContent.innerHTML = `<h1>Unknown City :(</h1>`;
    }
  } catch (err) {
    weatherContent.innerHTML = `<h1>Try again later :(</h1>`;
  }
  inputBox.value = ``;
}

getWeatherDetails("Biratnagar");
