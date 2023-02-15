import React, { useContext } from 'react';
import "./DetailsScreen.scss";
import { FavoriteCitiesContext } from '../../contexts/FavoriteCitiesContext';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailsScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state, "location")

  const { addFavoriteCity } = useContext(FavoriteCitiesContext);

  const handleAddFavorite = () => {

  };


  return (
    <div className='details_'>
      {state.currentWeather && (
        <div className='current_weather'>
          <p>{state.currentWeather.name}, {state.currentWeather.sys.country}</p>
          <button onClick={() => addFavoriteCity(state.currentWeather.name)}>Add to favourte</button>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      )}
      {state.forecast.length > 0 && (
        <div className='forecast'>
          <h3>5-day Weather Forecast</h3>
          <ul>
            {state.forecast.map((forecastData, index) => (
              index % 8 === 0 && (
                <li className='forecast_list' key={forecastData.dt}>
                  <p className='date'>{new Date(forecastData.dt * 1000).toLocaleDateString()}</p>
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