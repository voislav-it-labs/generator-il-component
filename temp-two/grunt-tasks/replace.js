module.exports = function (grunt) {
    'use strict';

    var config = grunt.config.get('config');

    grunt.config.merge({
        replace: {
            dist: {
                options: {
                  patterns: [{
                      json: config.style
                  }],
                },
                files: [{
                    src: '<%= config.app %>/assets/sass/settings/_site-settings.scss.template',
                    dest: '<%= config.temp %>/assets/sass/settings/_site-settings.scss'
                }]
            }
        }
    });
};
