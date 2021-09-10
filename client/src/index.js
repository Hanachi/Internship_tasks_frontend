import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";


import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Movie from './components/movie/Movie';
import CreateMovie from './components/movie/CreateMovie';
import MoviesTable from './components/table/Table';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/movies' />} />
        <Route exact path='/movies'>
          <App/>
          <MoviesTable/>
        </Route>
        <Route path='/movies/create' component={CreateMovie} />
        <Route path='/movies/:id' component={Movie} />
      </Switch>
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
