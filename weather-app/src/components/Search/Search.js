import React, { useState, useEffect, useRef } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const wrapperRef = useRef(null);

  const cities = [
    'New York',
    'London',
    'Paris',
    'Tokyo',
    'Sydney',
    'Mumbai',
    'Cairo',
    'Moscow',
    'Rio de Janeiro',
    'Toronto',
    // ... more cities
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
      setDropdownOpen(true);
    } else {
      setSuggestions([]);
      setDropdownOpen(false);
    }
  };

  const handleSelect = (city) => {
    setQuery(city);
    setDropdownOpen(false);
    onSearch(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    onSearch(query);
    setDropdownOpen(false);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
      {dropdownOpen && suggestions.length > 0 && (
        <ul className="dropdown">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Search;
