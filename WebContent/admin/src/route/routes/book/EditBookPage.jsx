
// 编辑图书路由
module.exports = {
    path: 'editBook',
    sort: 'Book',
    name: '编辑图书',
    bpath: '#/editBook',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/book/EditBookPage').default)
        })
    }
};
