
// 删除用户路由
module.exports = {
    path: 'delUser',
    sort: 'User',
    name: '删除用户',
    bpath: '#/delUser',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/user/DelUserPage').default)
        })
    }
};
