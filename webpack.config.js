const path = require('path');

module.exports = {
  entry: [
    './src/client.js'
 ],
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'main.bundle.js'
 },
 module: {
  rules: [
    {
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react']
      }
    },
    {
      test: /\.less$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "less-loader" // compiles Less to CSS
      }]
    },
    {
      test: /\.css$/,
      use: 'css-loader'
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
      use: 'file-loader?name=[name].[ext]?[hash]'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
    }
  ]
 },
 resolve: {
    extensions: ['.js', '.jsx']
  },
 devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9999
 }
}
