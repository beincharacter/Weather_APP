import React from 'react'
import "./HomeScreen.scss";
import CurrentCity from '../../componants/Current_City/Current_City';
import SearchScreen from '../Search/SearchScreen';

const HomeScreen = () => {
  return (
    <div className='home_screen'>
        <SearchScreen />
    </div>
  )
}

export default HomeScreen;