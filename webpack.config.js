const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const mode = process.env.NODE_ENV;
const isProd = mode === "production";

module.exports = env => ({
  mode,
  node: {
    fs: "empty"
  },
  devtool: isProd ? "source-map" : "eval-source-map",
  entry: {
    main: isProd ? "./src/index.js" : "./sample/index.jsx"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ }
    ]
  },
  output: {
    filename: "[name].js",
    library: "react-instascan",
    libraryTarget: "umd"
  },
  externals: ["react", "instascan"],
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  plugins: [
    env === "analyze" && new BundleAnalyzerPlugin({ analyzerMode: "server" }),
    !isProd &&
      new HtmlWebpackPlugin({
        title: "React Instascan Sample",
        inject: false,
        appMountId: "app",
        template: require("html-webpack-template")
      })
  ].filter(notNull => notNull)
});
