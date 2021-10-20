import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";


import './index.css';

import reportWebVitals from './reportWebVitals';
import Movie from './components/movie/Movie';
import CreateMovie from './components/movie/CreateMovie';
import MoviesTable from './components/table/Table';
import Statistic from './components/statistic/Statistic';
import Auth from './components/auth/auth/Auth';
import Users from './components/users/Users';
import Header from './Header';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
			<Header />
      <div className='app'>
					<Switch>
						<Route path='/' exact component={() => <Redirect to='/movies' />} />
						<Route exact path='/movies'>
							<MoviesTable/>
						</Route>
						<Route path='/movies/create' component={CreateMovie} />
						<Route path='/movies/statistic' component={Statistic} />
						<Route path='/movies/:id/' component={Movie} />
						<Route exact path='/auth' component={Auth} />
						<Route exact path='/users' component={Users} />
					</Switch>
      </div>
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
