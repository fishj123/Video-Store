import React from 'react';
import { render, fireEvent, } from '@testing-library/react';
import Basket from '../components/basket';

it('renders the App without crashing', () => {
    const { getByText} = render(<Basket />);
    expect(getByText(/Basket/)).toBeInTheDocument()
});


