module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= config.dist %>'
				}]
			}
		}
	});
};