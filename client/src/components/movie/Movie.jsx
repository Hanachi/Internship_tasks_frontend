import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import { getMovieById, updateMovie, deleteMovie } from '../../api';
import Form from '../shared/Form';
import MoviePage from './MoviePage';

const Movie = (props) => {
	const [editMode, setEditMode] = useState(false);
	
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
	}, [editMode])

	const [movie, setMovie] = useState({});
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const history = useHistory();
	const isAdmin = user?.user?.role == 'admin';
	const icon = !editMode ? <EditIcon /> : <CloseIcon />;
	const tooltipText = !editMode ? 'Edit movie' : 'Cancel'
	const { id } = props.match.params;

	const update = (id, movie) => {
		updateMovie(id, movie);
		history.push(`/movies/${id}`);
	}
	const remove = (id) => {
		deleteMovie(id);
		history.push('/movies');
	}
	return (
		<React.Fragment>
			{isAdmin ? (
				<div className='edit-movie'>
					<Tooltip title={tooltipText}>
					<div onClick={() => setEditMode(!editMode)}>{icon}</div>
					</Tooltip>
				</div>
			) : null
			}
			{!editMode ? (
				<MoviePage 
					id={id}
					movie={movie}
					user={user}
				/>
			):(
				<Form
					id={id}
					movie={movie}
					setMovie={setMovie}
					update={update}
					remove={remove}
				/>
			)
			}
		</React.Fragment>
	)
}

export default Movie;