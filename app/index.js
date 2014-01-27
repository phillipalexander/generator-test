'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');


var TestGenerator = module.exports = function TestGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TestGenerator, yeoman.generators.Base);

TestGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var allFiles = fs.readdirSync(process.cwd());
  var jsFiles = [];
  var prompts = [];

  for (var i = 0; i < allFiles.length; i++) {
    var selectedFile = allFiles[i];
    if (selectedFile.substr(selectedFile.length - 3) === '.js') {
      jsFiles.push(selectedFile);
    }
  }

  if (jsFiles.length === 0) {
    prompts.push({
      name: 'algorithm',
      message: 'Please enter a name for the algorithm you\'d like to test',
      default: this.appname
    });
  } else {
    prompts.push({
      type: 'list',
      name: 'file',
      message: 'Hey, I found js files in this directory. Which one contains the algorithm you\'d like to test?',
      choices: jsFiles
    });
  }

  this.prompt(prompts, function (response) {
    this.file = response.file || response.algorithm + '.js';
    this.algorithm = response.file.split('.')[0] || response.algorithm;
    cb();
  }.bind(this));
};

TestGenerator.prototype.app = function projectFiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_index.html', 'index.html');
  this.template('_spec.js', 'spec/' + this.file);

  var fileExists = fs.existsSync(path.resolve(process.cwd(), this.file));

  if (!fileExists) {
    this.template('_src.js', this.file);
  }

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
