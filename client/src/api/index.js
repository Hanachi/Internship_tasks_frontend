import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).access_token}`;
	}

	return req;
});

export const parseJwt = (token) => {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};

export const fetchMovies = async (query) => await API.get(`/movies?` + new URLSearchParams(query));
export const getMovieById = (id) => API.get(`/movies/${id}`);
export const createMovie = (newMovie) => API.post('/movies', newMovie);
export const updateMovie = (id, updatedMovie) => API.patch(`/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const getStatistic = () => API.get('/movies/statistic');
export const getUsers = () => API.get('/users');

export const signIn = async (formData, history) => {
	try {
		const res = await API.post('/users/login', formData);
		const parsedData = parseJwt(res.data.access_token);
		localStorage.setItem('profile', JSON.stringify({ ...parsedData, access_token: res.data.access_token }));
		history.push('/');
		return res;
		
	} catch (error) {
		return {error}
	}
};
export const signUp = (formData) => API.post('/users', formData);
export const googleLogin = async (token, history) => {
	try {
		const res = await API.get('users/login/google', { headers: { "Authorization": `Bearer ${token}` }});
		const parsedData = parseJwt(res.data);
		localStorage.setItem('profile', JSON.stringify({ ...parsedData, access_token: res.data}));
		history.push('/');
		return res;

	} catch (error) {
		
	}
}