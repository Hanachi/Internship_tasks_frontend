import React from 'react';
import ReactDOM from 'react-dom';
import {
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
import Statistic from './components/statistic/Statistic';
import Auth from './components/auth/auth/Auth';
import ChatComponent from './components/chat/Chat';

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
        <Route path='/movies/statistic' component={Statistic} />
        <Route path='/movies/:id/' component={Movie} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/chat' component={ChatComponent} />
      </Switch>
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
