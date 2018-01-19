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
    }
  ]
 },
 resolve: {
    extensions: ['.js', '.jsx']
  },
 devServer: {
  contentBase: path.join(__dirname, 'dist'),
  compress: true
 }
}
