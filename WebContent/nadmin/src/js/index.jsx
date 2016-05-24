/**
 * Created by a1 on 2016/5/5.
 */


import 'antd/dist/antd.css';
import '../css/page.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import MainPage     from './page/MainPage';
import IndexPage    from './page/IndexPage';
import DelNotePage  from './page/note/DelNotePage';
import EditNotePage from './page/note/EditNotePage';
import NotFoundPage from './page/NotFoundPage';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={MainPage}>
			<IndexRoute name="home" component={IndexPage}/>
			<Route name="del"  path="del"  component={DelNotePage}/>
			<Route name="edit" path="edit" component={EditNotePage}/>
		</Route>
		<Route path="*" component={NotFoundPage}/>
	</Router>
);

ReactDOM.render(routes, document.getElementById("aaa"));









