module.exports = function (grunt) {
  'use strict';

  var config = grunt.config.get('config');

  grunt.config.merge({
    sasslint: {
      options: {
          configFile: '.sass-lint.yml',
      },
      target: [
        '<%= config.app %>/assets/sass/**/*.scss'
      ]
    }
  });
};
