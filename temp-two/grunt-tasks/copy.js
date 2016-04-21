module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>',
					src: [
						'*.json',
						'**/*.html',
						'assets/img/**/*'
					],
					dest: '<%= config.dist %>'
				}]
			},
			styles: {
				files: [{
					expand: true,
					cwd: '<%= config.assets %>/sass',
					src: [
						'**/*.css',
            '**/*.scss',
						'**/*.template'
					],
					dest: '<%= config.temp %>/assets/sass'
				}]
			},
			concat: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/assets',
					src: [
						'js/**/*.js'
					],
					dest: '<%= config.dist %>/assets'
				}]
			}
		}
	});
};
