import React, { useState, useContext } from 'react';
import './Form.css';
import splitText from './splitText';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignupSuccess }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem('token', data.token);

        // Set user in context
        setUser({
          fullName: data.fullName || 'User',
          username: data.username || data.email.split('@')[0],
          email: data.email,
          phone: data.phone || 'Not provided',
          bio: data.bio || 'Welcome to BEYONDmeet!',
        });

        // Navigate to homepage
        navigate('/homepage');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Server error. Please try again later.');
    }
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
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

      <button type="submit">Sign Up</button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

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
