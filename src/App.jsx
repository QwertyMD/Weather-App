import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const apiKey = "a2088036f9abfaa7704ec2488d1b763d";
  const [city, setCity] = useState("Biratnagar");
  const [data, setData] = useState();

  const getWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, [city]);

  const handleSearch = () => {
    const inputCity = document.querySelector(".search-input").value;
    if (inputCity) {
      setCity(inputCity);
    }
  };

  if (!data) {
    return;
  }

  return (
    <div className="weather-card">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
        />
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
      </div>
      <div className="location">
        <h1 className="city">{data.name}</h1>
        <p className="weather-description">{data.weather[0].description}</p>
      </div>

      <div className="weather-icon">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
        />
      </div>

      <div className="temperature">
        <span className="temp-value">{data.main.temp}°C</span>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-info">
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">
              {data.wind.speed} m/s {data.wind.deg}°
            </div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-info">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{data.main.humidity}%</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">📊</div>
          <div className="detail-info">
            <div className="detail-label">Pressure</div>
            <div className="detail-value">{data.main.pressure} hPa</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <div className="detail-label">Feels Like</div>
            <div className="detail-value">{data.main.feels_like}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
