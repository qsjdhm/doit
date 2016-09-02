/**
 * Created by a1 on 2016/5/5.
 */

import React             from 'react';
import ReactDOM          from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import useBasename       from 'history/lib/useBasename'
import LoginPage         from '../containers/LoginPage';
import NotFoundPage      from '../containers/NotFoundPage';


const rootRoute = {
    component: LoginPage,
    path: '/',
    childRoutes: [
        {
            path: '*',
            component: NotFoundPage
        }
    ]
};



function withExampleBasename(history, dirname) {
    return useBasename(() => history)({ basename: `/${dirname}` })
}


export default class DemandRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={withExampleBasename(hashHistory, __dirname)} routes={rootRoute} />
		);
	}
};











