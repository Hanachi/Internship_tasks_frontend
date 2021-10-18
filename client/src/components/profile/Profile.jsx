import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
	Typography,
	Avatar,
	Toolbar,
	Button,
	Menu,
	MenuItem,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './styles';
import { KeyboardArrowDown } from '@material-ui/icons';

const Profile = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = useState(false);
	const openProfile = Boolean(anchorEl)

	const getDataMessage = 'Log In to get movies data';
	const notAdminMessage = 'You need admin role to create, update, edit or delete movie'

	const logout = () => {
		localStorage.clear();

		history.push('/auth');

		setUser(null);
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAnchorEl(null)
		setOpen(false);
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
			setOpen(true);
		} else if(user?.user?.role !== 'admin') {
			setOpen(true);
		}
	}, [])
	

	return (
		<div className={classes.appBar} position='static' color='inherit'>

			<Toolbar className={classes.toolbar}>
				<Link to='/movies/statistic' style={{ textDecoration: 'none' }}>
					<Button
						className='statisticBtn'
						variant='contained'
						color='secondary'
					>
						Statistic
					</Button>
				</Link>
				{user ? (
					<div className={classes.profile}>
						<Button
							id="basic-button"
							aria-controls="basic-menu"
							aria-haspopup="true"
							aria-expanded={openProfile ? 'true' : undefined}
							onClick={handleClick}
							endIcon={<KeyboardArrowDown />}
						>
							<Avatar
								className={classes.purple}
								alt={user?.user?.username}
								src={user?.user?.imageUrl}
							>
								{user?.user?.username?.charAt(0)}
							</Avatar>
							{/* <Typography className={classes.userName} variant='h6'>{user?.user?.username}</Typography> */}
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={openProfile}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
						>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</Menu>
					</div>
				) : (
					<Button
						className={classes.loginButton}
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