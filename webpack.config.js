const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const webpack = require("webpack")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(tsx|ts)$/i,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  resolve: {
    //读取没有后缀的文件时自动尝试以下文件类型
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    proxy: {
      "/proxy": {
        target: "https://anime-music-files.jijidown.com",
        changeOrigin: true,
        pathRewrite: {
          "^/proxy": "",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_BASEURL": JSON.stringify(
        process.env.REACT_APP_BASEURL
      ),
    }),
  ],
}
