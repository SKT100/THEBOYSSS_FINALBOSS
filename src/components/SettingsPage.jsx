import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <h1>Settings</h1>
      <button onClick={() => navigate('/homepage')}>Back to Home</button>
    </div>
  );
};

export default SettingsPage;
