module.exports = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' }
    ]
  },
  output: {
    filename: "[name].js",
    library: "react-instascan",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};