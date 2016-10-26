var path = require('path');
var webpack = require('webpack');
var webpackBase = require('./webpack.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 基本配置
var proConfig = Object.assign(webpackBase, {
    devtool: 'cheap-module-source-map',
    entry: {
        main: path.resolve(__dirname, '../src/index.jsx'),  // 逻辑代码
        common: ['react','antd','jquery']  // 公用类代码
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'dist/',  // js、css、icon资源引用在index.html中的引用路径
        hash: true,
        filename: 'js/[name].entry.js'
    }
});

// 插件配置
proConfig.plugins = (webpackBase.plugins || []).concat(
    // html模板
    new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, '../src/i/favicon.ico'), //favicon路径
        filename: '../index.html',    //生成的html存放路径，相对于 path
        template: path.resolve(__dirname, '../src/template/dev_index.html'),    //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        chunks: ['main', 'common'],//需要引入的chunk，不配置就会引入所有页面的资源
        minify:{    //压缩HTML文件
            removeComments:true,    //移除HTML中的注释
            collapseWhitespace:false    //删除空白符与换行符
        }
    }),
    // 压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    // 把入口文件里面的数组common打包成common.entry.js
    new webpack.optimize.CommonsChunkPlugin('common',  'js/common.entry.js'),
    // 配置全局变量（不同环境加载不同配置文件）
    new webpack.ProvidePlugin({
        ENV: path.resolve(__dirname, "../config/pro")
    })
);

module.exports = proConfig;