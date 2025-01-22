import React from 'react';
import './Alert.css';

export const Alert = ({ children }) => {
  return <div className="alert">{children}</div>;
};

export const AlertDescription = ({ children }) => {
  return <div className="alert-description">{children}</div>;
}; 