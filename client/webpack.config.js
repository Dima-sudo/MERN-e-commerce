const AntdScssThemePlugin = require("antd-scss-theme-plugin");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"], // Polyfill for async functionality
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle[hash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".less"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          // Loads in reverse: sass > css > style
          { loader: "sass-loader" }
        ],
      },
      // Less for antdesign
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: {
                "primary-color": "rgba(24, 144, 255, 0.85)", // primary color for all components
                "link-color": "rgba(24, 144, 255, 0.85)", // link color
                "border-radius-base": "6px", // major border radius
              }
            },
          },
        ],
      },
      //
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
};
