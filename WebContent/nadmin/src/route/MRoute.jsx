/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
import NotFound          from '../containers/NotFound';


export default class MRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={hashHistory}>
				<Route name="首页"           bpath="#/"                path="/"             component={MainPage}>
					<IndexRoute name="首页"  bpath="#/"                                     component={HomePage}/>
				</Route>
				<Route path="*" component={NotFound}/>
			</Router>
		);
	}
};











