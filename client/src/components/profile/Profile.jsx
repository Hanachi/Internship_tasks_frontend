import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
	Typography,
	Avatar,
	Toolbar,
	Button,
	Menu,
	MenuItem,
	Tabs,
	Tab,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './Profile.css'
import { KeyboardArrowDown } from '@material-ui/icons';

const Profile = () => {
	const history = useHistory();
	const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const [anchorEl, setAnchorEl] = useState(null);
	const openProfile = Boolean(anchorEl);
	const [open, setOpen] = useState(false);
	const getDataMessage = 'Log In to get movies data';
	const notAdminMessage = 'You need admin role to create, update, edit or delete movie';

	useEffect(() => {
		setAnchorEl(null)
	}, [])

	const logout = () => {
		localStorage.clear();
		
		history.push('/auth');
		
		setAnchorEl(null);
		setUser(null);
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAnchorEl(null);
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
		<div className='appBar' position='static' color='inherit'>
			<Toolbar className='toolbar'>
				<Tabs
					value={history.location.pathname}
					indicatorColor="secondary"
					aria-label="secondary tabs example"
				>
					<Tab component={Link} to='/movies' value="/movies" label="Movies" />
					<Tab component={Link} to='/movies/statistic' value="/movies/statistic" label="Statistic" />
					{user?.user?.role == 'admin' ? (
						<Tab component={Link} to='/users' value="/users" label="Users"  />
					)
					: null
					}
				</Tabs>
			</Toolbar>
				{user ? (
					<div className='profile'>
						<div className='profileBar'>
							<Avatar
								className='purple'
								alt={user?.user?.username}
								src={user?.user?.imageUrl}
							>
								{user?.user?.username?.charAt(0)}
							</Avatar>
							<Typography className='userName' variant='h6'>{user?.user?.username}</Typography>
							<Button
								id='basic-button'
								aria-controls='basic-menu'
								aria-haspopup='true'
								aria-expanded={openProfile ? 'true' : undefined}
								onClick={handleClick}
								endIcon={<KeyboardArrowDown className='arrowIcon' />}
							>
							</Button>
							<Menu
								id='basic-menu'
								anchorEl={anchorEl}
								open={openProfile}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<MenuItem onClick={logout}>Logout</MenuItem>
							</Menu>
						</div>
					</div>
				) : (
					<Toolbar className='profile'>
						<Link to='/auth' style={{ textDecoration: 'none' }}>
							<Button
								className='loginButton'
								variant='contained'
								color='primary'
							>
								Log In
							</Button>
						</Link>
					</Toolbar>
				)}
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