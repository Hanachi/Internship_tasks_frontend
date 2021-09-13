import React from 'react';

import { Button } from '@material-ui/core';

import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Movies</h2>
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
            className='statistic-btn'
            variant='contained'
            color='secondary'
          >
            Statistic
          </Button>
        </Link>
      </header>
    </div>
  );
}

export default App;
