import { Currencies } from './interfaces';

export interface CurrencyInfo {
    sign: string;
    name: string;
    icon: string;
    code: Currencies;
}

type CurrenciesList = {
    [C in Currencies]: CurrencyInfo
};

export interface CurrencyInfoExt extends CurrencyInfo {
    code: Currencies;
}

export const currenciesList: CurrenciesList = {
    USD: {
        sign: '$',
        name: 'US Dollar',
        icon: '/images/USA.jpeg',
        code: 'USD',
    },
    GBP: {
        sign: '£',
        name: 'Pound sterling',
        icon: '/images/GB.png',
        code: 'GBP',
    },
    EUR: {
        sign: '€',
        name: 'Euro',
        icon: '/images/EU.png',
        code: 'EUR',
    },
};
