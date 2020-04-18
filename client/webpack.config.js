const AntdScssThemePlugin = require("antd-scss-theme-plugin");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          // Loads in reverse: sass > css > style
          //   AntdScssThemePlugin.themify('sass-loader')
          { loader: "sass-loader" },
        ],
      },
      // Less for antdesign
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          //    AntdScssThemePlugin.themify('less-loader') // Plugin for theming ant
          { loader: "less-loader",
            options: {
              javascriptEnabled: true
            }  
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
    // new AntdScssThemePlugin(path.join(__dirname, "src", "ant-overrides.scss")),
  ],
};
