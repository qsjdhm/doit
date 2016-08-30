
// 编辑用户路由
module.exports = {
    path: 'editUser',
    sort: 'User',
    name: '编辑用户',
    bpath: '#/editUser',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/user/EditUserPage').default)
        })
    }
};
