var webpack = require('webpack');
var defaultSettings = require('./webpack.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ueditorPath = path.resolve(__dirname, '../ueditor1.6.1');
module.exports = {
	devtool: 'cheap-module-source-map',
    entry: {
		main: path.resolve(__dirname, '../src/index.jsx'),
        common: ['react','antd','jquery']
    },
	output: {
		path: path.resolve(__dirname, '../dist'),
        publicPath: "",
        hash: true,
		filename: 'js/[name].entry.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: defaultSettings.getDefaultModules(),
    plugins: [
		defaultSettings.packCss,
		defaultSettings.packReact,
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            //favicon:'./src/img/favicon.ico', //favicon路径
            filename: './index.html',    //生成的html存放路径，相对于 path
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
        new webpack.optimize.CommonsChunkPlugin('common',  'js/common.entry.js'),
        // 配置全局变量（不同环境加载不同配置文件）
        new webpack.ProvidePlugin({
            ENV: path.resolve(__dirname, "../config/pro")
        })
    ]
};


