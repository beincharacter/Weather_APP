import React from 'react';
import "./base.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './screens/Home/HomeScreen';
import Icon from "./componants/Header/Icon";
import DetailsScreen from './screens/Details/DetailsScreen';
import CurrentCity from './componants/Current_City/Current_City';
import FavoriteCitiesProvider from './contexts/FavoriteCitiesContext';

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Icon />
        <div className='main_app'>
          <FavoriteCitiesProvider>
            <CurrentCity />
              <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/details' element={<DetailsScreen />} />
              </Routes>
          </FavoriteCitiesProvider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
