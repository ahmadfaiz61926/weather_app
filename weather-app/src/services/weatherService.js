import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city, units = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getFiveDayForecast = async (city, units = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
