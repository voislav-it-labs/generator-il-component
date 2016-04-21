module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		watch: {
			styles: {
				files: ['app/**/**/*.scss', 'app/**/**/*.css', '!app/css/**/*.css', 'config.json'],
				tasks: ['styles']
			},
			html: {
				files: ['app/**/*.html'],
				tasks: ['scripts']
			},
			images: {
				files: ['app/assets/**/*.{png,jpg,gif}'],
				tasks: ['images']
			},
			livereload: {
				options: {
					livereload: 6543
				},
				files: [
					'<%= config.app %>/**/*.ts',
          '<%= config.dist %>/**/*.css',
					'<%= config.temp %>/**/*.css',
					'<%= config.app %>/**/*.html',
				]
			},
			config: {
				files: ['config.json'],
				tasks: ['ngconstant:debug']
			}
		}
	});
};
