import React, { useContext, useState } from 'react';
import './Form.css';
import splitText from './splitText';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);

        const meRes = await fetch('http://localhost:3000/api/user/me', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const userData = await meRes.json();

        if (meRes.ok) {
          setUser({
            fullName: userData.fullName || 'User',
            username: userData.username || userData.email.split('@')[0],
            email: userData.email,
            phone: userData.phone || 'Not provided',
            bio: userData.bio || 'Welcome to BEYONDmeet!',
          });

          navigate('/homepage');
        } else {
          setError('Failed to fetch user profile.');
        }
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="logo-heading">
        <img src="/logo.svg" className="logo" alt="logo" />
        <h2>{splitText('BEYONDmeet')}</h2>
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />

      {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}

      <button type="submit">Sign In</button>

      <div className="social-signup">
        <span>Sign in using</span>
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

export default Login;
