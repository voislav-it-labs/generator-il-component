'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var helpers = require('../lib/helpers');

var validateRequiredName = helpers.validateRequiredName;
var validateOptionalName = helpers.validateOptionalName
var checkPropertyName = helpers.checkPropertyName;
var typeChoices = helpers.getTypeChoices();

function getPropertyTypePrompts() {
  var prompts = [
    {
      name: 'name',
      message: 'Enter the property name:',
      validate: checkPropertyName,
      when: function() {
        return !this.name && this.name !== 0;
      }.bind(this)
    },
    {
      name: 'type',
      message: 'Property type:',
      type: 'list',
      choices: typeChoices
    },
    {
      name: 'customType',
      message: 'Enter the type:',
      required: true,
      validate: validateRequiredName,
      when: function(answers) {
        return answers.type === null;
      }
    },
    {
      name: 'itemType',
      message: 'The type of array items:',
      type: 'list',
      choices: typeChoices.filter(function(t) { return t !== 'array'; }),
      when: function(answers) {
        return answers.type === 'array';
      }
    },
    {
      name: 'customItemType',
      message: 'Enter the item type:',
      validate: validateRequiredName,
      when: function(answers) {
        return answers.type === 'array' && answers.itemType === null;
      }
    },
    {
      name: 'required',
      message: 'Required?',
      type: 'confirm',
      default: false
    },
    {
       name: 'defaultValue',
       message: 'Default value[leave blank for none]:',
       default: null
    }
  ];

  return prompts;
}

module.exports = yeoman.Base.extend({
  constructor: function(){
    yeoman.Base.apply(this, arguments);

    this.argument('name', {
      desc: 'Name of the model to create.',
      required: false,
      type: String
    });

    this.properties = [];

    this.addProperty = function(done) {
      this.log('Enter an empty property name when done.');
      var prompts = [
        {
          name: 'propertyName',
          message: 'Property name:',
          validate: validateOptionalName
        }
      ];

      var property = {};

      this.prompt(prompts, function(answers){
        if (answers.propertyName == null || answers.propertyName === '') {
          if(this.properties.length === 0){
            this.log('Please add at least one property');
          }else {
            return done();
          }
        }
        property.name = answers.propertyName;

        var prompts = getPropertyTypePrompts.call(this);
        this.prompt(prompts, function(answers){
          if (answers.type === 'array') {
            var itemType =  answers.customItemType || answers.itemType;
            property.type = itemType ? [itemType] : 'array';
          } else {
            property.type = answers.customType || answers.type;
          }
          property.required = answers.required;
          property.defaultValue = answers.defaultValue;

          this.properties.push(property);
          this.log('current properties:', this.properties);
          this.addProperty(done);

        }.bind(this));

      }.bind(this));
    }
  },
  askForName: function() {
    var done = this.async();
    var prompts = [
      {
        name: 'name',
        message: 'Enter the model name:',
        default: this.name,
        validate: validateRequiredName
      }
    ];

    this.prompt(prompts, function(props) {
      this.name = props.name;
      done();
    }.bind(this));

  },
  property: function(p) {
    var done = this.async();
    this.addProperty(function(){
      var model = {
        name: this.name,
        properties: this.properties
      };

      this.config.set('model', model);
      done();
    }.bind(this));
  }
})
