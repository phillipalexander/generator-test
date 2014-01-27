'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var SuiteGenerator = module.exports = function SuiteGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the suite subgenerator with the argument ' + this.name + '.');
};

util.inherits(SuiteGenerator, yeoman.generators.NamedBase);

SuiteGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
