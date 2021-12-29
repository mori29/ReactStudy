import { render, screen } from '@testing-library/react';
import App from '@/layout';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/React Study/i);
	expect(linkElement).toBeInTheDocument();
});