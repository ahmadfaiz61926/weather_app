import React from 'react';
import ForecastCard from '../ForecastCard/ForecastCard';
import './Forecast.css';

const Forecast = ({ data, unit }) => {
  const dailyData = data.list.filter((reading) =>
    reading.dt_txt.includes('12:00:00')
  );

  return (
    <div className="forecast-container">
      {dailyData.map((dayData, index) => (
        <ForecastCard key={index} data={dayData} unit={unit} />
      ))}
    </div>
  );
};

export default Forecast;
