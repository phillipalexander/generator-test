/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

var expectedFiles = ['package.json'];
var unexpectedFiles = ['bower.json', '.bowerrc'];

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
        assert.noFile(unexpectedFiles);
        assert.fileContent('algorithm.js', /module\.exports = algorithm/);
        assert.fileContent('./spec/algorithm.js', /require/);
        assert.fileContent('package.json', /chai/);
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
        assert.noFile(unexpectedFiles);
        assert.fileContent('myAlgo.js', /myAlgo/);
        assert.fileContent('./spec/myAlgo.js',  /require/);
        assert.fileContent('package.json', /chai/);
        assert.implement(require('./temp/myAlgo.js')(), ['method']);
        done();
      });
  });

  it('runs the generated test file in node using npm test', function (done) {
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
        assert.fileContent('package.json', /test/);
        done();
      });
  });

});
