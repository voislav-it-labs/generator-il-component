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

_.mixin(s.exports());
_.mixin(i);

function expandFiles(pattern, options) {
  options = options || {};
  var cwd = options.cwd || process.cwd();
  return glob.sync(pattern, options).filter(function (filepath) {
    return fs.statSync(path.join(cwd, filepath)).isFile();
  });
}

function processDirectory(source, destination) {
  var self = this;

  var root = path.isAbsolute(source) ? source : path.join(self.sourceRoot(), source);
  var files = expandFiles('**', { dot: true, cwd: root });
  var dest, src;

  files.forEach(function(f) {
    self.log('processing file: ' + f);
    var filteredFile = f;
    // if(self.basename) {
    //   filteredFile.name = filteredFile.name.replace('basename', self.basename);
    // }
    // if(self.name) {
    //   filteredFile.name = filteredFile.name.replace('name', self.name);
    // }

    filteredFile = filteredFile.replace('ComponentName', _.capitalize(self.componentName));
    self.log('replaced capital: ' + filteredFile);

    filteredFile = filteredFile.replace('componentName', self.componentName);
    self.log('replaced lower case:', filteredFile);

    var name = filteredFile;
    var copy = false, stripped;

    src = path.join(root, f);
    dest = path.join(destination, name);

    //if(templateIsUsable(self, filteredFile)) {
    if(true){
      if(copy) {
        self.fs.copy(src, dest);
      } else {
        self.filePath = dest;
        self.fs.copyTpl(src, dest, self);
        delete self.filePath;
      }
    }
  });
}


module.exports = yeoman.generators.Base.extend({
  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exceptional ' + chalk.red('') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Name of the component?',
      default: 'component'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.componentName = _.camelize(_.slugify(props.componentName));
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.componentNamePlural = _.pluralize(this.componentName);
    this.componentNameCapital = _.capitalize(this.componentName);
    this.componentNameCapitalPlural = _.upperFirst(this.componentName + 's');

    // this.basename = path.basename(this.componentName);
    this.dirname = (this.componentName.indexOf('/') >= 0) ? path.dirname(this.componentName) : this.componentName;

    this.log('user chosed: ' + this.props.componentName);

    this.config.save();

    this.processDirectory = processDirectory.bind(this);
    this.processDirectory('.', '.');

    // this.fs.copyTpl(
    //   this.templatePath('components/module.ts'),
    //   this.destinationPath('components/' + this.componentName + '/module.ts'),
    //   templateOptions
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('components/IModel.ts'),
    //   this.destinationPath('components/' + this.componentName + '/I' + templateOptions.componentNameCapital + '.ts'),
    //   templateOptions
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('components/Repository.ts'),
    //   this.destinationPath('components/' + this.componentName + '/' + templateOptions.componentNameCapital + 'Repository.ts'),
    //   templateOptions
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('components/EditController.ts'),
    //   this.destinationPath('components/' + this.componentName + '/' + templateOptions.componentNameCapital + 'EditController.ts'),
    //   templateOptions
    // );
  },

  install: function () {
    //this.installDependencies();
  }
});
