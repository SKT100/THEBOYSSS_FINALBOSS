import React, { useContext } from 'react';
import './Form.css';
import splitText from './splitText';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';



function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ 
      ...prev,
      [e.target.name]: e.target.value 
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    setUser({
      fullName: 'Your Name',
      username: credentials.email.split('@')[0],
      email: credentials.email,
      phone: 'Not provided',
      bio: 'Tor jene ki? :)',
    });
    
    navigate('/homepage');
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
