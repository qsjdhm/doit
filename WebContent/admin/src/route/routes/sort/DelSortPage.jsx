
// 删除分类路由
module.exports = {
    path: 'delSort',
    sort: 'Sort',
    name: '删除分类',
    bpath: '#/delSort',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/sort/DelSortPage').default)
        })
    }
};
