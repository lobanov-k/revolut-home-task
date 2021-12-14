import { AppState } from 'store';

export const selectIsDisplayed = (state: AppState) => state.currencySelector.isDisplayed;
export const selectAccountTypeToChange = (state: AppState) => state.currencySelector.accountToChange;
