import React from 'react';

import { Button } from '@material-ui/core';

import './App.css';
import { Link } from 'react-router-dom';
import Profile from './components/profile/Profile';
import { getUsers } from './api';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <h2 >Movies</h2>
        </Link>
        <div >
          <Link to='/movies/create' style={{ textDecoration: 'none' }}>
            <Button
              className='create-btn'
              variant='contained'
              color='primary'
            >
              Create movie
            </Button>
          </Link>
          <Link to='/movies/statistic' style={{ textDecoration: 'none' }}>
            <Button
              className='other-btn'
              variant='contained'
              color='secondary'
            >
              Statistic
            </Button>
          </Link>
          <Button
            className='other-btn'
            variant='contained'
            color='primary'
            onClick={getUsers}
          >
            Get users
          </Button>
        </div>
        <Profile />
      </header>
    </div>
  );
}

export default App;
