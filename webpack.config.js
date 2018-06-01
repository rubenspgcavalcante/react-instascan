HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV;
const isProd = mode === 'production';

module.exports = {
  mode,
  node: {
    fs: "empty"
  },
  devtool: isProd ? "source-map" : "eval-source-map",
  entry: {
    main: isProd ? './src/index.js' : './sample/index.jsx'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: "[name].js",
    library: "react-instascan",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    !isProd ? new HtmlWebpackPlugin({
      title: "React Instascan Sample",
      inject: false,
      appMountId: 'app',
      template: require('html-webpack-template')
    }) : null
  ].filter(notNull => notNull)
};