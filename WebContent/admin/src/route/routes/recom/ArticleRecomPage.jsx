
// 文章推荐量路由
module.exports = {
    path: 'articleRecom',
    sort: 'Recom',
    name: '文章推荐量',
    bpath: '#/articleRecom',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/recom/ArticleRecomPage').default)
        })
    }
};
