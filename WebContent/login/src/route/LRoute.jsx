/**
 * Created by a1 on 2016/5/5.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Login    from '../containers/Login';
import NotFound from '../containers/NotFound';


export default class LRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Login}></Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
};











