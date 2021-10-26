import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const Form = ({id, movie, setMovie, create, update, remove}) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const isAdmin = user?.user?.role == 'admin';
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return(
		<form onSubmit={() => id ? update(id, movie) : create(movie)}>
			<Grid
				container
				spacing={3}
				direction='row'
				justifyContent='center'
				alignItems='center'
			>
				<Grid item xs={4}>
					<TextField
						value={movie.title || ''}
						disabled={isAdmin ? false : true}
						label='Title'
						variant='outlined'
						onChange={(event) => setMovie({ ...movie, title: event.target.value })}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={2}>
					<TextField
						value={movie.year || ''}
						disabled={isAdmin ? false : true}
						label='Year'
						variant='outlined'
						onChange={(event) => setMovie({ ...movie, year: event.target.value })}
						required
						
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						value={movie.actors || ''}
						disabled={isAdmin ? false : true}
						label='Actors'
						variant='outlined'
						onChange={(event) => setMovie({ ...movie, actors: event.target.value.split(',')})}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={movie.genres || ''}
						disabled={isAdmin ? false : true}
						label='Genres'
						variant='outlined'
						placeholder='genres'
						onChange={(event) => setMovie({ ...movie, genres: event.target.value.split(',') })}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={movie.imdbRating || ''}
						disabled={isAdmin ? false : true}
						label='imdbRating'
						variant='outlined'
						placeholder='imdbRating'
						onChange={(event) => setMovie({ ...movie, imdbRating: event.target.value })}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={movie.contentRating || ''}
						disabled={isAdmin ? false : true}
						label='contentRating'
						variant='outlined'
						placeholder='contentRating'
						onChange={(event) => setMovie({ ...movie, contentRating: event.target.value })}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={movie.usersRating || ''}
						disabled={isAdmin ? false : true}
						label='usersRating'
						variant='outlined'
						placeholder='usersRating'
						onChange={(event) => setMovie({ ...movie, usersRating: event.target.value.split(',') })}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={movie.posterUrl || ''}
						disabled={isAdmin ? false : true}
						label='posterUrl'
						variant='outlined'
						placeholder='posterUrl'
						onChange={(event) => setMovie({ ...movie, posterUrl: event.target.value })}
						required
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						value={movie?.videoUrl || ''}
						disabled={isAdmin ? false : true}
						label='videoUrl'
						variant='outlined'
						placeholder='videoUrl'
						onChange={(event) => setMovie({ ...movie, videoUrl: event.target.value })}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						minRows={7}
						maxRows={7}
						multiline
						fullWidth
						variant='outlined'
						placeholder="Storyline"
						value={movie?.storyline}
						onChange={(event) => setMovie({ ...movie, storyline: event.target.value })}
						required
					/>
				</Grid>
				{(isAdmin && !id) ? (
					<Grid item xs={3}>
						<Button
							type='submit'
							variant='contained'
							color='primary'
						>
							Create
						</Button>
					</Grid>
					) : isAdmin ? (
					<>
						<Grid item xs={2}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
							>
								Update
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleClickOpen}
							>
								Delete
							</Button>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">{'Do you really wanna delete this movie?'}</DialogTitle>
								<DialogActions>
									<Button onClick={handleClose} color="primary">
										Cancel
									</Button>
									<Button type='submit' onClick={() => remove(id)} color="primary" autoFocus>
										Agree
									</Button>
								</DialogActions>
							</Dialog>
						</Grid>
					</>
				): null}
			</Grid>
		</form >
	)
}

export default Form;