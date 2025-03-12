import React from 'react';
import Navbar from './Navbar';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      <Navbar />
      <h1>MERN Stack Application</h1>
    </header>
  );
};

export default Header;
