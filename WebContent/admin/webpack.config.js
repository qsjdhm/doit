var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
module.exports = {
    //entry: {
    //    page1: path.resolve(__dirname, './src/js/index.jsx'),
    //        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
    //    page2: path.resolve(__dirname, './src/js/hello.jsx')
    //},
    devtool: 'inline-source-map' ,
    devServer: true,
    hotComponents: true,
    //entry: path.resolve(__dirname, './_admin/src/js/index.jsx'),
    entry: {
        index: [
            'webpack-dev-server/client?http://127.0.0.1:3001',//入口路径
            'webpack/hot/only-dev-server',
            './src/index.jsx'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
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

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot','jsx?harmony','babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                exclude: /node_modules/
            },{
                test: /\.js$/,
                loaders: ['react-hot','babel-loader'],
                //exclude: [nodeModulesPath, ueditorPath]
                exclude: /node_modules/,
                //,query: {presets: ['es2015','react']}
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },{
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },{
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                // 超过limit的图片会让 url-loader处理
                loader: 'url-loader?limit=1&name=img/[hash:8].[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("css/[name].css", {allChunks: true}),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            filename: './index.html',    //生成的html存放路径，相对于 path
            template:'./src/template/index.html',    //html模板路径
            inject:'body',    //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
        }),
        // 压缩
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //}),
    ]

};


