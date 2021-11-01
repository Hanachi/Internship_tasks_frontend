import React from 'react';
import { Link } from 'react-router-dom';
import AdComponent from './components/ad/AdComponent';

import Profile from './components/profile/Profile';
import './Header.css';

const Header = () => {

  return (
    <div className='App'>
      <AdComponent />
      <header data-testid='header' className='App-header'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1>Movies Library</h1>
        </Link>
        <Profile />
      </header>
    </div>
  );
}

export default Header;
