import React, { useState, useEffect, lazy, Suspense } from 'react';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import Search from './components/Search/Search';
import UnitToggle from './components/UnitToggle/UnitToggle';
import { getCurrentWeather, getFiveDayForecast } from './services/weatherService';
import './App.css';

const Forecast = lazy(() => import('./components/Forecast/Forecast'));

const App = () => {
  const defaultCity = 'New York';
  const [city, setCity] = useState(defaultCity);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [error, setError] = useState('');

  const fetchWeatherData = async (selectedCity, selectedUnit) => {
    try {
      setError('');
      const weather = await getCurrentWeather(selectedCity, selectedUnit);
      setCurrentWeather(weather);
      const forecast = await getFiveDayForecast(selectedCity, selectedUnit);
      setForecastData(forecast);
      setCity(selectedCity);
      // Cache the data
      localStorage.setItem(
        'weatherData',
        JSON.stringify({
          city: selectedCity,
          weather,
          forecast,
          unit: selectedUnit,
        })
      );
    } catch (err) {
      if (err && err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    // Check for cached data
    const cached = localStorage.getItem('weatherData');
    if (cached) {
      const parsed = JSON.parse(cached);
      setCity(parsed.city);
      setCurrentWeather(parsed.weather);
      setForecastData(parsed.forecast);
      setUnit(parsed.unit);
    } else {
      fetchWeatherData(defaultCity, unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchedCity) => {
    fetchWeatherData(searchedCity, unit);
  };

  const handleToggle = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    // Refetch data with new unit
    fetchWeatherData(city, newUnit);
  };

  const handleRefresh = () => {
    fetchWeatherData(city, unit);
  };

  return (
    <div className="app-container">
      <Search onSearch={handleSearch} />
      <UnitToggle unit={unit} onToggle={handleToggle} />
      <button onClick={handleRefresh} className="refresh-button">
        🔄 Refresh
      </button>
      {error && <div className="error-message">{error}</div>}
      {currentWeather && <WeatherDisplay data={currentWeather} unit={unit} />}
      {forecastData && (
        <Suspense fallback={<div>Loading Forecast...</div>}>
          <Forecast data={forecastData} unit={unit} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
