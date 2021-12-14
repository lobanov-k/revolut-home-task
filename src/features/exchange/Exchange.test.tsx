import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import store/*, { rootReducer }*/ from 'store';
import Exchange from './Exchange';
import Loader from 'components/Loader';

jest.mock('components/Loader', () => jest.fn());

describe('Exchange', () => {
    it('shows Loader until exchange rates get loaded', () => {
        const loaderContent = 'loaderContent';
        (Loader as unknown as jest.Mock).mockImplementation(() => <>{loaderContent}</>);

        const { getByText } = render(
            <Provider store={store}><Exchange/></Provider>
        );
        expect(getByText(loaderContent)).toBeInTheDocument();
    });

});
