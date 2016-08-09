
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/index';
import MRoute from './route/MRoute';

const store = configureStore();

render(
    <Provider store={store}>
        <MRoute />
    </Provider>,
    document.getElementById('root_page')
);
