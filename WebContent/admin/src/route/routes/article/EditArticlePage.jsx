
// 编辑文章路由
module.exports = {
    path: 'editArticle',
    sort: 'Article',
    name: '编辑文章',
    bpath: '#/editArticle',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/article/EditArticlePage').default)
        })
    }
};
