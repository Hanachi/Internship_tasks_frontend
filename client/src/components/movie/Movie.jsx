import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getMovieById, updateMovie, deleteMovie } from '../../api';
import Form from '../shared/Form';

const Movie = (props) => {
	useEffect(() => {
		getMovieById(id)
			.then(res => {
				setMovie((movie) => ({
					...movie,
					title: res.data.title,
					year: res.data.year,
					genres: res.data.genres.map(item => item.name),
					actors: res.data.actors.map(item => item.fullname),
					imdbRating: res.data.imdbRating.imdb_rating,
					contentRating: res.data.contentRating.content_rating,
					usersRating: res.data.usersRating.users_rating
				}));
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