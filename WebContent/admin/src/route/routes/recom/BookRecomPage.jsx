
// 图书推荐量路由
module.exports = {
    path: 'bookRecom',
    sort: 'Recom',
    name: '图书推荐量',
    bpath: '#/bookRecom',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/recom/BookRecomPage').default)
        })
    }
};
