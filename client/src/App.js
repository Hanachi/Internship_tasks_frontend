import React from 'react';
import { Link } from 'react-router-dom';

import Profile from './components/profile/Profile';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header data-testid="header" className="App-header">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1>Movies</h1>
        </Link>
        <Profile />
      </header>
    </div>
  );
}

export default App;
