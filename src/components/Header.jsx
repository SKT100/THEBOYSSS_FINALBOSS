import React from 'react';
import checkIcon from '../assets/checkmark.svg';
import menuIcon from '../assets/hamburger.svg';

const Header = () => (
  <div className="meeting-header">
    <div className="top-left">
      <div className="status-indicator">
        <img src={checkIcon} alt="Secure" />
      </div>
    </div>
    <div className="top-right">
      <img src={menuIcon} alt="Menu" className="menu-icon" />
    </div>
  </div>
);

export default Header;
