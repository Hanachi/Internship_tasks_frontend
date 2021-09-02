import React, { useState, useEffect } from 'react';

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

	useEffect(() => {
		fetchMovies()
		.then(res => {
			setMovies(res.data);
		})
	}, [])

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				className={classes.root}
				rows={rows}
				columns={columns}
				pageSize={5}
				disableSelectionOnClick
				hideFooterSelectedRowCount
				onRowClick={() => console.log('open row page')}
			/>
		</div>
	);
}

export default Table;
