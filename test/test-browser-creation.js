/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

var expectedFiles = ['.bowerrc', 'bower.json', 'index.html'];
var unexpectedFiles = ['package.json'];


describe('test browser generator', function () {

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
        'environment': 'browser',
        'algorithm': 'algorithm'
      })
      .on('end', function () {
        var expected = expectedFiles.concat([
          'spec/algorithm.js',
          'algorithm.js'
        ]);
        assert.file(expected);
        assert.fileContent('algorithm.js', /var algorithm = function ()/);
        assert.fileContent('bower.json', /chai/);
        assert.noFileContent('./spec/algorithm.js', /require/);
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
        'environment': 'browser',
        'file': 'myAlgo.js'
      })
      .on('ready', function (generator) {
        var js = "var myAlgo = function () { return { method: function () {} }; };";
        fs.writeFileSync(path.join(__dirname, './temp/myAlgo.js'), js);
      })
      .on('end', function () {
        var expected = expectedFiles.concat([
          'spec/myAlgo.js',
          'myAlgo.js'
        ]);
        assert.file(expected);
        assert.fileContent('myAlgo.js', /myAlgo/);
        assert.noFileContent('./spec/myAlgo.js', /require/);
        assert.fileContent('bower.json', /chai/);
        // doesn't work as expected; figure out a better way to do this.
        // eval(fs.readFileSync(path.join(__dirname, './temp/myAlgo.js'), 'utf8'));
        // assert.implement(myAlgo(), ['method']);
        done();
      });
  });

});
