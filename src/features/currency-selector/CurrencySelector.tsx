import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _debounce from 'lodash.debounce';

import BackButton from 'components/BackButton';
import Header from 'components/Header';

import { currenciesList, CurrencyInfoExt } from 'common/currencies-data';

import CurrencyItem from 'components/currencies-list/CurrencyItem';
import {
    CurrencySearchInputStyles,
    CurrencyListStyles,
} from 'components/currencies-list/CurrencyListStyles';

import { setSelectedCurrency, hideCurrencySelector } from './currencySelectorSlice';

const currenciesListAsArray = Object.values(currenciesList);

const CurrencySelectorScreen = () => {
    const searchInput = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        searchInput.current?.focus();
    }, []);

    const searchHandler = _debounce((value: string) => {
        setSearchText(value.toLowerCase());
    }, 300);

    const filterCurrencyItemByText = ( currency: CurrencyInfoExt ) => {
        return currency.code.toLowerCase().includes(searchText)
            || currency.name.includes(searchText);
    };

    const listToRender = searchText ?
        currenciesListAsArray.filter(filterCurrencyItemByText) :
        currenciesListAsArray;

    return (
        <>
            <Header>
                <BackButton
                    onClick={() => dispatch(hideCurrencySelector())}
                />
                <CurrencySearchInputStyles
                    ref={searchInput}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => searchHandler(event.currentTarget.value)}
                />
            </Header>
            <CurrencyListStyles>
                {listToRender.map(currency => (
                    <CurrencyItem clickHandler={() => dispatch(setSelectedCurrency(currency.code))}
                        key={currency.code}
                        { ...currency }
                    />
                ))}
            </CurrencyListStyles>
        </>
    );
};

export default CurrencySelectorScreen;
