import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';

import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

import { fetchMovies } from '../../api';
import ChatComponent from '../chat/Chat';

const useStyles = makeStyles({
	tableRow: {
		'&:hover': {
			cursor: 'pointer'
		},
	},
	search: {
		display: 'flex',
		justifyContent: 'flex-end',
		margin: '20px'
	},
	searchField: {
		marginRight: '20px'
	},
	container: {
		maxHeight: '600px'
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
});

const MoviesTable = () => {
	const { search: locationSearch } = useLocation();
	const history = useHistory();
	const classes = useStyles();

	const [movies, setMovies] = useState([]);
	const [moviesCount, setCount] = useState(movies.length);
	const params = queryString.parse(locationSearch);
	const [query, setQuery] = useState({
		search: params.search || '',
		page: Number(params.page) || 0,
		rowsPerPage: Number(params.rowsPerPage) || 5,
		orderBy: params.orderBy || 'title',
		direction: params.direction || 'asc'
	});

	const { page, rowsPerPage, search, orderBy, direction } = query;
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
		},
		{
			field: 'title',
			headerName: 'Title',
		},
		{
			field: 'year',
			headerName: 'Year',
		},
		{
			field: 'genres',
			headerName: 'Genres',
		},
		{
			field: 'actors',
			headerName: 'Actors',
		},
		{
			field: 'imdbRating',
			headerName: 'imdbRating',
		},
		{
			field: 'contentRating',
			headerName: 'contentRating',
		},
	];

	useEffect(() => {
		fetchMovies({ ...query })
		.then(res => {
			setMovies(res.data.data);
			setCount(res.data.total);
			updateHistory();
		})
	}, [page, rowsPerPage, orderBy, direction, locationSearch])

	const openMovie = (id) => {
		history.push(`/movies/${id}`);
	}

	const searchOnKeyPressed = (event) => {
		if (event.key === 'Enter') {
			searchData();
		}
	}
	const searchData = () => {
		setQuery({ ...query, page: 0 });
		updateHistory();
	}

	const updateHistory = () => {
		history.push(`/movies?` + new URLSearchParams({ ...query }));
	}
	const pageClick = (page) => {
		setQuery({ ...query, page });
		updateHistory();
	}

	const changeOrder = (orderBy, direction) => {
		setQuery({ ...query, orderBy, direction });
		updateHistory();
	}
	return (
		<div>
			<div className={classes.search}>
				<TextField
					name='search'
					className={classes.searchField}
					label='Search'
					value={search}
					onKeyPress={searchOnKeyPressed}
					onChange={(e) => setQuery({ ...query, search: e.target.value })}
				/>
				<Button
					variant='contained'
					color='secondary'
					onClick={searchData}
				>
					Search
				</Button>
			</div>
			<TableContainer className={classes.container} component={Paper}>
				<MaterialTable className={''} size="medium" aria-label="a dense table">
					<TableHead>
						<TableRow key={''}>
							{columns.map((column) => (
								<TableCell
									key={column.field}
								>
									<TableSortLabel
										active={orderBy === column.field}
										direction={direction}
										onClick={() => changeOrder(column.field, direction === 'asc' ? 'desc' : 'asc')}
									>
										{column.headerName}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{movies?.map((row) => (
							<TableRow hover key={row.id} className={classes.tableRow} onClick={() => openMovie(row.id)}>
								<TableCell component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell >{row.title}</TableCell>
								<TableCell>{row.year}</TableCell>
								<TableCell>{row.genres?.map((genre) => genre.name).join(',\n')}</TableCell>
								<TableCell>{row.actors?.map((actor) => actor.fullname).join(',\n')}</TableCell>
								<TableCell>{row.imdbRating?.imdb_rating || '-'}</TableCell>
								<TableCell>{row.contentRating?.content_rating || '-'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</MaterialTable>
			</TableContainer>
			<footer className={classes.footer}>
				<ChatComponent />
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={moviesCount}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={() => { }}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
						'onClick': () => pageClick(Number(page) - 1),
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
						'onClick': () => pageClick(Number(page) + 1),
					}}
					onRowsPerPageChange={(e) => setQuery({ ...query, rowsPerPage: e.target.value })}
				/>
			</footer>
		</div>
	);
}

export default MoviesTable;
