import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
	Typography,
	Avatar,
	Toolbar,
	Button,
} from '@material-ui/core';

import useStyles from './styles';

const Profile = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const logout = () => {
		localStorage.clear();

		history.push('/auth');

		setUser(null);
	}

	const parseJwt = (token) => {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = parseJwt(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location])
	

	return (
		<div className={classes.appBar} position='static' color='inherit'>

			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.user?.username}
							src={user?.user?.imageUrl}
						>
							{user?.user?.username?.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>{user?.user?.username}</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</div>
	)
}

export default Profile;