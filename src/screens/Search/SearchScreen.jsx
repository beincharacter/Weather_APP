import React, { useState, useContext } from 'react';
import "./SearchScreen.scss";
import { FavoriteCitiesContext } from '../../contexts/FavoriteCitiesContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_KEY = "bd5b7d71be447f2c70952f9d673cae73"

const SearchScreen = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const { addFavoriteCity } = useContext(FavoriteCitiesContext);

  const handleSearch = event => {
    event.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setCurrentWeather(response.data);
        setSearchError(false);
      })
      .catch(error => {
        console.log(error);
        setCurrentWeather(null);
        setSearchError(true);
      });

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setForecast(response.data.list);
        setSearchError(false);
      })
      .catch(error => {
        console.log(error);
        setForecast([]);
        setSearchError(true);
      });
  };

  const handleAddFavorite = () => {

  };

  return (
    <div className='search_screen'>
      <h3>Search for a Location</h3>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Enter a location" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      {searchError && (
        <p>An error occurred while searching for the location.</p>
      )}
      {currentWeather && (
        <div className='current_weather'>
          <div className="current_weather_box">
            <h3>Current Weather</h3>
            <p>{currentWeather.name}, {currentWeather.sys.country}</p>
            <p>{currentWeather.weather[0].description}</p>
            <p>Temperature: {currentWeather.main.temp} &deg;C</p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p>Wind Speed: {currentWeather.wind.speed} km/h</p>
            <p>Sea Level: {currentWeather.main.sea_level} m</p>
            <p>Pressure: {currentWeather.main.pressure} hPa</p>
            <button onClick={() => addFavoriteCity(currentWeather.name)}>Add to favorites</button>
            <button onClick={() => navigate('/details', {
              state: {
                forecast: forecast,
                currentWeather: currentWeather
              }
            })}>see more</button>
          </div>
        </div>
      )}

      {/* {forecast.length > 0 && (
        <div>
          <h2>5-day Weather Forecast</h2>
          <ul>
            {forecast.map((forecastData, index) => (
              index % 8 === 0 && (
                <li key={forecastData.dt}>
                  <p>{new Date(forecastData.dt * 1000).toLocaleDateString()}</p>
                  <p>{forecastData.weather[0].description}</p>
                  <p>{forecastData.main.temp} &deg;C</p>
                </li>
              )
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default SearchScreen;