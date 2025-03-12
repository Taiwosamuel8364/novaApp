import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForms.css';
import ErrorMessage from './ErrorMessage';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fieldOfInterest: ''
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('/api/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Navigate to dashboard after signup
    } catch (err) {
      setError(err.response?.data || { message: 'Signup failed' });
      // Highlight field with error if specified
      if (err.response?.data?.field) {
        const input = document.querySelector(`[name="${err.response.data.field}"]`);
        if (input) input.focus();
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <ErrorMessage error={error} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Field of Interest</label>
            <select
              name="fieldOfInterest"
              value={formData.fieldOfInterest}
              onChange={handleChange}
              required
            >
              <option value="">Select a field</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/api/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
