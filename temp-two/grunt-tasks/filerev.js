module.exports = function (grunt) {
	'use strict';

	var config = grunt.config.get('config');

	grunt.config.merge({
		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= config.dist %>/{,*/}*.js',
					'<%= config.dist %>/assets/js/{,*/}*.js',
					'<%= config.dist %>/assets/css/{,*/}*.css',
					'<%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= config.dist %>/assets/fonts/*'
				]
			}
		}
	});
};