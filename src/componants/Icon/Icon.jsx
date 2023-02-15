import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Icon.scss";

const Icon = () => {
  const navigate = useNavigate();
  return (
    <div className='icon'>
        <img src="https://img.icons8.com/bubbles/50/null/apple-weather.png" alt="logo" 
            onClick={() => navigate('/')}
            style={{cursor: "pointer"}}
            />
        <span className='app_name'>Your Weather App</span>
    </div>
  )
}

export default Icon