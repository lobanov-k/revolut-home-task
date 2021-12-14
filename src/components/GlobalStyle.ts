import { createGlobalStyle } from 'styled-components';

import SourceSansProRegular from "../assets/fonts/SourceSansPro-Regular.ttf";
import SourceSansProLight from "../assets/fonts/SourceSansPro-Light.ttf";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: url(${SourceSansProRegular}) format('truetype');
    }
    @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 300;
        src: url(${SourceSansProLight}) format('truetype');
    }

    html, body, #root {
        height: 100%;
    }

    #root {
        background-color: #f6f6f6;
    }
`;

export default GlobalStyle;
