import React from 'react';
import styled from 'styled-components';

import { CurrencyInfoExt } from 'common/currencies-data';

interface CurrencyItem {
    clickHandler: () => void;
}

const ItemStyles = styled.button`
    display: flex;
    margin: 7px 15px;
    border: none;
    background: transparent;
    cursor: pointer;
`;

const LogoWrapperStyles = styled.div`
    position: relative;
    height: 30px;
    width: 30px;
    overflow: hidden;
    border-radius: 50%;
`;

const LogoImgStyles = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 30px;
`;

const TextStyles = styled.div`
    margin-left: 10px;
    text-align: left;;
`;

const CodeStyles = styled.div`
    font-size: 18px;
`;

const LabelStyles = styled.div`
    color: #77797b;
    font-size: 12px;
`;

const CurrencyItem: React.FC<CurrencyInfoExt & CurrencyItem> = ({
    code,
    icon,
    name,
    clickHandler
}) => {
    return (
        <ItemStyles key={code} onClick={clickHandler}>
            <LogoWrapperStyles>
                <LogoImgStyles src={icon} alt={code}/>
            </LogoWrapperStyles>
            <TextStyles>
                <CodeStyles>
                    {code}
                </CodeStyles>
                <LabelStyles>
                    {name}
                </LabelStyles>
            </TextStyles>
        </ItemStyles>
    );
};

export default CurrencyItem;
