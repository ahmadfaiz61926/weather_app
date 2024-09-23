// src/components/WeatherDisplay/Temperature.js
import React from 'react';
import './Temperature.css';

const Temperature = ({ temp, unit }) => {
  return (
    <div className="temperature">
      {Math.round(temp)}°{unit === 'metric' ? 'C' : 'F'}
    </div>
  );
};

export default Temperature;
