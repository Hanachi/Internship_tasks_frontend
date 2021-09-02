import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import { fetchMovies } from '../../api';

const useStyles = makeStyles({
	root: {
		'&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
			outline: 'none',
		},
	}
});

const Table = () => {

	const classes = useStyles();
	const history = useHistory();
	const [movies, setMovies] = useState([]);
	const rows = movies.map((movie) => movie);
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 150,
		},
		{
			field: 'title',
			headerName: 'Title',
			flex: 1
		},
		{
			field: 'year',
			headerName: 'Year',
			width: 110
		},
		{
			field: 'cast',
			headerName: 'Cast',
			flex: 1
		},
		{
			field: 'genres',
			headerName: 'Genres',
			flex: 1
		},
	];
	const openMovie = (id) => {
		history.push(`/movies/${id}`);
	}
	useEffect(() => {
		fetchMovies()
			.then(res => {
				setMovies(res.data);
			})
	}, [movies.length])

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				className={classes.root}
				rows={rows}
				columns={columns}
				pageSize={5}
				disableSelectionOnClick
				hideFooterSelectedRowCount
				onRowClick={(e) => openMovie(e.id)}
			/>
			

		</div>
	);
}

export default Table;
