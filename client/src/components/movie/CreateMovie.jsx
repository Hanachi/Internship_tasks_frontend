import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { createMovie } from '../../api';
import { Button, Paper, TextField, Typography } from '@material-ui/core';


const CreateMovie = () => {
	const [movie, setMovie] = useState({});
	const history = useHistory();

	const create = (movie) => {
		createMovie(movie);
		history.push('/');
	}
	return (
		<Paper>
			<Typography>Create a movie</Typography>
			<TextField
				value={movie.title || ''}
				label='Title'
				variant='outlined'
				onChange={(event) => setMovie({ ...movie, title: event.target.value })}
			/>
			<TextField
				value={movie.year || ''}
				label='Year'
				variant='outlined'
				onChange={(event) => setMovie({ ...movie, year: event.target.value })}
			/>
			<TextField
				value={movie.cast || ''}
				label='Cast'
				variant='outlined'
				onChange={(event) => setMovie({ ...movie, cast: event.target.value })}
			/>
			<TextField
				value={movie.genres || ''}
				label='Genres'
				variant='outlined'
				placeholder='genres'
				onChange={(event) => setMovie({ ...movie, genres: event.target.value })}
			/>
			<Typography>
				<Button
					variant='contained'
					color='primary'
					onClick={() => create(movie)}
				>
					Create
				</Button>
			</Typography>
		</Paper>
	)
}

export default CreateMovie;