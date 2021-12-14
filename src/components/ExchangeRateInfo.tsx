import React from "react";
import styled from "styled-components";

import ChartSvg from 'assets/chart-line-solid.svg';

const RateInfoStyles = styled.div`
    color: #0044C3;
    font-size: 12px;
    margin: 10px 0px;

    svg {
        height: 15px;
        transform: translateY(5px);
        margin-right: 5px;
    }
`;

const ExchangeRateInfo: React.FC = ({children}) => {
    return(
        <RateInfoStyles>
            <ChartSvg />
            {children}
        </RateInfoStyles>
    );
};

export default ExchangeRateInfo;
