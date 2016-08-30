
// 编辑评论路由
module.exports = {
    path: 'editComment',
    sort: 'Comment',
    name: '编辑评论',
    bpath: '#/editComment',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/comment/EditCommentPage').default)
        })
    }
};
