import React, { useState, useEffect, useContext } from 'react';
import "./Current_City.scss";
import { FavoriteCitiesContext } from '../../contexts/FavoriteCitiesContext';
import axios from 'axios';

const API_KEY = "bd5b7d71be447f2c70952f9d673cae73"
// const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const CurrentCity = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const { favoriteCities, handleFavouriteCityWeather } = useContext(FavoriteCitiesContext);
  console.log(favoriteCities, " in curr")

  // Get current weather for user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
          .then(response => {
            setCurrentWeather(response.data);
          })
          .catch(error => console.log(error));
      });
    }
  }, []);
  

  return (
    <div className='current_city'>
      {currentWeather && (
        <div className='current_city_weather'>
          <h3>Your City Weather</h3>
          <p>{currentWeather.name}, {currentWeather.sys.country}</p>
          <p>{currentWeather.weather[0].description}</p>
          <p>{currentWeather.main.temp} &deg;C</p>
        </div>
      )}
      {favoriteCities.length > 0 && (
        <div className='fav_locations'>
          <h2>Favorite Locations</h2>
          <ul>
            {favoriteCities.map((location, i) => (
              <li key={location + i} onClick={() => handleFavouriteCityWeather(location)}>{location}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default CurrentCity;
