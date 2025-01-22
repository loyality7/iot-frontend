import React from 'react';
import './Switch.css';

export const Switch = ({ checked, onCheckedChange, disabled }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheckedChange(!checked)}
        disabled={disabled}
      />
      <span className="slider round"></span>
    </label>
  );
}; 