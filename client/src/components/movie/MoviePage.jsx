import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import './Movie.css';

const MoviePage = ({movie}) => {

	return (
		<div className='container'>
			<Card className='root'>
				<CardActionArea>
					<CardMedia
						className='media'
						image={movie?.posterUrl}
					/>
					<CardContent>
						{movie?.genres?.map((genre, index) => {
							return (
								<Chip key={index} className='genre-chip' label={genre} />
							)
						})}
					</CardContent>
				</CardActionArea>
				<CardActions className='card-footer-title'>
					<Typography gutterBottom variant='h5' component='h2'>
						{movie?.title}&nbsp;({movie?.year})
					</Typography>
				</CardActions>
			</Card>
			<div className='movie-info'>
				<Typography><b>Content Rating:</b> {movie?.contentRating || '-'}</Typography>
				<Typography>
					<b>Actors:</b>
					<ul>
						{movie?.actors?.map((actor, index) => {
							return (
								<li key={index}>{actor}</li>
							)
						})}
					</ul>
				</Typography>
				<Typography><b>Storyline:</b>&nbsp;{movie?.storyline}</Typography>
			<div className='movie-trailer'>
					<iframe
						width="420"
						height="315"
						src={movie?.videoUrl}
						allowfullscreen
					>
					</iframe>
			</div>
			</div>
		</div>
	)

}

	export default MoviePage;