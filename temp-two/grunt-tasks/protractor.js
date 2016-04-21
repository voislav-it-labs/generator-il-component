module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg');

	grunt.config.merge({
		protractor: {
			options: {
				configFile: "test/e2e/protractor.conf.js",
				noColor: false,
				keepalive: false,
				webdriverManagerUpdate: true,
				args: {
				// Arguments passed to the command
				}
	    	},
			single: {
				options: {
					args: {} // Target-specific arguments
				}
			}
		}
	});
};