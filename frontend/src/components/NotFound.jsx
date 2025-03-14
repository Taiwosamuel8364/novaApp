import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import './NotFound.css';

const NotFound = () => {
  const [message, setMessage] = useState("The page you are looking for doesn't exist or has been moved.");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkResource = async () => {
      // If it's an API route, try to fetch it
      if (location.pathname.startsWith('/api/')) {
        try {
          await axios.get(location.pathname);
        } catch (err) {
          if (err.response?.status === 404) {
            setMessage(err.response.data?.message || 'Resource not found');
          } else if (err.response?.status === 401) {
            navigate('/login');
          }
        }
      }
    };

    checkResource();
  }, [location, navigate]);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>{message}</p>
        <div className="not-found-buttons">
          <Link to="/" className="home-button">
            <FaHome />
            <span>Back to Home</span>
          </Link>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
