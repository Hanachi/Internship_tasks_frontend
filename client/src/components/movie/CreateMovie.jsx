import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { createMovie } from '../../api';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import Form from '../shared/Form';


const CreateMovie = () => {
	const [movie, setMovie] = useState({});
	const history = useHistory();

	const create = (movie) => {
		createMovie(movie);
		history.push('/');
	}
	return (
		<Form
			movie={movie}
			setMovie={setMovie}
			create={create}
		/>
	)
}

export default CreateMovie;