import React from 'react';
import "./DetailsScreen.scss";
import { useLocation, useNavigate } from 'react-router-dom';

const DetailsScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state, "location")

  const handleAddFavorite = () => {

  };


  return (
    <div className='details_'>
      {state.currentWeather && (
        <div className='current_weather'>
          <h3>Current Weather</h3>
          <p>{state.currentWeather.name}, {state.currentWeather.sys.country}</p>
          <p>{state.currentWeather.weather[0].description}</p>
          <p>Temperature: {state.currentWeather.main.temp} &deg;C</p>
          <p>Humidity: {state.currentWeather.main.humidity} %</p>
          <p>Wind Speed: {state.currentWeather.wind.speed} m/s</p>
          <p>Sea Level: {state.currentWeather.main.sea_level} hPa</p>
          <p>Pressure: {state.currentWeather.main.pressure} hPa</p>
          <button onClick={handleAddFavorite}>Add to favorites</button>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      )}
      {state.forecast.length > 0 && (
        <div className='forecast'>
          <h2>5-day Weather Forecast</h2>
          <ul>
            {state.forecast.map((forecastData, index) => (
              index % 8 === 0 && (
                <li className='forecast_list' key={forecastData.dt}>
                  <p>{new Date(forecastData.dt * 1000).toLocaleDateString()}</p>
                  <p>{forecastData.weather[0].description}</p>
                  <p>Temperature: {forecastData.main.temp} &deg;C</p>
                  <p>Humidity: {forecastData.main.humidity} %</p>
                  <p>Wind Speed: {forecastData.wind.speed} m/s</p>
                  <p>Sea Level: {forecastData.main.sea_level} hPa</p>
                  <p>Pressure: {forecastData.main.pressure} hPa</p>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DetailsScreen