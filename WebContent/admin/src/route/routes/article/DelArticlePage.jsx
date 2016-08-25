
// 删除文章路由
module.exports = {
    path: 'delArticle',
    sort: 'Article',
    name: '删除文章',
    bpath: '#/delArticle',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/article/DelArticlePage').default)
        })
    }
};
