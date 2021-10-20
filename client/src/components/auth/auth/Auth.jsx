import React, { useState, useEffect } from 'react';
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

import { FIRSTNAME_AND_LASTNAME_REGEXP, EMAIL_REGEXP, PASSWORD_REGEXP } from '../../../constants/regExps';
import { FIRSTNAME_ERROR_TEXT, EMAIL_ERROR_TEXT, PASSWORD_ERROR_TEXT } from '../../../constants/validationErrorText';

import { GoogleLogin } from 'react-google-login';

import Icon from '../icon';
import Input from '../Input';

import { signIn, signUp, googleLogin } from '../../../api/index';

import useStyles from './styles';

const initialState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Auth = () => {
	const classes = useStyles();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		isError: '',
	});
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useState();

	const snackbarMessage = success ? 'Success' : 'Form Is Not Valid';


	useEffect(() => {
		setErrors((prevErr) => ({
			...prevErr,
			username: null,
			email: null,
			password: null,
			confirmPassword: null,
			isError: '',
		}))
	}, [])

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	}

	function validateData() {
		Object.keys(formData).forEach((item) => isSignup ? signUpValidation('', item) : signInValidation('', item));
	}

	const signUpValidation = (e, value) => {
		const switchValue = value || e?.target?.name;

		const isUsernameValid = FIRSTNAME_AND_LASTNAME_REGEXP.test(formData.username);
		const isEmailValid = EMAIL_REGEXP.test(formData.email);
		const isPasswordValid = PASSWORD_REGEXP.test(formData.password);
		const isConfirmPasswordValid = PASSWORD_REGEXP.test(formData.confirmPassword) && (formData.password === formData.confirmPassword);

		switch (switchValue) {
			case ('username'): {
				const errorText = isUsernameValid ? null : FIRSTNAME_ERROR_TEXT;
				setErrors((prevErr) => ({
					...prevErr,
					username: errorText
				}));

				if (e?.target?.name) {
					break;
				}
			}
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
				}));

				if (e?.target?.name) {
					break;
				}
			}
			case ('confirmPassword'): {
				const errorText = isConfirmPasswordValid ? null : 'Passwords do not match';

				setErrors((prevErr) => ({
					...prevErr,
					confirmPassword: errorText,
				}));

				if (e?.target?.name) {
					break;
				}
			}

		}
		if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
			setErrors((prevErr) => ({ ...prevErr, isError: null }));
		}
	}

	const signInValidation = (e, value) => {
		const switchValue = value || e?.target?.name;

		const isEmailValid = EMAIL_REGEXP.test(formData.email);
		const isPasswordValid = PASSWORD_REGEXP.test(formData.password);

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

		validateData();
		const isFormValid = Object.keys(errors).every((item) => errors[item] === null);
		console.log(errors)

		if (isFormValid) {
			if (isSignup) {
				const resp = await signUp(formData, history);
				resp?.data?.error ? setSuccess(false) : setSuccess(true)
				setErrors((prevErr) => ({
					...prevErr,
					email: resp?.data?.error || null,
					isError: '',
				}));
				setOpen(true);
				signIn(formData, history);
			} else {
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
		} else {
			setSuccess(false);
		}
		setOpen(true);
	}

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		setShowPassword(false);
		setErrors((prevErr) => ({
			...prevErr,
			username: null,
			email: null,
			password: null,
			isError: '',
		}))
		setFormData(initialState);
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
					{isSignup ? 'Sign Up' : 'Log In'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} onKeyPress={submitOnKeyPressed}>
					<Grid container spacing={2}>
						{isSignup && (
							<React.Fragment>
								<Input
									name='username'
									error={errors?.username}
									helperText={errors?.username || null}
									value={formData.username}
									label='Username'
									handleChange={handleChange}
									handleValidation={signUpValidation}
								/>
							</React.Fragment>
						)}
						<Input
							name='email'
							error={errors?.email}
							helperText={errors?.email || null}
							value={formData.email}
							label='Email Address'
							handleChange={handleChange}
							handleValidation={isSignup ? signUpValidation : signInValidation}
							type='email'
						/>
						<Input
							name='password'
							error={errors?.password}
							helperText={errors?.password || null}
							value={formData.password}
							label='Password'
							handleChange={handleChange}
							handleValidation={isSignup ? signUpValidation : signInValidation}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								error={errors?.confirmPassword}
								helperText={errors?.confirmPassword || null}
								value={formData.confirmPassword}
								label='Repeat Password'
								handleChange={handleChange}
								handleValidation={signUpValidation}
								type={showPassword ? 'text' : 'password'}
								handleShowPassword={handleShowPassword}
							/>
						)}
					</Grid>
					<Button
						id='submit-form'
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Log In'}
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
								{isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
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

export default Auth