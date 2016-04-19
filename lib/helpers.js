'use strict';
var assert = require('assert');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var glob =  require('glob');
var fs = require('fs');
var s = require('underscore.string');
var i = require('underscore.inflection');

_.mixin(s.exports());
_.mixin(i);

var RESERVED_PROPERTY_NAMES = ['constructor'];

exports.reportValidationError = function(err, logFn) {
  if (!err || err.name !== 'ValidationError') {
    return;
  }

  var details = err.details;
  logFn(chalk.red('Validation error: invalid %s'), details.context);
  Object.keys(details.messages).forEach(function(prop) {
    logFn(chalk.red(' - %s: %s'), prop, details.messages[prop]);
  });
};

/**
 * validate application (module) name
 * @param name
 * @returns {String|Boolean}
 */
exports.validateAppName = function (name) {
  if (name.charAt(0) === '.' ) {
    return 'Application name cannot start with .: ' + name;
  }
  if(name.match(/[\/@\s\+%:]/)) {
    return 'Application name cannot contain special characters (/@+%: ): ' +
      name;
  }
  if(name.toLowerCase() === 'node_modules') {
    return 'Application name cannot be node_modules';
  }
  if(name.toLowerCase() === 'favicon.ico') {
    return 'Application name cannot be favicon.ico';
  }
  if(name !== encodeURIComponent(name)) {
    return 'Application name cannot contain special characters escaped by ' +
      'encodeURIComponent: ' + name;
  }
  return true;
};

/**
 * Validate property name
 * @param {String} name The user input
 * @returns {String|Boolean}
 */
exports.checkPropertyName = function(name) {
  var result = exports.validateRequiredName(name);
  if (result !== true) return result;
  if (RESERVED_PROPERTY_NAMES.indexOf(name) !== -1) {
    return name + ' is a reserved keyword. Please use another name';
  }
  return true;
};

/**
 * Validate required name for properties, data sources, or connectors
 * Empty name could not pass
 * @param {String} name The user input
 * @returns {String|Boolean}
 */
exports.validateRequiredName = function (name) {
  if (!name) {
    return 'Name is required';
  }
  return exports.validateOptionalName(name);
};

/**
 * Validate optional name for properties, data sources, or connectors
 * Empty name could pass
 * @param {String} name The user input
 * @returns {String|Boolean}
 */
exports.validateOptionalName = function (name) {
  if (name.match(/[\/@\s\+%:\.]/)) {
    return 'Name cannot contain special characters (/@+%:. ): ' + name;
  }
  if (name !== encodeURIComponent(name)) {
    return 'Name cannot contain special characters escaped by ' +
      'encodeURIComponent: ' + name;
  }
  return true;
};

/**
 * Check if relation has a different name from properties
 * @param {Object} modelDefinition The model which has the relation
 * @param {String} name The user input
 * @param {Function(String|Boolean)} Callback to receive the check result.
 */
exports.checkRelationName = function (modelDefinition, name, callback) {
  modelDefinition.properties(function(err, list) {
    if (err) callback(err);
    var conflict = list.some(function(property) {
      return property.name === name;
    });
    if (conflict) {
      callback('Same property name already exists: ' + name);
    } else {
      callback(true);
    }
  });
};

/**
 * Get the available type choices that should be used for arguments
 * from workspace.
 */
exports.getTypeChoices = function() {
  return [
    {name: 'int', value: 'int'},
    {name: 'string', value: 'string'},
    {name: 'array', value: 'array'},
    {name: 'date', value: 'date'}];
  // var typeChoices = ModelProperty.availableTypes.concat({
  //   name: '(other)',
  //   value: null
  // });
  // return typeChoices;
};

/**
 * Get a validate function for object/array type
 * @param {String} type 'object' or 'array'
 * @returns {Function} The validator function
 */
exports.objectValidator = function objectValidator(type) {
  return function validate(val) {
    if (val == null || val === '') {
      return true;
    }
    if (typeof val !== 'string') {
      return 'The value must be stringified ' + type;
    }
    try {
      var result = JSON.parse(val);
      if (type === 'array' && !Array.isArray(result)) {
        return 'The value must be a stringified ' + type;
      }
    } catch (e) {
      return 'The value must be a stringified ' + type;
    }
    return true;
  };
};

exports.expandFiles = expandFiles;

function expandFiles(pattern, options) {
  options = options || {};
  var cwd = options.cwd || process.cwd();
  return glob.sync(pattern, options).filter(function (filepath) {
    return fs.statSync(path.join(cwd, filepath)).isFile();
  });
}

exports.processDirectory = function processDirectory(source, destination) {
  var self = this;

  var root = path.isAbsolute(source) ? source : path.join(self.sourceRoot(), source);
  var files = expandFiles('**', { dot: true, cwd: root });
  var dest, src;

  files.forEach(function(f) {
    self.log('processing file: ' + f);
    var filteredFile = f;

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
