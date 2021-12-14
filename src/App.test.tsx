import React from 'react';
import { useDispatch } from 'react-redux';
import { render } from '@testing-library/react';

import App from './App'; 
import Exchange from './features/exchange/Exchange';
import { startPollingRates } from 'features/exchange/exchangeSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));
jest.mock('features/exchange/Exchange', () => jest.fn());
jest.mock('features/currency-selector/CurrencySelector', () => jest.fn());

describe('App', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        return dispatchMock.mockClear();
    });

    it('displays correct component depending on the state', () => {
        const exchangeContent = 'Exchange';
        (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
        (Exchange as jest.Mock).mockImplementation(() => <>{exchangeContent}</>);
        
        const { getByText } = render(<App/>);
        expect(getByText(exchangeContent)).toBeInTheDocument();
    });

    it('initiates exchange rates polling', () => {
        (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

        render(<App/>);
        expect(dispatchMock).toBeCalledWith(startPollingRates());
    });
});
