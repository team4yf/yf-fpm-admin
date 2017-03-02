var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: { 
    app: './src/index.js', 
    vendor: [
      'react', 'react-dom', 
      'async', 'lodash', 'node-fetch',
      'pubsub-js',
    ],
    // chart: [
    //   'recharts',
    // ],
    
  } ,

  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: "/assets/",
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
    }),
  ],
}


