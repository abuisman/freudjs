var webpack = require('webpack');
var path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var libraryName = 'Freud';
var outputFile = 'freud.js';
var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'freud.min.js';
} else {
  outputFile = 'freud.js';
}

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/' + outputFile,
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
          ],
          plugins: ["add-module-exports", "transform-es2015-modules-umd"]
        }
      }
    }
    ]
  },
  plugins: plugins
}
