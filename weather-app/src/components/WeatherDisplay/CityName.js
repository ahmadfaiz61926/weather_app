// src/components/WeatherDisplay/CityName.js
import React from 'react';
import './CityName.css';

const CityName = ({ name }) => {
  return <h2 className="city-name">{name}</h2>;
};

export default CityName;
