const path = require('path');
const webpack  = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
mode: 'development',
entry: { app: './src/index.js' },
plugins: [
  new webpack.DefinePlugin({ // <-- key to reducing React's size
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new CompressionPlugin({  
    
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
],

output: {
  
  filename: '[name].bundle.js',
path: path.resolve(__dirname, 'public'),
publicPath: '/'},
module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        },
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
    
    },
    optimization: {
      splitChunks: {
      name: 'vendor',
      chunks: 'all',
      },
      minimize: true,
      },
    };