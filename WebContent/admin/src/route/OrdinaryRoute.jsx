/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
import NotFound          from '../containers/NotFound';

import DelNotePage       from '../containers/note/DelNotePage';
import EditNotePage      from '../containers/note/EditNotePage';

export default class OrdinaryRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={hashHistory}>
				<Route name="首页"           bpath="#/"                path="/"             component={MainPage}>
					<IndexRoute name="首页"  bpath="#/"                                     component={HomePage}/>
                    <Route name="删除笔记"   sort="Note"       bpath="#/delNote"          path="delNote"       component={DelNotePage}/>
                    <Route name="编辑笔记"   sort="Note"       bpath="#/editNote"         path="editNote"       component={EditNotePage}/>
                </Route>
				<Route path="*" component={NotFound}/>
			</Router>
		);
	}
};











