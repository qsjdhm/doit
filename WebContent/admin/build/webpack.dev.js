var webpack = require('webpack');
var defaultSettings = require('./webpack.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.min.js');

module.exports = {
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
    },
    // 语言规范解释器，babel6开始插件化了
    babel: {
        presets: ['es2015', 'stage-0', 'react']
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: defaultSettings.getDefaultModules(),
    plugins: [
		defaultSettings.packCss,
		defaultSettings.packReact,
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            filename: './index.html',    //生成的html存放路径，相对于 path
            template: path.resolve(__dirname, '../src/template/dev_index.html'),    //html模板路径
            inject:'body',    //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
        }),
        // 配置全局变量（不同环境加载不同配置文件）
        new webpack.ProvidePlugin({
            ENV: path.resolve(__dirname, "../config/dev")
        })
    ]
};


