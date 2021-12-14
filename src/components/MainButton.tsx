import styled from 'styled-components';
import React from 'react';

type ButtonProps = {
    onClick: () => void;
};

const MainButtonStyles = styled.button`
    border-radius: 10px;
    background-color: #0057E6;
    color: #fff;
    text-align: center;
    border: none;
    padding: 10px 0;
    cursor: pointer;
    margin-top: 40%;
`;

const MainButton: React.FC<ButtonProps> = ({
    children,
    onClick
}) => {
    return(
        <MainButtonStyles
            onClick={onClick}
        >
            {children}
        </MainButtonStyles>
    );
};

export default MainButton;
