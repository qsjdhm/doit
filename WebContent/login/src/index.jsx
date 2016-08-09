
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route,  hashHistory } from 'react-router';
import configureStore from './stores';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Login} />
			<Route path="*" component={NotFound} />
		</Router>
	</Provider>,
	document.getElementById('root_page')
);
