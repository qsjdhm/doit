
// 删除文章路由
module.exports = {
    path: 'delNote',
    sort: 'Note',
    name: '删除笔记',
    bpath: '#/delNote',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // webpack不支持es6模块，所以要加上default
            cb(null, require('../../../containers/note/DelNotePage').default)
        })
    }
};
