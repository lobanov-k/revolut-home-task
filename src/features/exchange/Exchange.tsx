import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Operation, AccountTypes } from 'common/interfaces';
import BackButton from 'components/BackButton';
import Header from 'components/Header';
import Title from 'components/Title';
import CurrencyAccount from 'components/CurrencyAccount';
import SwapButton from 'components/SwapButton';
import ExchangeWrapperStyles from 'components/ExchangeWrapper';
import MainButton from 'components/MainButton';
import ExchangeRateInfo from 'components/ExchangeRateInfo';
import Loader from 'components/Loader';

import { selectAccountBalanceByCurrency } from 'features/balances/selectors';
import { showCurrencySelector } from 'features/currency-selector/currencySelectorSlice';
import {
    selectInitialCurrency,
    selectSecondaryCurrency,
    selectOperationType,
    selectRateByCurrency,
    selectRatesStatus
} from './selectors';
import {
    setOperation,
    executeExchange,
    RatesStatus
} from './exchangeSlice';

import { currenciesList } from 'common/currencies-data';

const Exchange = () => {
    const dispatch = useDispatch();

    const operationType = useSelector(selectOperationType);
    const rateStatus = useSelector(selectRatesStatus);

    const initialCurrency = useSelector(selectInitialCurrency);
    const initialCurrencyAmount = useSelector(selectAccountBalanceByCurrency(initialCurrency));
    const initialCurrencyRate = useSelector(selectRateByCurrency(initialCurrency)) || 0;
    
    const secondaryCurrency = useSelector(selectSecondaryCurrency);
    const secondaryCurrencyAmount = useSelector(selectAccountBalanceByCurrency(secondaryCurrency));
    const secondaryCurrencyRate = useSelector(selectRateByCurrency(secondaryCurrency)) || 0;

    const exchangeRate = initialCurrencyRate / secondaryCurrencyRate;

    const [initialOperationAmount, setInitialOperationAmount] = useState(0);
    const [secondaryOperationAmount, setSecondaryOperationAmount] = useState(0);

    const swapClickHandler = () => {
        dispatch(setOperation(
            operationType === Operation.Sell ?
                Operation.Buy :
                Operation.Sell
        ));
    };

    const onInitialAmountChange = (value: number) => {
        setInitialOperationAmount(value);
        setSecondaryOperationAmount(Math.floor(value * 100 / exchangeRate) / 100);
    };

    const onSecondaryAmountChange = (value: number) => {
        setSecondaryOperationAmount(value);
        setInitialOperationAmount(Math.floor(value * 100 * exchangeRate) / 100);
    };

    return rateStatus === null|| rateStatus === RatesStatus.Loading ?
        (<Loader/>) :
        (<>
            <Header>
                <BackButton onClick={() => {console.log('//TODO: go back');}}/>
            </Header>
            <Title>{`${operationType} ${initialCurrency}`}</Title>
            <ExchangeRateInfo>
                {`${currenciesList[initialCurrency].sign}1 = ${currenciesList[secondaryCurrency].sign}${exchangeRate}`}
            </ExchangeRateInfo>
            <ExchangeWrapperStyles>
                <CurrencyAccount
                    currency={initialCurrency}
                    sign={currenciesList[initialCurrency].sign}
                    accountAmount={initialCurrencyAmount}
                    operationAmount={initialOperationAmount}
                    amountChangeHandler={onInitialAmountChange}
                    operation={operationType === Operation.Sell ? '-' : '+'}
                    codeClickHandler={() => dispatch(showCurrencySelector(AccountTypes.initial))}
                />
                <SwapButton
                    direction={operationType === Operation.Sell ? 'bottom' : 'top'}
                    onClick={swapClickHandler}
                />
                <CurrencyAccount
                    currency={secondaryCurrency}
                    sign={currenciesList[secondaryCurrency].sign}
                    accountAmount={secondaryCurrencyAmount}
                    operationAmount={secondaryOperationAmount}
                    amountChangeHandler={onSecondaryAmountChange}
                    operation={operationType === Operation.Sell ? '+' : '-'}
                    codeClickHandler={() => dispatch(showCurrencySelector(AccountTypes.secondary))}
                />
                <MainButton
                    onClick={() => dispatch(executeExchange(
                        {initialCurrencyAmount: initialOperationAmount, secondaryCurrencyAmount: secondaryOperationAmount}
                    ))}
                >
                    {`${operationType} ${initialCurrency} for ${secondaryCurrency}`}
                </MainButton>
            </ExchangeWrapperStyles>
        </>);
};

export default Exchange;
