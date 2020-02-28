const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'main.js',
    sourceMapFilename: 'main.js.map',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    historyApiFallback: {
      index: 'static/index.html',
    },
  },
};

module.exports = config;
