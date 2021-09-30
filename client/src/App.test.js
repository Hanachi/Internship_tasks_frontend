import  { fireEvent, render, screen , cleanup } from  '@testing-library/react';
import '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { getStatistic, parseJwt } from './api';

afterEach(() => {
	cleanup()
})

test('App title is Movies', () => {
	render(<BrowserRouter><App /></BrowserRouter>);
	const title = screen.getByText('Movies');
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
	render(<BrowserRouter><App /></BrowserRouter>);
	const statistic = screen.getByText('Statistic');
	expect(statistic).toBeInTheDocument()
})

test('Header have own class', () => {
	const { container } = render(<BrowserRouter><App /></BrowserRouter>);
	const header = container.querySelector('header');
	expect(header).toHaveClass('App-header')
})

test('JWT parse function works', () => {
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
	expect(parseJwt(token)).toStrictEqual({ "iat": 1516239022, "name": "John Doe", "sub": "1234567890" })
})