module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg');

	grunt.config.merge({
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			},
			c: {
				configFile: 'karma.conf.js',
				singleRun: false
			}
		}
	});
};
