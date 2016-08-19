


import MainPage          from '../containers/MainPage';
import HomePage          from '../containers/HomePage';
import NotFound          from '../containers/NotFound';

import DelNotePage       from '../containers/note/DelNotePage';
import EditNotePage      from '../containers/note/EditNotePage';


let rootRoute = {
    component: 'div',
    path: '/',
    childRoutes: [
        {
            getComponent: (nextState, cb) => {
                return require.ensure([], (require) => {
                    cb(null, require('../containers/MainPage'))
                })
            },
            indexRoute: {
                getComponent: (nextState, cb) => {
                    return require.ensure([], (require) => {
                        cb(null, require('../containers/HomePage'))
                    })
                }
            },
        }

    ]
};




export default rootRoute;

