import React, { useState, useContext } from 'react';
import "./SearchScreen.scss";
import { FavoriteCitiesContext } from '../../contexts/FavoriteCitiesContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiHeart3Line } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';
import { FaTemperatureLow, FaWind, FaWater, FaThermometerHalf, FaTachometerAlt } from 'react-icons/fa';

const API_KEY = "bd5b7d71be447f2c70952f9d673cae73";
// const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

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
            <p><FaTemperatureLow /> Temperature:  {currentWeather.main.temp} &deg;C</p>
            <p><FaWater /> Humidity:  {currentWeather.main.humidity}%</p>
            <p><FaWind /> Wind Speed:  {currentWeather.wind.speed} km/h</p>
            <p><FaTachometerAlt /> Sea Level:  {currentWeather.main.sea_level} m</p>
            <p><FaThermometerHalf /> Pressure:{currentWeather.main.pressure} hPa</p>
            <button onClick={() => addFavoriteCity(currentWeather.name)}>Add to favorite</button>
            <button onClick={() => navigate('/details', {
              state: {
                forecast: forecast,
                currentWeather: currentWeather
              }
            })}>see more</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
