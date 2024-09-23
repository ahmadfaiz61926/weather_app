import React from 'react';
import CityName from './CityName';
import Temperature from './Temperature';
import WeatherCondition from './WeatherCondition';
import WeatherIcon from './WeatherIcon';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, unit }) => {
  return (
    <div className="weather-display">
      <CityName name={data.name} />
      <WeatherIcon icon={data.weather[0].icon} />
      <Temperature temp={data.main.temp} unit={unit} />
      <WeatherCondition condition={data.weather[0].description} />
    </div>
  );
};

export default WeatherDisplay;
