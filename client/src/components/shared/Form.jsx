import React from 'react';

import { Button, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const Form = ({id, movie, setMovie, create, update, remove}) => {
	const isCreate = id ? `Movie #${id}` : 'Create movie'

	return(
		<form onSubmit={() => id ? update(id, movie) : create(movie)}>
			<Grid
				container
				spacing={3}
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item xs={12}>
					<Typography>{isCreate}</Typography>
				</Grid>
				<Grid item xs={3}>
					<TextField
						value={movie.title || ''}
						label='Title'
						variant='outlined'
						onChange={(event) => setMovie({ ...movie, title: event.target.value })}
						required
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						value={movie.year || ''}
						label='Year'
						variant='outlined'
						onChange={(event) => setMovie({ ...movie, year: event.target.value })}
						required
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						value={movie.cast || ''}
						label='Cast'
						variant='outlined'
						onChange={(event) => setMovie({ ...movie, cast: event.target.value })}
						required
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						value={movie.genres || ''}
						label='Genres'
						variant='outlined'
						placeholder='genres'
						onChange={(event) => setMovie({ ...movie, genres: event.target.value })}
						required
					/>
				</Grid>
				{!id ? (
					<Grid item xs={3}>
						<Button
							type='submit'
							variant='contained'
							color='primary'
						>
							Create
						</Button>
					</Grid>
					) : (
					<>
						<Grid item xs={3}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
							>
								Update
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								type='submit'
								variant='contained'
								color='secondary'
								onClick={() => remove(id)}
							>
								Delete
							</Button>
						</Grid>
					</>
				)}
			</Grid>
		</form >
	)
}

export default Form;