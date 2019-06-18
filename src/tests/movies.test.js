import React from 'react';
import { render, fireEvent, getByTestId, getByRole } from '@testing-library/react';
import Movies from '../components/movies'

it('renders the Movies without crashing', () => {
    const { getByText } = render(<Movies />);
    expect(getByText('Movies')).toBeInTheDocument()
});
