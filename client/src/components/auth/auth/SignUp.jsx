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
import { ALREADY_HAVE_AN_ACCOUNT, SIGN_UP } from '../../../constants/authFormsText';
import { LOGIN_ROUTE } from '../../../constants/routes';

const initialState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUp = () => {
	const classes = useStyles();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
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

	const signUpValidation = (e, form) => {
		const switchValue = e?.target?.name;

		const isUsernameValid = FIRSTNAME_AND_LASTNAME_REGEXP.test(form.username);
		const isEmailValid = EMAIL_REGEXP.test(form.email);
		const isPasswordValid = PASSWORD_REGEXP.test(form.password);
		const isConfirmPasswordValid = PASSWORD_REGEXP.test(form.confirmPassword) && (form.password === form.confirmPassword);

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

	const handleSubmit = async (event) => {
		event.preventDefault();

    const resp = await signUp(formData, history);
    resp?.data?.error ? setSuccess(false) : setSuccess(true)
    setErrors((prevErr) => ({
      ...prevErr,
      email: resp?.data?.error || null,
      isError: '',
    }));
    setOpen(true);
    if(!resp.data.error) {
      signIn(formData, history);
    }
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		const updatedForm = {
			...formData,
			[name]: value
		}
		setFormData(updatedForm);
		setTimeout(() => signUpValidation(event, updatedForm), 400);
	}

	const switchMode = () => {
    history.push(LOGIN_ROUTE)
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
					{SIGN_UP}
				</Typography>
				<form
          className={classes.form}
          onSubmit={handleSubmit}
          onKeyPress={submitOnKeyPressed}
        >
					<Grid container spacing={2}>
            <Input
              name='username'
              error={errors?.username}
              helperText={errors?.username || null}
              value={formData.username}
              label='Username'
              handleChange={handleChange}
            />
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
            <Input
              name='confirmPassword'
              error={errors?.confirmPassword}
              helperText={errors?.confirmPassword || null}
              value={formData.confirmPassword}
              label='Repeat Password'
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
						{SIGN_UP}
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
								{ALREADY_HAVE_AN_ACCOUNT}
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

export default SignUp