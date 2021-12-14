import { Action } from 'redux';
import { Observable} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StateObservable } from 'redux-observable';

import { AppState } from 'store';
import { AccountTypes, EpicType } from 'common/interfaces';

import { setSelectedCurrency } from './currencySelectorSlice';
import { selectAccountTypeToChange } from './selectors';

import { setInitialCurrency, setSecondaryCurrency } from 'features/exchange/exchangeSlice';

/**
 * Check for which account was opened currencies' selector.
 * Dispatch action to set currency for appropriate account.
 */
export const  handleCurrencySelectEpic: EpicType = (
    action$: Observable<Action>,
    state$: StateObservable<AppState>,
) => {
    return action$.pipe(
        filter(setSelectedCurrency.match),
        map((action) => {
            const accountToChange = selectAccountTypeToChange(state$.value);
            switch (accountToChange) {
            case AccountTypes.initial:
                return setInitialCurrency(action.payload);
            case AccountTypes.secondary:
                return setSecondaryCurrency(action.payload);
            }
        })
    );
};
