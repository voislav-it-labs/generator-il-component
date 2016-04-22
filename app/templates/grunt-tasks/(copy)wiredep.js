module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		wiredep: {
			app: {
				src: ['app/index.html'],
				ignorePath: /\.\.\//,
				exclude: [
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					/jquery/
				]
			},
			test: {
				devDependencies: true,
				src: '<%= karma.unit.configFile %>',
				ignorePath: /\.\.\/\.\.\//,
				exclude: [
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
					'bower_components/bootstrap/dist/js/bootstrap.js',
					/jquery/
				],
				fileTypes: {
					js: {
						block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
						detect: {
							js: /'(.*\.js)'/gi
						},
						replace: {
							js: '\'{{filePath}}\','
						}
					}
				}
			}
		}
	});
};
