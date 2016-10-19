'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
function getDefaultModules() {
  	return {
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
				loader: 'url-loader?limit=1&name=i/[name].[ext]'
			}
		]
  	};
}
module.exports = {
	getDefaultModules: getDefaultModules,
	packCss: new ExtractTextPlugin("css/[name].css", {allChunks: true}),
	// 使用压缩的react包
	packReact: new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: JSON.stringify("production")
		}
	}),
};
