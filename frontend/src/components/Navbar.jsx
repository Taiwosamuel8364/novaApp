import React from 'react';

const Navbar = () => {
  return (
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
      <ul className="nav-links">
        <li><a className="nav-link" href="/">Home</a></li>
        <li><a className="nav-link" href="/welcome">Welcome</a></li>
        <li><a className="nav-link" href="#">About</a></li>
      </ul>
      <button className="create-account-btn">Create Account</button>
    </nav>
  );
};

export default Navbar;
