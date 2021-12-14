import { AppState } from 'store';
import { Currencies } from 'common/interfaces';

export const selectAccountBalanceByCurrency = (currency: Currencies) => (state: AppState) =>
    state.balances.accounts[currency];
