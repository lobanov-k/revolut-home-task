import React from 'react';
import styled from 'styled-components';

type OnClick = () => void;

const BackButtonStyled = styled.button`
    border: none;
    box-shadow: none;
    background-color: transparent;
    cursor: pointer;
`;

const BackArrowImg = styled.img`
    transform: rotate(180deg);
    width: 20px;
`;

const BackButton: React.FC<{onClick: OnClick}> = ({ onClick }) => {
    return (
        <BackButtonStyled onClick={onClick}>
            <BackArrowImg alt="Back" src="/images/icon-arrow.png"/>
        </BackButtonStyled>
    );
};

export default BackButton;
