import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
	Typography,
	Avatar,
	Toolbar,
	Button,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles';

const Profile = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const [open, setOpen] = useState();

	const getDataMessage = 'Log In to get movies data';
	const notAdminMessage = 'You need admin role to create, update, edit or delete movie'

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

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	}

	useEffect(() => {
		const token = user?.access_token;

		if (token) {
			const decodedToken = parseJwt(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}
		
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location])

	useEffect(() => {
		let isMounted = true;
		if(!user && isMounted) {
			setOpen(true)
		} else if(user?.user?.role !== 'admin') {
			setOpen(true);
		}
	}, [])
	

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
							Log Out
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'
					>
						Log In
					</Button>
				)}
			</Toolbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<MuiAlert
					elevation={6}
					variant="filled"
					severity={!user ? 'error' : 'info'}
					onClose={handleClose}
				>
					{!user ? getDataMessage : notAdminMessage}
				</MuiAlert>
			</Snackbar>
		</div>
	)
}

export default Profile;