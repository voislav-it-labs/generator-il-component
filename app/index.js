var yeoman = require('yeoman-generator')
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var glob =  require('glob');
var fs = require('fs');
var s = require('underscore.string');
var i = require('underscore.inflection');
var helpers = require('../lib/helpers');
var validateRequiredName = helpers.validateRequiredName;

_.mixin(s.exports());
_.mixin(i);

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exceptional ' + chalk.red('it-labs component generator') + ' generator!'
    ));

    this.argument('appName', {
      type: 'string',
      required: false,
      desc: 'Name of the application'
    });
  },

  prompting: function(){
    var prompts = [{
      name: 'appName',
      message: 'Enter application name',
      validate: validateRequiredName,
      when: function(){
        return !this.appName && this.appName !== 0;
      }.bind(this)
    }];

    var done = this.async();

    this.prompt(prompts, function(answers){
      this.appName = answers.appName || this.appName;
      done();
    }.bind(this));
  },
  writing: function(){
    this.processDirectory = helpers.processDirectory.bind(this);
    this.processDirectory('.', '.');
  },
  install: function(){
    this.installDependencies();
  }
});
