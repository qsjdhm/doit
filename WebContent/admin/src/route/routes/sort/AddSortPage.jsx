
// 新增分类路由
module.exports = {
    path: 'addSort',
    sort: 'Sort',
    name: '新增分类',
    bpath: '#/addSort',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/sort/AddSortPage').default)
        })
    }
};
