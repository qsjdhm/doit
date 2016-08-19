
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/index';
//import MRoute from './route/MRoute';
import NRoute from './route/NRoute';

import 'antd/dist/antd.css';
import './css/layout.less';

const store = configureStore();

render(
    <Provider store={store}>
        <NRoute />
    </Provider>,
    document.getElementById('root_page')
);
