var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: { 
    app: './src/index.js', 
    react: [
      'react', 
      'react-dom', 
    ],
    chart: [
      'recharts',
    ],
    vender: [
      'async', 'lodash', 'node-fetch',
    ],
    other: [
      'pubsub-js',
    ]
  } ,

  output: {
    path: 'assets',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['react', 'chart', 'vender', 'other', 'manifest'],
    }),
  ],
}


