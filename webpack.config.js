module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/assets/',
    filename: 'bundle.js',
    publicPath: "/assets/"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.json$/, loader: "json-loader"}
    ]
  }
}
