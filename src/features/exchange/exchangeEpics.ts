import { Action } from 'redux';
import { Observable , of, timer } from 'rxjs';
import { filter, mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { StateObservable } from 'redux-observable';
import _isEqual from 'lodash.isequal';

import { getRates } from 'api';
import { AppState } from 'store';
import { Currencies, EpicType, Operation } from 'common/interfaces';

import { addCurrency, withdrawCurrency } from 'features/balances/balancesSlice';

import {
    RatesStatus,
    startPollingRates,
    setRatesAndBase,
    executeExchange,
    setError
} from './exchangeSlice';
import {
    selectInitialCurrency,
    selectOperationType,
    selectSecondaryCurrency
} from './selectors';

type RatesData = {
    rates: {[C in Currencies]: number};
    base: Currencies;
}

/**
 * Timer that checks rates each 10 seconds. 
 * Dispatches action setRatesAndBase() 
 */
export const handleRatesPollingEpic: EpicType = (
    action$: Observable<Action>,
) => {
    return action$.pipe(
        filter(startPollingRates.match),
        mergeMap(() => {
            let previousData: RatesData;
            return timer(0, 1000000).pipe(
                switchMap(async () => {
                    const { base, rates: { USD, GBP, EUR } } = await getRates();
                    const newData = {
                        base: base,
                        rates: {
                            USD: Number(USD),
                            GBP: Number(GBP),
                            EUR: Number(EUR)
                        }
                    };

                    // check if rates changed
                    if (!previousData || !_isEqual(previousData, newData)) {
                        previousData = newData;
                        return newData;
                    }
                    return false;
                }),
                map((newData) => {
                    if (newData) {
                        return setRatesAndBase({
                            ...newData
                        });
                    }
                }),
                catchError((error) => {
                    return of(setError(error.message)); 
                }),
            );
        }),
        
        // do not emit downstream Actions if there is no update of the rates
        filter(Boolean)
    );
};

/**
 * Handles exchange.
 * Withdraws currency from one account and add exchanged amount to another.
 */
export const handleExchangeEpic: EpicType = (
    action$: Observable<Action>,
    state$: StateObservable<AppState>
) => {
    return action$.pipe(
        filter(executeExchange.match),
        mergeMap((action) => {
            const { initialCurrencyAmount, secondaryCurrencyAmount } = action.payload;

            const initialCurrency = selectInitialCurrency(state$.value);
            const secondaryCurrency = selectSecondaryCurrency(state$.value);
            const operation = selectOperationType(state$.value);

            if (operation === Operation.Buy) {
                return of(
                    addCurrency({
                        currency: initialCurrency,
                        amount: initialCurrencyAmount
                    }),
                    withdrawCurrency({
                        currency: secondaryCurrency,
                        amount: secondaryCurrencyAmount
                    })
                );
            }
            return of(
                withdrawCurrency({
                    currency: initialCurrency,
                    amount: initialCurrencyAmount
                }),
                addCurrency({
                    currency: secondaryCurrency,
                    amount: secondaryCurrencyAmount
                })
            );
        })
    );
};
