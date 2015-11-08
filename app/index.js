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
    // this.installDependencies({ skipInstall: options['skip-install'] });
    this.installDependencies({
      npm: this.environment === 'Node' ? true : false,
      bower: this.environment === 'browser' ? true : false,
      skipInstall: options['skip-install'],
      callback: function() {
        console.log('Everything is ready!');
      }
    });
  });


  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TestGenerator, yeoman.generators.Base);

TestGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var allFiles = fs.readdirSync(process.cwd());
  var prompts = [];

  var jsFiles = allFiles.filter( function( file ) {
    return file.substr(file.length - 3) === '.js';
  });

  prompts.push({
    type: 'list',
    name: 'environment',
    message: 'Do you want to test your algorithm in the browser or with Node?',
    choices: ['Node', 'browser'],
    default: 'browser'
  });

  prompts.push({
    when: function(answers) { return answers.environment === 'Node'; },
    type: 'list',
    name: 'assertstyle',
    message: 'Which assertion style do you want to use?',
    choices: ['expect', 'should'],
    default: 'expect'
  });

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
    this.algorithm = response.algorithm || response.file.split('.')[0];
    this.environment = response.environment || 'browser';
    this.assertstyle = response.assertstyle || "expect";
    cb();
  }.bind(this));
};

TestGenerator.prototype.app = function projectFiles() {
  var fileExists = fs.existsSync(path.resolve(process.cwd(), this.file));

  // scaffold out the tests based on env
  if (this.environment === 'Node') {
    this.template('_spec-node.js', 'spec/' + this.file);
    this.template('_package.json', 'package.json');
  } else if (this.environment === 'browser') {
    this.template('_index.html', 'index.html');
    this.template('_spec-browser.js', 'spec/' + this.file);
    this.template('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
  }

  // Create the src file if one doesn't already exist
  if (!fileExists) {
    this.template((this.environment === 'Node' ? '_src-node.js' : '_src-browser.js'), this.file);
  }

  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};
