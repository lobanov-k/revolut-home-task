import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currencies, AccountTypes } from 'common/interfaces';

interface CurrencySelectorState {
    isDisplayed: boolean,
    selectedCurrency: Currencies | null,
    accountToChange: AccountTypes,
}

export const initialState: CurrencySelectorState = {
    isDisplayed: false,
    selectedCurrency: null,
    accountToChange: AccountTypes.initial
};

const currencySelectorSlice = createSlice({
    name: 'currencySelector',
    initialState,
    reducers: {
        hideCurrencySelector(state) {
            state.isDisplayed = false;
        },
        showCurrencySelector(state, action: PayloadAction<AccountTypes>) {
            state.isDisplayed = true;
            state.accountToChange = action.payload;
        },
        setSelectedCurrency(state, action: PayloadAction<Currencies>) {
            state.selectedCurrency = action.payload;
            state.isDisplayed = false;
        },
        setAccountTypeToChange(state, action: PayloadAction<AccountTypes>) {
            state.accountToChange = action.payload;
        }
    }
});

export const {
    hideCurrencySelector,
    showCurrencySelector,
    setSelectedCurrency,
    setAccountTypeToChange
} = currencySelectorSlice.actions;

export default currencySelectorSlice.reducer;
