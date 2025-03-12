import React from 'react';
import Navbar from './Navbar';
import '../styles.css';

const Header = () => {
  return React.createElement('header', { className: 'header' },
    React.createElement(Navbar, null),
    React.createElement('h1', null, 'MERN Stack Application')
  );
};

export default Header;
