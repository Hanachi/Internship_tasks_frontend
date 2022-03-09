import React from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { VIDEO_URL_REGEXP } from '../../constants/regExps';
import notFoundImage from '../../videoNotFound.jpg'
import './Movie.css';

const MoviePage = ({movie}) => {
	const validVideo = movie?.videoUrl?.match(VIDEO_URL_REGEXP);

	return (
		<div className='container'>
			<Card className='root'>
				<CardActionArea>
					<CardMedia
						component="img"
						image={movie?.posterUrl}
						className='media'
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
				<Typography component={'span'}>
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
				{validVideo ? (
					<iframe
						title="movie-trailer"
						className='iframe'
						frameBorder='0'
						scrolling='no'
						src={movie?.videoUrl}
						allowFullScreen
					>
					</iframe>
				): (
					<img className='no-content-image' src={notFoundImage} alt='notFoundImage'/>
				)}
			</div>
			</div>
		</div>
	)

}

	export default MoviePage;