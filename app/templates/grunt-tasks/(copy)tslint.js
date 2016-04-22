module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	 config = grunt.config.get('config');

	grunt.config.merge({
    tslint: {
			options: {
				configuration: 'tslint.json'
			},
			files: ['app/**/*.ts', '!app/config.ts']
		}
	});
};
