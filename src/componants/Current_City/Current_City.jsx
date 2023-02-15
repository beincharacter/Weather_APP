import React, { useState, useEffect, useContext } from 'react';
import "./Current_City.scss";
import { FavoriteCitiesContext } from '../../contexts/FavoriteCitiesContext';
import axios from 'axios';
const API_KEY = "bd5b7d71be447f2c70952f9d673cae73"

const CurrentCity = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [favoriteLocations, setFavoriteLocations] = useState([]);
  const { favoriteCities } = useContext(FavoriteCitiesContext);
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

  // Load favorite locations from local storage
  // useEffect(() => {
  //   const storedFavorites = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
  //   setFavoriteLocations(storedFavorites);
  // }, []);

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
          <h2>Your Favorite Locations</h2>
          <ul>
            {favoriteCities.map(location => (
              <li key={location.id}>{location}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrentCity;
