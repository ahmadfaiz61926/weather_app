import React from 'react';
import { format } from 'date-fns';
import './ForecastCard.css';

const ForecastCard = ({ data, unit }) => {
  const date = new Date(data.dt * 1000);
  const day = format(date, 'EEEE');

  return (
    <div className="forecast-card">
      <div className="forecast-day">{day}</div>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="forecast-icon"
      />
      <div className="forecast-temp">
        <span className="temp-high">{Math.round(data.main.temp_max)}°</span> /{' '}
        <span className="temp-low">{Math.round(data.main.temp_min)}°</span>
        {unit === 'metric' ? 'C' : 'F'}
      </div>
    </div>
  );
};

export default ForecastCard;
