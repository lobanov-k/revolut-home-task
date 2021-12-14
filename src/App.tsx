import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MainContainer from 'components/MainContainer';
import Exchange from 'features/exchange/Exchange';
import { startPollingRates } from 'features/exchange/exchangeSlice';
import CurrencySelector from 'features/currency-selector/CurrencySelector';
import { selectIsDisplayed } from 'features/currency-selector/selectors';

export default function App() {
    const dispatch = useDispatch();
    const isDisplayedSelector = useSelector(selectIsDisplayed);

    useEffect(() => {
        dispatch(startPollingRates());
    }, []);

    return (
        <MainContainer>
            {
                isDisplayedSelector ?
                    (<CurrencySelector />) :
                    (<Exchange/>)
            }
        </MainContainer>
    );
}
