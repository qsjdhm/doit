var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
		login: path.resolve(__dirname, './src/js/login.jsx'),
        common: ['react','jquery','antd']
    },
	output: {
		path: path.resolve(__dirname, './'),
        publicPath: "",
        hash: true,
		filename: 'js/[name].entry.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
                exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
                exclude: /node_modules/,
				loader: 'babel',
				query: {presets: ['es2015','react']}
			},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.scss|sass/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                // 超过limit的图片会让 url-loader处理
                loader: 'url-loader?limit=10&name=img/[hash:8].[name].[ext]'
            }

		] 
	},
    plugins: [
        new ExtractTextPlugin("css/[name].css", {allChunks: true}),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            //favicon:'./src/img/favicon.ico', //favicon路径
            filename: './login.html',    //生成的html存放路径，相对于 path
            template:'./src/template/login.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['login', 'common'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('common',  'js/common.entry.js')
    ]



};


