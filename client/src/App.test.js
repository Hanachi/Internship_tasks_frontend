import  { fireEvent, render, screen , cleanup } from  '@testing-library/react';
import '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { parseJwt } from './api';
import Auth from './components/auth/auth/Auth';
import ChatComponent from './components/chat/Chat';
import Header from './Header';


const formData = {
	email: 'maill@mail.com',
	password: 'password'
};

const returnedUser = {
	"iat": 1516239022,
	"name": "John Doe",
	"sub": "1234567890",
}
const badData = {
	email: 'sss@'
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export function login(formData) {
	return request('/users/login', formData).then(data => data);
}


export default function request(url, data) {
	return new Promise((resolve, reject) => {
		process.nextTick(() =>
			(data.email && data.password)
				? resolve({ access_token: token })
				: reject({
					error: 'Bad data',
				}),
		);
	});
}

afterEach(() => {
	cleanup()
})

test('Get user data, generate jwt token, return parsed JWT', () => {
	expect.assertions(1);
	return login(formData).then(data => expect(parseJwt(data.access_token)).toEqual(returnedUser));
});

test('App title is Movies', () => {
	render(<BrowserRouter><Header /></BrowserRouter>);
	const title = document.querySelector('h1');
	expect(title).toHaveTextContent('Movies');
})

test('Button click', () => {
	const mockCallBack = jest.fn();
	render(<button onClick={mockCallBack}>Test</button>)

	const clickIndicator = screen.getByText('Test')
	fireEvent.click(clickIndicator);
	expect(mockCallBack).toHaveBeenCalled();
})

test('Statistic button exists', () => {
	render(<BrowserRouter><Header /></BrowserRouter>);
	const statistic = screen.getByText('Statistic');
	expect(statistic).toBeInTheDocument()
})

test('Header have own class', () => {
	const { container } = render(<BrowserRouter><Header /></BrowserRouter>);
	const header = container.querySelector('header');
	expect(header).toHaveClass('App-header');
})

test('JWT parse function works', () => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
	expect(parseJwt(token)).toStrictEqual(returnedUser);
})

test('Button onClick render another auth form', () => {
	render(<BrowserRouter><Auth /></BrowserRouter>)
	const button = screen.getByText("Dont have an account? Sign Up")
	fireEvent.click(button);
	expect(button).toHaveTextContent('Already have an account? Sign In')
	
})

test('disabled', () => {
	render(<BrowserRouter><ChatComponent /></BrowserRouter>)
	const button = screen.getByRole('button')
	expect(button).toBeDisabled()
})