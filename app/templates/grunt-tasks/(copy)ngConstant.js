module.exports = function (grunt) {
  'use strict';

  var pkg = grunt.config.get('pkg'),
  config = grunt.config.get('config');

  var ngConstantTask = {
    // Options for all targets
    options: {
      space: '  ',
      wrap: '"use strict";\n\n {%= __ngModule %}\n export let name: string = \'config\';',
      name: 'config',
    }
  };

  var env = config.ENV;

  env.forEach(function (environment) {
    ngConstantTask[environment.name] = {
      constants: {
        ENV: environment
      }
    };
    ngConstantTask[environment.name].options = {
      dest: '<%= config.app %>/config.ts'
    };
  });


  grunt.config.merge({
    ngconstant: ngConstantTask
  });
};
