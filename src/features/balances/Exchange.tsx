import React from 'react';

import BackButton from 'components/BackButton';
import Header from 'components/Header';

export const Exchange = () => {
    return (
        <>
            <Header>
                <BackButton onClick={() => {console.log('//TODO: go back');}}/>
            </Header>
            <div></div>
        </>
    );
}
