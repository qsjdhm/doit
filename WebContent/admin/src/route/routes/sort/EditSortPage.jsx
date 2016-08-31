
// 编辑分类路由
module.exports = {
    path: 'editSort',
    sort: 'Sort',
    name: '编辑分类',
    bpath: '#/editSort',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/sort/EditSortPage').default)
        })
    }
};
