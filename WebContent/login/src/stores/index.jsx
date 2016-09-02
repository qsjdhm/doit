import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

module.exports = function(initialState) {
    // 原来的日志中间件先给去掉了，其实applyMiddleware的参数列表里面是可以放任意多个中间件的
    let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    let store = createStoreWithMiddleware(reducers, initialState);
    return store;
};