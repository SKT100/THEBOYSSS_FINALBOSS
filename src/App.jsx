// App.jsx
import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Popup from './components/Popup';
import HomePage from './components/HomePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSignupSuccess = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsLogin(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <div className="glass-card">
                {isLogin ? (
                  <Login />
                ) : (
                  <Signup onSignupSuccess={handleSignupSuccess} />
                )}
                <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'New here? Create an account' : 'Already have an account? Sign in'}
                </button>
              </div>
              {showPopup && (
                <Popup message="Account created successfully!" onClose={handlePopupClose} />
              )}
            </div>
          }
        />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
