module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		clean: {
			build: [
				'<%= config.dist %>/**/*', 
				'<%= config.temp %>/**/*'
			]
		}
	});
};