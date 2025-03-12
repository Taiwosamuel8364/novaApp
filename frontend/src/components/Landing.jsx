import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import useLandingData from '../hooks/useLandingData';
import './Landing.css';

const Landing = () => {
  const { data, loading, error } = useLandingData();

  if (loading) {
    return (
      <div className="page-container">
        <nav className="navbar">
            <div className="logo">
              <img
                src="/CareerNova2.svg"
                alt="CareerNova Logo"
                className="logo-image"
                onError={(e) => {
                  console.error('Logo failed to load');
                  e.target.src = '';
                  e.target.alt = 'MERN App';
                }}
              />
              <div className="logoText">
                <span className="career">Career</span>
                <span className="nova">Nova</span>
              </div>
            </div>
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
          </nav>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
        <div className="section-one">
          <nav className="navbar-landing">
            <div className="logo">
              <img
                src="/CareerNova2.svg"
                alt="CareerNova Logo"
                className="logo-image"
                onError={(e) => {
                  console.error('Logo failed to load');
                  e.target.src = '';
                  e.target.alt = 'MERN App';
                }}
              />
              <div className="logoText">
                <span className="career">Career</span>
                <span className="nova">Nova</span>
              </div>
            </div>
            <div className="auth-buttons">
              <Link to="/api/auth/login" className="login-btn">Login</Link>
              <Link to="/api/auth/signup" className="signup-btn">SignUp</Link>
            </div>
          </nav>
          <div className="hero-section-landing">
            <div className="content">
              <h1 className="hero-title-landing">
                {data?.title || 'DISCOVER YOUR FUTURE AND EXPOSE YOUR HIDDEN TALENTS'}
              </h1>
              <p className="hero-description-landing">
                {data?.subtitle || 'With a Personalized AI POWERED Career Guidance And Mentorship Tool'}
              </p>
              <div className="cta-buttons">
                <button className="get-started-btn-landing">Get Started Now</button>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div className="second-section">
          <div className="about-us">
            <h2 className="section-title">About Us</h2>
            <p className="section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="section-description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <h2 className="features-title">OUR FEATURES AND SERVICES</h2>
        <div className="third-section">
          <div className="features-container">
            <div className="features-grid">
              <div className="feature-card">
                <img 
                  src="/airy-man.png" 
                  alt="AI Career Guidance" 
                  className="feature-image"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                />
                <h3 className="feature-title">AI Career Guidance</h3>
                <p className="feature-description">
                  Get personalized career recommendations powered by advanced AI algorithms 
                  that analyze your skills, interests, and potential.
                </p>
                <button className="feature-button">Learn More</button>
              </div>
              <div className="feature-card">
                <img 
                  src="/energy.png" 
                  alt="Professional Mentorship" 
                  className="feature-image"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                />
                <h3 className="feature-title">Professional Mentorship</h3>
                <p className="feature-description">
                  Connect with industry experts and receive guidance from experienced 
                  professionals in your desired career path.
                </p>
                <button className="feature-button">Find Mentors</button>
              </div>
              <div className="feature-card">
                <img 
                  src="/airy-business.png" 
                  alt="Skill Assessment" 
                  className="feature-image"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                />
                <h3 className="feature-title">Skill Assessment</h3>
                <p className="feature-description">
                  Evaluate your current skills and identify areas for improvement with 
                  our comprehensive assessment tools.
                </p>
                <button className="feature-button">Start Assessment</button>
              </div>
            </div>
          </div>
        </div>
        <div className="fourth-section">
          <button className="discover-button">Discover Your Career</button>
          <p className="copyright">© 2024 CareerNova. All rights reserved.</p>
        </div>
    </div>
  );
};

export default Landing;
