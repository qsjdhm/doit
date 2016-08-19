/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory,browserHistory } from 'react-router';
import withExampleBasename from '../../withExampleBasename';
import routes from './nroutes';

import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
import NotFound          from '../containers/NotFound';

import DelNotePage       from '../containers/note/DelNotePage';
import EditNotePage      from '../containers/note/EditNotePage';


const rootRoute = {
    component: 'div',
    //path: `${global.XSMART.host}/x-smart/ircexanalyze/dist/`,{pageMenu: MenuPage, pageContent:}
    path: '/',
    childRoutes: [ {
        component: MainPage,
        indexRoute: { component:  HomePage },
        childRoutes: [
            require('./routes/Calendar/index')
        ]
    } ]
};



if (0) {
    rootRoute.childRoutes[0].component = NotFound;
}



//function withExampleBasename(history, dirname) {
//    return useBasename(() => history)({ basename: `${dirname}` })
//}






export default class NRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <Router history={withExampleBasename(hashHistory, __dirname)} routes={rootRoute} />
		);
	}
};











