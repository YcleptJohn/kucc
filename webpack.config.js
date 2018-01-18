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
      test: /\.js?/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }
  ]
 },
 resolve: {
    extensions: ['.js', '.jsx'] 
  },
 devServer: {
  historyApiFallback: true,
  contentBase: './'
 }
}
