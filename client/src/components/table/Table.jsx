import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const MoviesTable = () => {

	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();
	const [movies, setMovies] = useState([]);
	const [moviesCount, setCount] = useState(movies.length);
	const [query, setQuery] = useState({
		search: '',
		page : 0,
		rowsPerPage: 5,
	});
	const { page, rowsPerPage, search } = query;
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
	useEffect(() => {
		fetchMovies(query)
		.then(res => {
			setMovies(res.data.data);
			setCount(res.data.count);
			history.push(`/movies?` + new URLSearchParams({ ...query }))
			})
	}, [page, rowsPerPage])

	const openMovie = (id) => {
		history.push(`/movies/${id}`);
	}


	const searchOnKeyPressed = (event) => {
		if (event.key === 'Enter') {
			searchData();
		}
	}
	const searchData = () => {
		if(search?.trim()) {
			fetchMovies(query)
			.then(res => {
				setMovies(res.data.data);
				setQuery({...query, page: 0 });
				setCount(res.data.count);		
				history.push(`/movies?` + new URLSearchParams({ ...query }));
			})
		} else {
			history.push('/');
		}
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
					onChange={(e) => setQuery({ ...query, search: e.target.value})}
				/>
				<Button
					variant='contained'
					color='secondary'
					onClick={searchData}
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
        {movies?.map((row) => (
					<TableRow key={row._id} className={classes.tableR} onClick={() => openMovie(row._id)}>
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
            <TableCell >{row.title}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell>{row.genres.join(',')}</TableCell>
            <TableCell>{row.actors.join(',')}</TableCell>
						<TableCell>{row.imdbRating || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </MaterialTable>
    </TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={moviesCount}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={() => {}}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
					'onClick': () => setQuery({ ...query, page: page - 1 }),
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
					'onClick': () => setQuery({ ...query, page: page + 1 }),
				}}
				onRowsPerPageChange={(e) => setQuery({ ...query, rowsPerPage: e.target.value })}
			/>
    </div>
	);
}

export default MoviesTable;
