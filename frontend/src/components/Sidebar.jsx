import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaRoute, FaCompass, FaUsers, FaSignInAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/CareerNova2.svg" alt="CareerNova" />
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-item">
          <FaHome /> <span>Home</span>
        </Link>
        <Link to="/trends" className="nav-item active">
          <FaChartLine /> <span>Trends</span>
        </Link>
        <Link to="/career-path" className="nav-item">
          <FaRoute /> <span>Career Path</span>
        </Link>
        <Link to="/explore" className="nav-item">
          <FaCompass /> <span>Explore</span>
        </Link>
        <Link to="/mentors" className="nav-item">
          <FaUsers /> <span>Mentors</span>
        </Link>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/api/auth/logout" className="login-link">
          <FaSignInAlt /> <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
