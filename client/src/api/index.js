import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchMovies = async (query) => await API.get(`/movies?` + new URLSearchParams(query));
export const getMovieById = (id) => API.get(`/movies/${id}`)
export const createMovie = (newMovie) => API.post('/movies', newMovie);
export const updateMovie = (id, updatedMovie) => API.patch(`/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);