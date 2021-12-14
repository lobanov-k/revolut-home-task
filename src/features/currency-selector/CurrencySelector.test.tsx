import React from 'react';
import { useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { setSelectedCurrency, hideCurrencySelector } from './currencySelectorSlice';
import CurrencySelector from './CurrencySelector';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('CurrencySelector', () => {
    const dispatchMock = jest.fn();

    it('dispatches setSelectedCurrency with selected currency in payload', () => {
        const currencyToSelect = 'USD';
        (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

        const { getByText } = render(<CurrencySelector />);
        fireEvent.click(getByText(currencyToSelect));

        expect(dispatchMock).toBeCalledWith(setSelectedCurrency(currencyToSelect));
    });

    it('dispatches hideCurrencySelector when back button is clicked', () => {
        (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

        const { getByTestId } = render(<CurrencySelector />);
        fireEvent.click(getByTestId('back-button'));

        expect(dispatchMock).toBeCalledWith(hideCurrencySelector());
    });
});
