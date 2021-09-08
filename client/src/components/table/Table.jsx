import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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

import { fetchMovies } from '../../api';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		'&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
			outline: 'none',
		},
		'&.MuiTableBody-root .MuiTableRow-root:hover': {
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
	}
});
const MoviesTable = () => {


	const classes = useStyles();
	const history = useHistory();
	const [movies, setMovies] = useState([]);
	const [rowsPerPage, setPer] = useState(5);
	const [page, setPage] = useState(0);
	const totalItems = movies.length;
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
		}
	];
	const openMovie = (id) => {
		console.log()
		history.push(`/movies/${id}`);
	}
	useEffect(() => {
		fetchMovies()
			.then(res => {
				setMovies(res.data);
			})
	}, [movies.length])

	return (
		<div>
			<div className={classes.search}>
				<TextField className={classes.searchField}/>
				<Button
					variant='contained'
					color='secondary'
				>
					Search
				</Button>
			</div>
    <TableContainer component={Paper}>
      <MaterialTable className={''} size="medium" aria-label="a dense table">
      <TableHead>
        <TableRow key={''}>
							{columns.map((column) => (
								<TableCell
									key={column.field}
								> 
									<TableSortLabel
										// active={orderBy === headCell.id}
										// direction={orderBy === headCell.id ? order : 'asc'}
										// onClick={createSortHandler(headCell.id)}
            			>
									{column.headerName}
									</TableSortLabel>
								</TableCell>
							))}
        </TableRow>
      </TableHead>
      <TableBody>
        {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
					<TableRow key={row._id} className={classes.tableR} onClick={() => openMovie(row._id)}>
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
            <TableCell >{row.title}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell>{row.genres}</TableCell>
            <TableCell>{row.actors}</TableCell>
						<TableCell>{row.imdbRating || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </MaterialTable>
    </TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={totalItems}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
					'onClick': () => setPage(page - 1),
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
					'onClick': () => setPage(page + 1),
				}}
				onRowsPerPageChange={(event) => setPer(event.target.value)}
			/>
    </div>
	);
}

export default MoviesTable;
