module.exports = function (grunt) {
    'use strict';

    var config = grunt.config.get('config');

    grunt.config.merge({
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['*.html'],
                    dest: '<%= config.dist %>'
                }]
            }
        }
    });
};