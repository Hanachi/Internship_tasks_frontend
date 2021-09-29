import  { fireEvent, render, screen , cleanup, queryAllByRole } from  '@testing-library/react';
import '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Auth from './components/auth/auth/Auth';

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
	render(<BrowserRouter><App /></BrowserRouter>);
	const header = screen.getByTestId('header')
	expect(header).toHaveClass('App-header')
})