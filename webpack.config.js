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
    test: /\.js?/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
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
