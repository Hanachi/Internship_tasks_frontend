import React, { useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getStatistic } from "../../api";

import './styles.css';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(20),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));


const Statistic = () => {
	const classes = useStyles();
	const [statstic, setStatistic] = useState();

	useEffect(() => {
		getStatistic()
		.then(res => {
			setStatistic(res.data);
		})
	}, []);
	
	return (
		<div className={classes.root}>
			<Accordion container>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Average ratings by year</Typography>
				</AccordionSummary>
				<AccordionDetails className='root-acc-details'>
					{statstic?.avgByYear?.map((el) => (
						<div className='acc-details'>
							<Typography>
								Year: {el.movie_year}
							</Typography>
							<Typography>
								Average rating: {Number(el.rating).toFixed(2)}
							</Typography>
						</div>
					))}
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography className={classes.heading}>All movies genres</Typography>
				</AccordionSummary>
				<AccordionDetails className='root-acc-details'>
					{statstic?.genres?.map((el, index) => (
						<div className='acc-details'>
							<Typography key={index}>
								{el.genres_name}
							</Typography>
						</div>
					))}
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Average ratings by title</Typography>
				</AccordionSummary>
				<AccordionDetails className='root-acc-details'>
					{statstic?.avgByTitle?.map((el) => (
						<div className='acc-details'>
							<Typography>
								{el.movie_title}
							</Typography>
							<Typography>
								{Number(el.rating).toFixed(2)}
							</Typography>
						</div>
					))}
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default Statistic;