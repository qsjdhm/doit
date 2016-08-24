
// 编辑文章路由
module.exports = {
    path: 'editNote',
    sort: 'Note',
    name: '编辑笔记',
    bpath: '#/editNote',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/note/EditNotePage').default)
        })
    }
};
