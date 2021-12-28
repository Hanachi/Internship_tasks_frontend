import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';

import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../../constants/regExps';
import { EMAIL_ERROR_TEXT, PASSWORD_ERROR_TEXT } from '../../../constants/validationErrorText';

import { GoogleLogin } from 'react-google-login';

import Icon from '../icon';
import Input from '../Input';

import { signIn, googleLogin } from '../../../api/index';

import useStyles from './styles';
import { DONT_HAVE_AN_ACCOUNT, LOGIN } from '../../../constants/authFormsText';
import { SIGNUP_ROUTE } from '../../../constants/routes';

const initialState = {
	email: '',
	password: '',
}

const Login = () => {
	const classes = useStyles();
	const history = useHistory();
	const form = useRef(null);

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		isError: '',
	});
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useState();

	const isFormValid = Object.keys(errors).every((item) => errors[item] === null);
	const snackbarMessage = success ? 'Success' : 'Form Is Not Valid';

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	}

	const signInValidation = (e, form) => {
		const switchValue = e?.target?.name;

		const isEmailValid = EMAIL_REGEXP.test(form.email);
		const isPasswordValid = PASSWORD_REGEXP.test(form.password);

		switch (switchValue) {
			case ('email'): {
				const errorText = isEmailValid ? null : EMAIL_ERROR_TEXT;
				
				setErrors((prevErr) => ({
					...prevErr,
					email: errorText
				}));
				
				if (e?.target?.name) {
					break;
				}
			}
			case ('password'): {
				const errorText = isPasswordValid ? null : PASSWORD_ERROR_TEXT;
				
				setErrors((prevErr) => ({
					...prevErr,
					password: errorText,
					confirmPassword: null,
				}));
				
				if (e?.target?.name) {
					break;
				}
			}
		}
		if (isEmailValid && isPasswordValid) {
			setErrors((prevErr) => ({ ...prevErr, isError: null }));
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const resp = await signIn(formData, history);
		resp?.data?.access_token ? setSuccess(true): setSuccess(false);

		setErrors((prevErr) => ({
			...prevErr,
			email: resp?.error?.response?.data?.message || null,
			password: resp?.error?.response?.data?.message|| null,
			isError: '',
		}));
		setOpen(true);
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		const updatedForm = {
			...formData,
			[name]: value
		}
		setFormData(updatedForm);
		setTimeout(() => signInValidation(event, updatedForm), 400);
	}

	const switchMode = () => {
		history.push(SIGNUP_ROUTE);
	}

	const submitOnKeyPressed = (event) => {
		if (event.key === 'Enter') {
			document.getElementById('submit-form').click()
		}
	}

	const googleSuccess = async (res) => {
		const token = res?.tokenId;

		try {
			googleLogin(token, history);

		} catch (error) {
			console.log(error)
		}
	}

	const googleFailure = (error) => {
		console.log(error)
		console.log('Google Sign In was unsuccessful. Try again later');
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlineIcon />
				</Avatar>
				<Typography variant='h5'>
					{LOGIN}
				</Typography>
				<form 
					className={classes.form}
					onSubmit={handleSubmit}
					onKeyPress={submitOnKeyPressed}
					value={isFormValid}
					ref={form}
				>
					<Grid container spacing={2}>
						<Input
							name='email'
							error={errors?.email}
							helperText={errors?.email || null}
							value={formData.email}
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							error={errors?.password}
							helperText={errors?.password || null}
							value={formData.password}
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
					</Grid>
					<Button
						id='submit-form'
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={!isFormValid}
					>
						{LOGIN}
					</Button>
					<GoogleLogin
						clientId='898491732530-98tnc6k2bmh0rjolu0r4ig8ug05i8jo0.apps.googleusercontent.com'
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color='primary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant='contained'
							>
								Google Log In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy='single_host_origin'
					/>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{DONT_HAVE_AN_ACCOUNT}
							</Button>
						</Grid>
					</Grid>
				</form>
				<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
					<MuiAlert
						elevation={6}
						variant="filled"
						severity={success ? 'success' : 'error'}
						onClose={handleClose}
					>
						{snackbarMessage}
					</MuiAlert>
				</Snackbar>
			</Paper>
		</Container>
	)
}

export default Login