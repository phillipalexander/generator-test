/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;

var expectedFiles = ['package.json'];
var unexpectedFiles = ['bower.json', '.bowerrc'];

describe('test assertion selector', function () {

  it('should generate a test using should style', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        'environment': 'Node',
        'algorithm': 'algorithm',
        'assertstyle': 'should'
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
        assert.fileContent('package.json', /should/);
        assert.fileContent('spec/algorithm.js', /should/);
        done();
      });
  });

  it('should generate a test using expect style', function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompt({
        'environment': 'Node',
        'algorithm': 'algorithm',
        'assertstyle': 'expect'
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
        assert.fileContent('spec/algorithm.js', /expect/);
        done();
      });
  });
});
