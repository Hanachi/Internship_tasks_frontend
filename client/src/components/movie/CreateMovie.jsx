import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { createMovie } from '../../api';
import Form from '../shared/Form';


const CreateMovie = () => {
	const [movie, setMovie] = useState({});
	const history = useHistory();

	const create = async (movie) => {
		const res = await createMovie(movie);
		const id = res?.data?.id;
		history.push(`/movies/${id}`);
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