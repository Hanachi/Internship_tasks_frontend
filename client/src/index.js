import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Table from './components/table/Table';
import Movie from './components/movie/Movie';
import CreateMovie from './components/movie/CreateMovie';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' exact component={App, Table} />
        <Route path='/movies/:id' exact component={Movie} />
        <Route path='/movie/create' exact component={CreateMovie} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
