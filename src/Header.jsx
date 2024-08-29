  import React from 'react';
  import './Header.css';

  function Header() {
    return (
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <nav className="menu">
          <ul>
            <li>Space Service</li>
            <li>Products</li>
            <li>Careers</li>
          </ul>
        </nav>
        <div className="contact">
          <button>Contact</button>
        </div>
      </header>
    );
  }

  export default Header;
