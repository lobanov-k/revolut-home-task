import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currencies } from 'common/interfaces';

interface CurrencyAccount {
    amount: number,
    currency: Currencies
}

interface BalancesState {
    accounts: {[C in Currencies]: number}
}

const initialState: BalancesState = {
    accounts: {
        'USD': 0,
        'EUR': 0,
        'GBP': 100,
    }
};

const balancesSlice = createSlice({
    name: 'balances',
    initialState,
    reducers: {
        setCurrencyAmount(state, action: PayloadAction<CurrencyAccount>) {
            state.accounts[ action.payload.currency ] = action.payload.amount;
        },
        addCurrency(state, action: PayloadAction<CurrencyAccount>) {
            state.accounts[ action.payload.currency ] += action.payload.amount;
        },
        withdrawCurrency(state, action: PayloadAction<CurrencyAccount>) {
            state.accounts[ action.payload.currency ] -= action.payload.amount;
        }
    }
});

export const {
    setCurrencyAmount,
    addCurrency,
    withdrawCurrency
} = balancesSlice.actions;

export default balancesSlice.reducer;
