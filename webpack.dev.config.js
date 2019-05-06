const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ["@babel/polyfill", "whatwg-fetch", "./src/public/index.js"],
  },
  output: {
    path: path.join(__dirname, 'dist/public/'),
    publicPath: "",
    filename: "js/[name].js"
  },
  target: "web",
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      filename: "index.html",
      excludeChunks: ['server'],
      favicon: "src/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "src/public/cart.html",
      filename: "cart.html",
      excludeChunks: ['server'],
      favicon: "src/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "src/public/checkout.html",
      filename: "checkout.html",
      excludeChunks: ['server'],
      favicon: "src/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "src/public/products.html",
      filename: "products.html",
      excludeChunks: ['server'],
      favicon: "src/public/favicon.ico",
    }),
    new HtmlWebpackPlugin({
      template: "src/public/single.html",
      filename: "single.html",
      excludeChunks: ['server'],
      favicon: "src/public/favicon.ico",
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/public/img/products',
        to: 'img/products/[name].[ext]',
        toType: "template",
      }
    ])
  ],
};