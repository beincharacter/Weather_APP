import React, { createContext, useState, useEffect } from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';

export const FavoriteCitiesContext = createContext();

const FavoriteCitiesProvider = ({ children }) => {
  const [favoriteCities, setFavoriteCities] = useState([]);
  console.log(favoriteCities);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavoriteCities(storedFavorites);
  }, []);

  const addFavoriteCity = (city) => {
    console.log(city, " in context")
    if(favoriteCities.includes(city)) {
      alert("already in favourite")
    } else {
      const newFavorites = [...favoriteCities, city];
      setFavoriteCities(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
    
  };

  return (
    <FavoriteCitiesContext.Provider value={{ favoriteCities, addFavoriteCity }}>
      {children}
    </FavoriteCitiesContext.Provider>
  );
};

export default FavoriteCitiesProvider;
