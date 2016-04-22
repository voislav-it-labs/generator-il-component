'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var glob =  require('glob');
var fs = require('fs');
var s = require('underscore.string');
var i = require('underscore.inflection');
var helpers = require('../lib/helpers');

_.mixin(s.exports());
_.mixin(i);

module.exports = yeoman.Base.extend({
  constructor: function(){
    yeoman.Base.apply(this, arguments);

    this.argument('componentName', {
      desc: 'Component name',
      required: false
    });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exceptional ' + chalk.red('it-labs component generator') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Name of the component?',
      default: 'component',
      when: function(){
        return !this.componentName && this.componentName !== 0;
      }.bind(this)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.componentName = props.componentName ? _.camelize(_.slugify(props.componentName)) : this.componentName;

      done();
    }.bind(this));
  },

  writing: function () {
    this.componentNamePlural = _.pluralize(this.componentName);
    this.componentNameCapital = _.capitalize(this.componentName);
    this.componentNameCapitalPlural = _.upperFirst(this.componentName + 's');
    this.appName = this.determineAppname();

    this.dirname = (this.componentName.indexOf('/') >= 0) ? path.dirname(this.componentName) : this.componentName;

    this.config.save();

    this.processDirectory = helpers.processDirectory.bind(this);
    this.processDirectory('.', '.');
  }
});
