import styled from 'styled-components';

const LoaderStyles = styled.div`
    height: 50px;
    width: 50px;
    border: 5px solid #0057E6;
    border-left: none;
    animation: rotating 1s linear infinite;
    margin: 50% auto 0;
    border-radius: 50%;

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

export default LoaderStyles;
