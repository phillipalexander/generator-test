'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


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

  var prompts = [{
    name: 'algorithm',
    message: 'Please enter a name for the algorithm you\'d like to test',
    default: this.appname
  }];

  this.prompt(prompts, function (props) {
    this.algorithm = this._.camelize(this._.slugify(this._.humanize(props.algorithm)));
    cb();
  }.bind(this));
};

TestGenerator.prototype.app = function projectFiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_index.html', 'index.html');
  this.template('_spec.js', 'spec/' + this.algorithm + '.js');
  this.template('_src.js', 'src/' + this.algorithm + '.js');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
