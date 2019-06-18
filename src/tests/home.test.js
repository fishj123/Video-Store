import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, getByTestId, getByRole } from '@testing-library/react';
import Home from '../components/home'

it('renders the Home without crashing', () => {
    const { getByText } = render(<MemoryRouter><Home /></MemoryRouter>);
    expect(getByText('How it works')).toBeInTheDocument()
});

