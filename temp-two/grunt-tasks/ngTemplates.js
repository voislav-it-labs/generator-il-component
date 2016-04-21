module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config'),
	scripts = grunt.config.get('scripts');

    grunt.config.merge({
        ngtemplates: {
            dist: {
                options: {
                    module: 'gi'
                },
                cwd: '<%= config.app %>',
                src: ['components/**/*.html', 'shared/**/*.html'],
                dest: '.tmp/templateCache.js'
            }
        }
    });
};
