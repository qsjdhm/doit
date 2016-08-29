
// 删除评论路由
module.exports = {
    path: 'delComment',
    sort: 'Comment',
    name: '删除评论',
    bpath: '#/delComment',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/comment/DelCommentPage').default)
        })
    }
};
