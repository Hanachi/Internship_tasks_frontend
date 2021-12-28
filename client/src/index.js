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
import Users from './components/users/Users';
import Header from './Header';
import AdComponent from './components/ad/AdComponent';
import Login from './components/auth/auth/Login';
import SignUp from './components/auth/auth/SignUp';

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
						<Route path='/auth/login' component={Login} />
						<Route path='/auth/signup' component={SignUp} />
						<Route exact path='/users' component={Users} />
					</Switch>
			<AdComponent />
      </div>
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
