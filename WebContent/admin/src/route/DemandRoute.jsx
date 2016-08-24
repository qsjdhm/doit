/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory,browserHistory } from 'react-router';
import useBasename from 'history/lib/useBasename'
import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
//import NotFound          from '../containers/NotFound';

import DelNotePage       from '../containers/note/DelNotePage';
import EditNotePage      from '../containers/note/EditNotePage';




const rootRoute = {
    component: 'div',
    path: '/',
    childRoutes: [ {
        name: '首页',
        bpath: '#/',
		component: MainPage,
        indexRoute: {
            name: '首页',
            bpath: '#/',
            component:  HomePage
        },
        childRoutes: [
            require('./routes/note/DelNotePage'),
            require('./routes/note/EditNotePage'),
            require('./routes/book/DelBookPage')

        ]
    } ]
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











