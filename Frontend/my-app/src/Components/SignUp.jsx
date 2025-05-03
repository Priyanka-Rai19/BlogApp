    import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5008/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
          
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-section">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">
          Join the Conversation. Sign up to share and explore insightful blogs.
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your full name"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="0987654321"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="shalini@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="**********"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="**********"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>

      <div className="signup-image-section">
        <img
          src="https://as2.ftcdn.net/v2/jpg/11/86/28/45/1000_F_1186284502_eaG9dn5zB1skwIOsFQiHEg0iWCeVICTi.jpg"
          alt="Sunset"
        />
      </div>
    </div>
  );
};

export default Signup;
