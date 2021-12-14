import React from 'react';
import styled from 'styled-components';

import ArrowIcon from 'components/ArrowIcon';

type SwapButtonProps = {
    direction: 'bottom' | 'top';
    onClick: () => void;
};

const SwapButtonWrapperStyles = styled.div`
    position: relative;
    height: 5px;
    overflow: visible;
`;

const SwapButtonStyled = styled.button`
    width: 30px;
    height: 30px;
    transform: translateX(-50%);
    left: 50%;
    border: 4px solid #f6f6f6;
    background-color: #fff;
    cursor: pointer;
    color: #205DDF;
    position: absolute;
    border-radius: 50%;
    top: -17.5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const  SwapButton: React.FC<SwapButtonProps> = ({direction, onClick}) => {
    return (
        <SwapButtonWrapperStyles>
            <SwapButtonStyled onClick={onClick}>
                <ArrowIcon direction={direction}/>
            </SwapButtonStyled>
        </SwapButtonWrapperStyles>
    );
};

export default SwapButton;
