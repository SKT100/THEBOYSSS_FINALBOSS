import React from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <h1>Network</h1>
      <button onClick={() => navigate('/homepage')}>Back to Home</button>
    </div>
  );
};

export default NetworkPage;