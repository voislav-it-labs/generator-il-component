module.exports = function (grunt) {
	'use strict';

	var config = grunt.config.get('config');
	var configEnv = config.assets + '/sass/settings/_env.scss';

	grunt.config.merge({
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'<%= config.temp %>/assets/sass/main.css': '<%= config.temp %>/assets/sass/main.scss'
				}
			}
		}
	});

	grunt.registerTask('sass:dev', function () {
		grunt.file.write(configEnv, '$env: \'dev\';');
	});
	grunt.registerTask('sass:deploy', function () {
		grunt.file.write(configEnv, '$env: \'deploy\';');
	});

};
