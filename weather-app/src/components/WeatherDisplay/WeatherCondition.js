// src/components/WeatherDisplay/WeatherCondition.js
import React from 'react';
import './WeatherCondition.css';

const WeatherCondition = ({ condition }) => {
  return <div className="weather-condition">{condition}</div>;
};

export default WeatherCondition;
