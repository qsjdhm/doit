
// 新增用户路由
module.exports = {
    path: 'addUser',
    sort: 'User',
    name: '新增用户',
    bpath: '#/addUser',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/user/AddUserPage').default)
        })
    }
};
