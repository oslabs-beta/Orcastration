const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('minnpi-css-extract-plugin');

module.exports = {
  mode: process.env.Node_ENV,
  entry: './app/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i, // /scss$/
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/public/index.html',
      filename: 'index.html',
    }),
  ],
  // plugins: [new MiniCssExtractPlugin()],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './app'),
    },
    proxy: {
      '/': {
        target: 'http://localhost:3000',
      },
    },
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.jsx', '...'],
  },
};
