import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getMovieById, updateMovie, deleteMovie } from '../../api';
import { Button, Paper, TextField, Typography } from '@material-ui/core';


const Movie = (props) => {
	useEffect(() => {
		getMovieById(id)
			.then(res => {
				setMovie(res.data);
			})
	}, [])
	const [movie, setMovie] = useState({});
	const history = useHistory();
	const { id } = props.match.params;

	const update = (id, movie) => {
		updateMovie(id, movie);
		history.push('/');
	}
	const remove = (id) => {
		deleteMovie(id);
		history.push('/');
	}
	return (
		<Paper>
			<Typography>Movie #{id}</Typography>
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
					onClick={() => update(id, movie)}
				>
					Update
				</Button>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => remove(id)}
				>
					Delete
				</Button>
			</Typography>
		</Paper>
	)
}

export default Movie;