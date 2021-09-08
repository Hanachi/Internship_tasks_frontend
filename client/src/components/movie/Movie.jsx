import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getMovieById, updateMovie, deleteMovie } from '../../api';
import Form from '../shared/Form';

const Movie = (props) => {
	useEffect(() => {
		getMovieById(id)
			.then(res => {
				setMovie(res.data);
				console.log(res)
			})
	}, [])
	const [movie, setMovie] = useState({});
	const history = useHistory();
	const { id } = props.match.params;

	const update = (id, movie) => {
		updateMovie(id, movie);
		history.push('/movies');
	}
	const remove = (id) => {
		deleteMovie(id);
		history.push('/movies');
	}
	return (
			<Form
				id={id}
				movie={movie}
				setMovie={setMovie}
				update={update}
				remove={remove}
			/>
	)
}

export default Movie;