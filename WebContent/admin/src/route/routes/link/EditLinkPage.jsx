
// 编辑外链路由
module.exports = {
    path: 'editLink',
    sort: 'Link',
    name: '编辑外链',
    bpath: '#/editLink',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/link/EditLinkPage').default)
        })
    }
};
