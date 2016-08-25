
// 新增图书路由
module.exports = {
    path: 'addBook',
    sort: 'Book',
    name: '新增图书',
    bpath: '#/addBook',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/book/AddBookPage').default)
        })
    }
};
