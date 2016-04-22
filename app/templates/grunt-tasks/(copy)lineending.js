module.exports = function (grunt) {
  'use strict';

  var pkg = grunt.config.get('pkg'),
  config = grunt.config.get('config');

  grunt.config.merge({
    lineending: {
      dist: {
        options: {
          overwrite: true,
          eol: 'lf'
        },
        files: {
          '': ['app/assets/sass/**/*.scss']
        }
      },
      vendor: {
        options: {
          overwrite: true,
          eol: 'crlf'
        },
        files: {
          '': ['.tmp/concat/js/vendor.js']
        }
      }
    }
  });
};
