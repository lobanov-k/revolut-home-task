import { AppState } from 'store';
import { Currencies } from 'common/interfaces';

export const selectInitialCurrency = (state: AppState) => state.exchange.initialCurrency;
export const selectSecondaryCurrency = (state: AppState) => state.exchange.secondaryCurrency;
export const selectOperationType = (state: AppState) => state.exchange.operation;
export const selectRateByCurrency = (currency: Currencies) =>
    (state: AppState) => state.exchange.rates && state.exchange.rates[currency];
export const selectRatesStatus = (state: AppState) => state.exchange.status;
