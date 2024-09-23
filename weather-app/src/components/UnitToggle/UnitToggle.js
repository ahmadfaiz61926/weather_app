import React from 'react';
import './UnitToggle.css';

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle">
      <span className={unit === 'metric' ? 'active' : ''}>°C</span>
      <label className="switch">
        <input type="checkbox" checked={unit === 'imperial'} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <span className={unit === 'imperial' ? 'active' : ''}>°F</span>
    </div>
  );
};

export default UnitToggle;
