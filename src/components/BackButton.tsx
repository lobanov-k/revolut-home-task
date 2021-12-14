import React from 'react';
import styled from 'styled-components';
import ArrowIcon from 'components/ArrowIcon';

type OnClick = () => void;

const BackButtonStyled = styled.button`
    border: none;
    box-shadow: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
`;

const BackArrowImg = styled(ArrowIcon)`
    width: 20px;
`;

const BackButton: React.FC<{onClick: OnClick}> = ({ onClick }) => {
    return (
        <BackButtonStyled onClick={onClick} data-testid="back-button">
            <BackArrowImg />
        </BackButtonStyled>
    );
};

export default BackButton;
