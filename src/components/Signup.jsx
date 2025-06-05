import React, { useState, useContext } from 'react';
import './Form.css';
import splitText from './splitText';
import { UserContext } from '../context/UserContext';

function Signup({ onSignupSuccess }) {
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...formData });

    // Only trigger parent to handle popup and redirect logic
    onSignupSuccess();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="logo-heading">
        <img src="/logo.svg" className="logo" alt="logo" />
        <h2>{splitText('BEYONDmeet')}</h2>
      </div>

      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
      <input type="password" placeholder="Password" required />

      <button type="submit">Sign Up</button>

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
