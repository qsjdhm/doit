
// 删除图书路由
module.exports = {
    path: 'delBook',
    sort: 'Book',
    name: '新增图书',
    bpath: '#/delBook',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/book/DelBookPage').default)
        })
    }
};
