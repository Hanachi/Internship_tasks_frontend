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
import Movie from './components/movie/Movie';
import CreateMovie from './components/movie/CreateMovie';
import MoviesTable from './components/table/Table';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'>
          <App/>
          <MoviesTable/>
        </Route>
        <Route path='/movies/:id' exact component={Movie} />
        <Route path='/movie/create' exact component={CreateMovie} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
