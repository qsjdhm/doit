
// 新增文章路由
module.exports = {
    path: 'addArticle',
    sort: 'Article',
    name: '新增笔记',
    bpath: '#/addArticle',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../../containers/article/AddArticlePage').default)
        })
    }
};
