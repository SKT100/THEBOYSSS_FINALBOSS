import React from 'react';
import './Form.css';

const splitText = (text) => {
  return text.split('').map((char, index) => {
    const isBold = index < 6; 
    return (
      <span
        key={index}
        className="letter"
        style={{
          animationDelay: `${index * 0.05}s`,
          fontWeight: isBold ? 'bold' : 'normal', 
        }}
      >
        {char}
      </span>
    );
  });
};

function Signup() {
  return (
    <form className="form">
      <div className="logo-heading">
        <img src="/logo.svg" className="logo" alt="logo" />
        <h2>
          {splitText('BEYONDmeet')}
        </h2>
      </div>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email Address" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Create</button>
      <div className="social-signup">
        <span>Sign In using</span>
        <div className="icons">
          <img src="/google.svg" alt="Google" />
          <img src="/github.svg" alt="GitHub" />
        </div>
      </div>
      <div className="links">
        <a href="#">Help</a> | <a href="#">Privacy</a> | <a href="#">Terms</a>
      </div>
    </form>
  );
}

export default Signup;
