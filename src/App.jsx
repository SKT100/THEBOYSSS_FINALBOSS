import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="app-container">
      <div className="glass-card">
        {isLogin ? <Login /> : <Signup />}
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}

export default App;