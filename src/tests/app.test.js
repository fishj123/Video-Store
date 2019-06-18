import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

it('renders the App without crashing', () => {
    const { getByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(getByTestId('app')).toBeInTheDocument()
});

