import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Currencies, Operation } from 'common/interfaces';

export type Rates = {
    [C in Currencies]: number
}

export enum RatesStatus {
    Loading,
    Loaded,
    Error
}

interface ExchangeState {
    initialCurrency: Currencies,
    secondaryCurrency: Currencies,
    operation: Operation,
    baseCurrency: Currencies | null,
    rates: Rates | null,
    status: RatesStatus | null,
    error: string
}

const initialState: ExchangeState = {
    initialCurrency: 'GBP',
    secondaryCurrency: 'USD',
    operation: Operation.Sell,
    baseCurrency: null,
    rates: null,
    status: null,
    error: '',
};

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setInitialCurrency(state, action: PayloadAction<Currencies>) {
            state.initialCurrency = action.payload;
        },
        setSecondaryCurrency(state, action: PayloadAction<Currencies>) {
            state.secondaryCurrency = action.payload;
        },
        setOperation(state, action: PayloadAction<Operation>) {
            state.operation = action.payload;
        },
        setRatesAndBase(state, action: PayloadAction<{rates: Rates, base: Currencies}>) {
            state.rates = action.payload.rates;
            state.baseCurrency = action.payload.base;
            state.status = RatesStatus.Loaded;
        },
        setRatesStatus(state, action: PayloadAction<RatesStatus>) {
            state.status = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.status = RatesStatus.Error;
        }
    }
});

export const startPollingRates = createAction('exchange/startPollingRates');

export const executeExchange = createAction<{
    initialCurrencyAmount: number,
    secondaryCurrencyAmount: number
}>('exchange/executeExchange');

export const {
    setInitialCurrency,
    setSecondaryCurrency,
    setOperation,
    setRatesAndBase,
    setRatesStatus,
    setError
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
