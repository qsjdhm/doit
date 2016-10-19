/**
 * Created by will on 2015/8/14.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  contentBase: __dirname,
  hot: true,
  quiet: false,
  noInfo: false,
  stats: { colors: true }

  /*,proxy: {
    '/api/!*': {
      target: 'http://localhost:5000',
        secure: false
    }
  }*/
}).listen(3001, '127.0.0.1', function (err, result) {
        if (err) console.log(err);
        console.log('Listening at host.com:3001');
    });