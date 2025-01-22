import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IoT from './pages/IoT';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/iot">IoT</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/iot" element={<IoT />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
