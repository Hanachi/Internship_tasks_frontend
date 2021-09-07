import React from 'react';

import { Button } from '@material-ui/core';

import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Movies</h2>
        <Link to='/movie/create' style={{ textDecoration: 'none' }}>
          <Button
            className='create-btn'
            variant='contained'
            color='primary'
          >
            Create movie
          </Button>
        </Link>
      </header>
    </div>
  );
}

export default App;
