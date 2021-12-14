import {
    configureStore,
    combineReducers,
    AnyAction
} from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import balancesReducer from 'features/balances/balancesSlice';
import exchangeReducer from 'features/exchange/exchangeSlice';
import currencySelectorReducer from 'features/currency-selector/currencySelectorSlice';

import { handleCurrencySelectEpic } from 'features/currency-selector/currencySelectorEpics';
import {
    handleExchangeEpic,
    handleRatesPollingEpic
} from 'features/exchange/exchangeEpics';

export const rootReducer = combineReducers({
    balances: balancesReducer,
    exchange: exchangeReducer,
    currencySelector: currencySelectorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();

const rootEpic = combineEpics(
    handleRatesPollingEpic,
    handleCurrencySelectEpic,
    handleExchangeEpic
);

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;
