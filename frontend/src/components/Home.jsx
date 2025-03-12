import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/landing');
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="home">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              DISCOVER YOUR FUTURE AND EXPOSE YOUR HIDDEN TALENTS
            </h1>
            <p className="hero-description">
              With a Personalized AI POWERED Career Guidance And Mentorship Tool
            </p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="hero-image">
            <img
              src="/Rectangle.svg"
              alt="Career Guidance Illustration"
              className="main-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
