import React, { useState } from 'react';
import './slash.css';

const WeatherForecast = () => {
  const [locationInput, setLocationInput] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const getWeatherData = async (location) => {
    const apiKey = '08f0db41fb5113a806b1bd9e6c276607'; // Add your OpenWeatherMap API key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const uniqueDates = new Set();
      const formattedWeatherData = [];

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);

          const dailyForecast = data.list.find(
            (item) => new Date(item.dt * 1000).toLocaleDateString() === date
          );

          formattedWeatherData.push({
            date,
            temperature: dailyForecast.main.temp,
            description: dailyForecast.weather[0].description,
          });
        }
      });

      setWeatherData(formattedWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeatherData(locationInput);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search your location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="weather-cards-container">
        {weatherData.map((weather, index) => (
          <div className="weather-card" key={index}>
            <h2>{index+1}-Day Weather {locationInput}</h2>
            <div className="weather-info">
              <p>Date: {weather.date}</p>
              <p>Temperature: {weather.temperature}</p>
              <p>Description: {weather.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
