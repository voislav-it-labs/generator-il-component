module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg'),
	config = grunt.config.get('config');

	grunt.config.merge({
		postcss: {
			options: {
				map: true,
				//parser: require('postcss-scss'),
				processors: [
					require('postcss-import')({
						glob: true
					}),
					require('postcss-define-property')({
						property: ''
					}),
					//require('postcss-class-prefix')(
					//	config.prefix + '-',
					//	{ ignore: [/ng-/, /is-/] }
					//),
					//require('postcss-quantity-queries')(),
					//require('postcss-brand-colors')(),
					require('autoprefixer')({browsers: 'last 3 versions'}),
					//require('precss')(),
					//require('postcss-default-unit')({unit: 'px'})
					//require('cssnano')()
				]
			},
			dist: {
				src: ['<%= config.temp %>/assets/sass/main.css'],
				dest: '<%= config.dist %>/assets/css/main.css'
			}
		}
	});
};
