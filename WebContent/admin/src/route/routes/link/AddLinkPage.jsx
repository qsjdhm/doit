
// 新增外链路由
module.exports = {
    path: 'addLink',
    sort: 'Link',
    name: '新增外链',
    bpath: '#/addLink',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/link/AddLinkPage').default)
        })
    }
};
