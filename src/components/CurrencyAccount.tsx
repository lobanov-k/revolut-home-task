import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Currencies } from 'common/interfaces';

const CurrencyAccountStyled = styled.div`
    background-color: #fff;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 500px;
`;

const OperationDetails = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: black;
`;

const CurrencyCodeStyles = styled.button`
    background: transparent;
    position: relative;
    border: none;
    cursor: pointer;

    :after {
        position: absolute;
        content: '^';
        transform: rotate(180deg) translateY(-50%);
        top: -50%;
        right: -10px;
    }
`;

const AmountInput = styled.input`
    border: none;

    :focus {
        outline: none;
    }
`;

const OperationStyles = styled.span`
    margin-left: auto;
`;

const BalanceDetails = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
`;

const Balance = styled.div`
    color: #77797b;
`;

const BalanceError = styled.div`
    color: #e83023;
`;

type CurrencyAccountProps = {
    currency: Currencies;
    sign: string;
    operationAmount: number;
    accountAmount: number;
    operation: '+' | '-';
    error?: string;
    codeClickHandler: () => void;
    amountChangeHandler: (amount: number) => void;
};

const CurrencyAccount: React.FC<CurrencyAccountProps> = ({
    currency,
    sign,
    operationAmount,
    accountAmount,
    operation,
    error = '',
    codeClickHandler,
    amountChangeHandler
}) => {
    const [errorState, setErrorState] = useState(error);
    const [isEndsWithDot, setIsEndsWithDot] = useState(false);

    const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        // validate only numbers
        if (!/^\d*\.?\d{0,2}$/.test(event.currentTarget.value))
            return;
        // clean leading zeros
        const cleanNumberValue = event.currentTarget.value.replace(/^0+(?!\.|$)/, '');
        // check if input ends with dot
        cleanNumberValue.endsWith('.') ?
            setIsEndsWithDot(true) :
            setIsEndsWithDot(false);

        amountChangeHandler(cleanNumberValue === '.' ? 0 : Number(cleanNumberValue));
    };

    useEffect(() => {
        // set error about exceeded balance
        if (operation === '-' && Number(operationAmount) > accountAmount) {
            setErrorState('exceeds balance');
        } else {
            setErrorState('');
        }
    }, [operation, operationAmount, accountAmount]);


    return (
        <CurrencyAccountStyled>
            <OperationDetails>
                <CurrencyCodeStyles
                    onClick={codeClickHandler}
                >
                    {currency}
                </CurrencyCodeStyles>
                <OperationStyles>
                    {Number(operationAmount) !== 0 ? operation : ''}
                </OperationStyles>
                <AmountInput
                    value={`${operationAmount}${isEndsWithDot ? '.' : ''}`}
                    onChange={onChangeHandler}
                    size={`${operationAmount}`.length}
                />
            </OperationDetails>
            <BalanceDetails>
                <Balance>
                    <span>Balance: </span>
                    {`${sign}${accountAmount}`}
                </Balance>
                {errorState && <BalanceError>{errorState}</BalanceError>}
            </BalanceDetails>
        </CurrencyAccountStyled>
    );
};

export default CurrencyAccount;
