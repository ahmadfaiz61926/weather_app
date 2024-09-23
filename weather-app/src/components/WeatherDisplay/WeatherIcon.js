// src/components/WeatherDisplay/WeatherIcon.js
import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ icon }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return <img src={iconUrl} alt="Weather Icon" className="weather-icon" />;
};

export default WeatherIcon;
