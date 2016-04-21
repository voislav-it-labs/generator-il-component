module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		useminPrepare: {
			html: '<%= config.dist %>/index.html',
			options: {
				dest: '<%= config.dist %>'
			}
		},
		usemin: {
			html: [
				'<%= config.dist %>/index.html'
			],
			css: ['<%= config.dist %>/assets/css/{,*/}*.css'],
			js: ['<%= config.dist %>/assets/js/{,*/}*.js'],
			options: {
				assetsDirs: ['<%= config.dist %>/assets'],
				patterns: {
				   /* your regexp */
				}
			}
		}
	});
};