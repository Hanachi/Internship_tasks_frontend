import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../navigation/Navigation';
import './Header.css';

const Header = () => {

  return (
    <div className='App'>
      <header data-testid='header' className='App-header'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1>Movies Library</h1>
        </Link>
        <Navigation />
      </header>
    </div>
  );
}

export default Header;
