module.exports = function (grunt) {
	'use strict';

	var config = grunt.config.get('config');
	var serveStatic = require('serve-static');
	var webpack = require('webpack');
	var webpackMiddleware = require('webpack-dev-middleware');

	grunt.config.merge({
		connect: {
			server: {
				options: {
					protocol: 'http',
					port: 8080,
					hostname: 'localhost',
					base: 'dist',
					livereload: 6543,
					open: {
						target: 'http://localhost:8080/'
					}
				}
			},
			dev: {
				options: {
					protocol: 'http',
					port: 8181,
					hostname: 'localhost',
					base: 'app',
					livereload: 6543,
					open: {
						target: 'http://localhost:8181/'
					},
					middleware : function(connect) {
						var mw = [];
						mw.push(connect().use('/bower_components', serveStatic('./bower_components')));
						mw.push(connect().use('/assets/css', serveStatic('./dist/assets/css')));
						mw.push(serveStatic('./app'));

						mw.push(webpackMiddleware(
						  webpack(require('../webpack.config.js')),
						  {
						    publicPath: '/'
						  }
						));

						return mw;
					}
				}
			},
			dist: {
				options: {
					protocol: 'http',
					port: 8282,
					hostname: 'localhost',
					base: '.',
					keepalive: true,
					open: {
						target: 'http://localhost:8282/'
					},
					middleware: function(connect){
						var mw = [];
						mw.push(serveStatic('./dist'));

						return mw;
					}
				}
			}
		}
	});
};
