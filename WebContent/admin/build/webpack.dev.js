var path = require('path');
var webpack = require('webpack');
var webpackBase = require('./webpack.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 基本配置
var devConfig = Object.assign(webpackBase, {
    devtool: 'cheap-module-eval-source-map',
    devServer: true,
    hotComponents: true,
    entry: {
        index: [
            'webpack-dev-server/client?http://127.0.0.1:3001',//入口路径
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, '../src/index.jsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://127.0.0.1:3001/dist/',//热加载地址
        hash: true,
        filename: 'index.js'
    }
});

// 插件配置
devConfig.plugins = (webpackBase.plugins || []).concat(
    // 热替换
    new webpack.HotModuleReplacementPlugin(),
    // html模板
    new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, '../src/i/favicon.ico'), //favicon路径
        filename: '../index.html',    //生成的html存放路径，相对于 path
        template: path.resolve(__dirname, '../src/template/dev_index.html'),    //html模板路径
        inject: 'body',    //允许插件修改哪些内容，包括head与body
        hash: true, //为静态资源生成hash值
    }),
    // 配置全局变量（不同环境加载不同配置文件）
    new webpack.ProvidePlugin({
        ENV: path.resolve(__dirname, "../config/dev")
    })
);

module.exports = devConfig;