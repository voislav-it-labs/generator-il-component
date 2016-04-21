var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/app.ts',
    vendor: [
      'angular',
      'angular-ui-router',
      'angular-cookies',
      'lodash',
      'angular-animate',
      'ngstorage',
      'angular-permission',
      'satellizer',
      'restangular',
      'angular-bootstrap',
      'debug',
      'angular-loading-bar',
      'AngularJS-Toaster',
      'angular-mocks'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    fallback: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, './bower_components')],
    alias: {
      angular: path.resolve(__dirname, 'bower_components/angular/index.js')
    }
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /angular\.js$/, loader: "exports?angular" },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'app')],
        loader: 'ngtemplate?module=myApp&relativeTo=' + (path.resolve(__dirname, './gi.core/app')) + '/!html'
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'gi.core')],
        loader: 'ngtemplate?module=gi&relativeTo=' + (path.resolve(__dirname, './gi.core/app')) + '/!html'
      }
    ]
  },

  devtool: 'source-map',

  plugins: [
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
  ]
};
