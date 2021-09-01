import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchMovies } from './api/index';

const App = () => {
  const [movies, setMovies] = useState([]);
  const { title, year, genres } = movies[0] || [];
  
  const getMovies = () => {
    fetchMovies()
    .then(res => {
      setMovies(res.data);
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Get First Movie Data</p>
        <button onClick={getMovies}>Get</button>
        <span>
          {title}
        </span>
        <span>
          {year}
        </span>
        <span>
          {genres}
        </span>
      </header>
    </div>
  );
}

export default App;
