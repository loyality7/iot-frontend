import React, { useState, useEffect } from 'react';
import './IoT.css';

const IoT = () => {
  const [ledStates, setLedStates] = useState([false, false, false]);
  const API_BASE_URL = 'http://13.60.217.163:3000';

  // Fetch initial LED states
  useEffect(() => {
    fetchLedStatus();
  }, []);

  const fetchLedStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/led-status`);
      const data = await response.json();
      setLedStates(data.ledStates);
    } catch (error) {
      console.error('Error fetching LED status:', error);
    }
  };

  const toggleLed = async (index) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/led-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ledIndex: index,
          status: !ledStates[index],
        }),
      });
      const data = await response.json();
      setLedStates(data.ledStates);
    } catch (error) {
      console.error('Error toggling LED:', error);
    }
  };

  const setAllLeds = async (states) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/led-status/all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ states }),
      });
      const data = await response.json();
      setLedStates(data.ledStates);
    } catch (error) {
      console.error('Error setting all LEDs:', error);
    }
  };

  return (
    <div className="iot-container">
      <h1>IoT Dashboard</h1>
      <div className="led-controls">
        <h2>LED Controls</h2>
        <div className="led-grid">
          {ledStates.map((state, index) => (
            <div key={index} className="led-item">
              <div 
                className={`led-bulb ${state ? 'on' : 'off'}`}
                onClick={() => toggleLed(index)}
              >
                <div className="led-shine"></div>
              </div>
              <p className="led-label">LED {index + 1}</p>
              <button
                className={`led-button ${state ? 'on' : 'off'}`}
                onClick={() => toggleLed(index)}
              >
                {state ? 'ON' : 'OFF'}
              </button>
            </div>
          ))}
        </div>
        <div className="group-controls">
          <button onClick={() => setAllLeds([true, true, true])}>
            All ON
          </button>
          <button onClick={() => setAllLeds([false, false, false])}>
            All OFF
          </button>
        </div>
      </div>
    </div>
  );
};

export default IoT; 