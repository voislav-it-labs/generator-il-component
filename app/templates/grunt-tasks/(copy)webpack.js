module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	 config = grunt.config.get('config');
  var webpack = require('webpack');

	grunt.config.merge({
    webpack:{
			options: require('../webpack.config.js'),
			production: {
				devtool: 'source-map',

				// include uglify here
				plugins:[
					new webpack.optimize.UglifyJsPlugin()
				]
			}
		}
	});
};
