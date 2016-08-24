
// 删除文章路由
module.exports = {
    path: 'delBook',
    sort: 'Book',
    name: '删除图书',
    bpath: '#/delBook',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // webpack不支持es6模块，所以要加上default
            cb(null, require('../../../containers/book/DelBookPage').default)
        })
    }
};
