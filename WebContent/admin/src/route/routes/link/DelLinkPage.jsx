
// 删除外链路由
module.exports = {
    path: 'delLink',
    sort: 'Link',
    name: '删除外链',
    bpath: '#/delLink',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/link/DelLinkPage').default)
        })
    }
};
