import { Epic } from 'redux-observable';
import { AnyAction } from '@reduxjs/toolkit';
import { AppState } from 'store';

export type Currencies = 'USD' | 'EUR' | 'GBP'

export enum Operation {
    Sell = "Sell",
    Buy = "Buy"
}

export enum AccountTypes {
    initial,
    secondary
}

export type EpicType = Epic<AnyAction, AnyAction, AppState>;
