module.exports = function (grunt) {
  'use strict';

  var pkg = grunt.config.get('pkg'),
  config = grunt.config.get('config');

  grunt.config.merge({
    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: ['*.js', '!vendor.js'],
          dest: '.tmp/concat/js'
        }]
      }
    }
  });
};
