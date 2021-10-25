import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getMovieById, updateMovie, deleteMovie } from '../../api';
import Form from '../shared/Form';
import MoviePage from './MoviePage';

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
					usersRating: res.data.usersRating.users_rating,
					posterUrl: res.data.posterUrl,
					videoUrl: res.data.videoUrl,
					storyline: res.data.storyline
				}));
			})
	}, [])

	const [movie, setMovie] = useState({});
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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
		<>
			<Form
				id={id}
				movie={movie}
				setMovie={setMovie}
				update={update}
				remove={remove}
			/>
			<MoviePage 
				id={id}
				movie={movie}
				user={user}
			/>
		</>
	)
}

export default Movie;