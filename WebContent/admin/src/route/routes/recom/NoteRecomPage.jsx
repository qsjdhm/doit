
// 笔记推荐量路由
module.exports = {
    path: 'noteRecom',
    sort: 'Recom',
    name: '笔记推荐量',
    bpath: '#/noteRecom',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/recom/NoteRecomPage').default)
        })
    }
};
