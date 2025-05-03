
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5008/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        
        setError('Login failed. Redirecting to signup...');
        navigate('/signup');
        return;
      }

      
      localStorage.setItem('token', data.token);
      
      setToken(data.token);
      
      navigate('/hero');
    } catch (err) {
      
      setError('Login failed due to a server error. Redirecting to signup...');
      navigate('/signup');
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>Welcome Back 👋</h2>
        <p>Shape Your Thoughts. Sign in to share and explore insightful blogs.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
          {error && <p className="error">{error}</p>}
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <div className="image-section">
        <img
          src="https://i.pinimg.com/736x/60/02/36/600236c4a0e4099c21bc9bf4cdba44b0.jpg"
          alt="Sunset"
        />
      </div>
    </div>
  );
};

export default Login;

