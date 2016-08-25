/**
 * Created by a1 on 2016/5/5.
 */

import React             from 'react';
import ReactDOM          from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import useBasename       from 'history/lib/useBasename'
import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
import NotFound          from '../containers/NotFound';


const rootRoute = {
    component: 'div',
    path: '/',
    childRoutes: [
        {
            name: '首页',
            bpath: '#/',
            component: MainPage,
            indexRoute: {
                name: '首页',
                bpath: '#/',
                component:  HomePage
            },
            childRoutes: [
                require('./routes/article/AddArticlePage'),
                require('./routes/article/EditArticlePage'),
                require('./routes/article/DelArticlePage'),
                require('./routes/note/AddNotePage'),
                require('./routes/note/EditNotePage'),
                require('./routes/note/DelNotePage')

            ]
        },{
            path: '*',
            component: NotFound
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











