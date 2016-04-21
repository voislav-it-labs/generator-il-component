module.exports = function (grunt) {
	'use strict';

	var pkg = grunt.config.get('pkg');

	grunt.config.merge({
		phantomcss: {
			options: {
				screenshots: 'test/visual/screenshots/',
				results: 'results/visual/',
				viewportSize: [1280, 800],
				mismatchTolerance: 0.05,
				rootUrl: 'http://localhost:8181/' // Optional
			},
			src: [
			'test/visual/**/*.js'
			]
		}
	});
};