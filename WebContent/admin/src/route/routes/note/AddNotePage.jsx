
// 新增笔记路由
module.exports = {
    path: 'addNote',
    sort: 'Note',
    name: '新增笔记',
    bpath: '#/addNote',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/note/AddNotePage').default)
        })
    }
};
