/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import LoginPage         from './page/LoginPage';
import NotFoundPage      from './page/NotFoundPage';


export default class LRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={LoginPage}></Route>
				<Route path="*" component={NotFoundPage}/>
            </Router>
        );
    }
};











