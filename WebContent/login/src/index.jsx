
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/index';
import LRoute from './route/LRoute';

const store = configureStore();

render(
    <Provider store={store}>
        <LRoute />
    </Provider>,
    document.getElementById('root_page')
);
