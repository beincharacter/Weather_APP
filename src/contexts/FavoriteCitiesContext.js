import React, { createContext, useState, useEffect } from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';

export const FavoriteCitiesContext = createContext();

const FavoriteCitiesProvider = ({ children }) => {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favoriteCityWeather, setFavoriteCityWeather] = useState(null);
  // console.log(favoriteCityWeather, " in conetct fav city weather");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavoriteCities(storedFavorites);
  }, []);

  const addFavoriteCity = (city) => {
    
    if(favoriteCities.includes(city)) {
      alert("already in favorite")
    } else {
      const newFavorites = [...favoriteCities, city];
      setFavoriteCities(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const handleFavouriteCityWeather = (city) => {
    setFavoriteCityWeather(city);
  }

  const removeFavoriteCity = (city) => {
    const updatedFavorites = favoriteCities.filter(favCity => favCity !== city);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };
  

  return (
    <FavoriteCitiesContext.Provider value={{ favoriteCities, addFavoriteCity, favoriteCityWeather, handleFavouriteCityWeather, removeFavoriteCity }}>
      {children}
    </FavoriteCitiesContext.Provider>
  );
};

export default FavoriteCitiesProvider;
