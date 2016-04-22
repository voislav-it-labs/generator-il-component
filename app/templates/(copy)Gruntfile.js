/*global module:false*/
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var config = grunt.file.readJSON('config.json');
	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		config: config,
		pkg: pkg,
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
	});

	grunt.loadTasks('./grunt-tasks');

	function getEnv(env){
		if (typeof env == 'undefined') {
	    grunt.log.write('Environment is not specified. \n Setting default: "debug". \n Environments: debug \n qa \n testing \n staging \n release \n');
			env = 'debug';
	  }
		return env = env.toLowerCase();
	}

	grunt.registerTask('styles', [
		// TODO fix issue with _site-settings.scc.template not passing saaslint
		// 'lineending:dist',
    // 'sasslint',
    'copy:styles',
    'replace',
		'sass:dev',
		'sass',
		'postcss'
	]);

	grunt.registerTask('scripts', [
		'tslint',
		'copy:dist',
		//'ngtemplates',
		'webpack:production',
		'htmlmin'
	]);

	grunt.registerTask('images', [
		'imagemin'
	]);

	grunt.registerTask('serveLocal', [
		// 'tslint',
		// 'ngconstant:debug',
		// 'styles',
		// 'images',
		'connect:dev',
		'localhosts:set',
		'watch'
	]);

	grunt.registerTask('serveDist', [
		'build',
		'connect:dist'
	]);

	grunt.registerTask('serveDist', [
		'build',
		'connect:dist'
	]);

	grunt.registerTask('test:integration', [
		'connect:dev',
		'protractor:single'
	]);

	grunt.registerTask('test:unit', [
		'wiredep:test',
		'karma:unit'
	]);

	// Default task.
	grunt.registerTask('default', [
		'ngconstant:debug',
		'clean',
		'styles',
		'scripts',
		'images',
		'serveLocal'
	]);

	grunt.registerTask('build', function (env) {
		env = getEnv(env);
		grunt.task.run(
			'ngconstant:' + env,
			'clean',
			'styles',
			'scripts');
	});

	/* For parent projects */

	grunt.config.merge({
    exec: {
      setCore: {
        command: function(username, password) {
          return 'git remote add -f gi.core https://' + username + ':' + password + '@tfs.it-labs.com/tfs/ITLabs/Growth%20Instruments/_git/ui && git subtree add --prefix gi.core gi.core master --squash ' +
          ' && git remote remove gi.core && git remote add gi.core https://tfs.it-labs.com/tfs/ITLabs/Growth%20Instruments/_git/ui ' ;
        }
      },
			pullCore: {
				command: 'git subtree pull --prefix gi.core gi.core master --squash'
			},
			buildCore: {
				command: 'cd gi.core && npm install && bower install && grunt build:debug'
			}
		}
  });

	grunt.registerTask('setCore', function (username, password) {
    if(!username || !password){
      grunt.fail.fatal('specify git username and password in format: grunt setCore:username:password');
    }

		grunt.task.run('exec:setCore:' + username + ':' + password, 'exec:buildCore');
	});

	grunt.registerTask('updateCore', function (env) {
		grunt.task.run('exec:pullCore', 'exec:buildCore');
	});

  grunt.registerTask('buildCore', ['exec:buildCore']);
};
