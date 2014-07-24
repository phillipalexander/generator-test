/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

var expectedFiles = [
  '.jshintrc',
  '.editorconfig',
  '.bowerrc',
  'package.json'
];

describe('test node generator', function () {

  // -----------------------------------------------------------------------------
  // Test behavior when there are not pre-existing js files.
  // -----------------------------------------------------------------------------
  it('creates expected files when no .js files exist', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({
        'skip-install': true 
      })
      .withPrompt({
        'environment': 'Node',
        'algorithm': 'algorithm'
      })
      .on('end', function () {
        var expected = expectedFiles.concat([
          'spec/algorithm.js',
          'algorithm.js'
        ]);
        assert.file(expected);
        assert.fileContent('algorithm.js', /module\.exports = algorithm/);
        done();
      });
  });

  it('leaves existing files intact when they exist', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({
        'skip-install': true 
      })
      .withPrompt({
        'environment': 'Node',
        'file': 'myAlgo.js'
      })
      .on('ready', function (generator) {
        var js = "var myAlgo = function () { return { method: function () {} }; }; module.exports = myAlgo;";
        fs.writeFileSync(path.join(__dirname, './temp/myAlgo.js'), js); 
      })
      .on('end', function () {
        var expected = expectedFiles.concat([
          'spec/myAlgo.js',
          'myAlgo.js'
        ]);
        assert.file(expected);
        assert.fileContent('myAlgo.js', /myAlgo/);
        assert.implement(require('./temp/myAlgo.js')(), ['method']);
        done();
      });
  });

});
