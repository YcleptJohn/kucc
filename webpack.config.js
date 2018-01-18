const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
 ],
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'main.bundle.js'
 },
 module: {
  loaders: [
    {
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react']
      }
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
