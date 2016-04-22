module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg');

	grunt.config.merge({
		localhosts: {
			set : {
				options: {
					rules: [{
						ip: '127.0.0.1',
						hostname: 'ui.<%= pkg.name %>.dev',
						type: 'set'
					}, {
						ip: '127.0.0.1',
						hostname: 'api.<%= pkg.name %>.dev',
						type: 'set'
					}]
				}
			},
			remove : {
				options: {
					rules: [{
						ip: '127.0.0.1',
						hostname: 'ui.<%= pkg.name %>.dev',
						type: 'remove'
					}, {
						ip: '127.0.0.1',
						hostname: 'api.<%= pkg.name %>.dev',
						type: 'remove'
					}]
				}
			}
		}
	});
};