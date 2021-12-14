import { of, Subject } from 'rxjs';
import { AccountTypes } from 'common/interfaces';
import { StateObservable } from 'redux-observable';

import store, { AppState } from 'store';
import { initialState } from './currencySelectorSlice';

import { handleCurrencySelectEpic } from './currencySelectorEpics';
import { setSelectedCurrency } from './currencySelectorSlice';
import { setInitialCurrency } from 'features/exchange/exchangeSlice';

jest.mock('features/exchange/exchangeSlice', () => ({
    setInitialCurrency: jest.fn(),
}));

describe('handleCurrencySelectEpic', () => {
    const state$ = new StateObservable<AppState>(
        new Subject(),
        {
            ...store.getState(),
            currencySelector: {
                ...initialState,
                accountToChange: AccountTypes.initial,
            }
        }
    );

    it('resolves for which account was set currency with CurrencySelector', (done) => {
        const action$ = handleCurrencySelectEpic(
            of(setSelectedCurrency('EUR')),
            state$,
            null
        );

        action$.subscribe(() => {
            expect(setInitialCurrency).toBeCalledWith('EUR');
            done();
        });
    });
});
