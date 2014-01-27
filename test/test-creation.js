/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('test generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('test:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  // -----------------------------------------------------------------------------
  // Test behavior when there are not pre-existing js files.
  // -----------------------------------------------------------------------------
  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'index.html',
      'spec/algorithm.js',
      'algorithm.js'
    ];

    helpers.mockPrompt(this.app, {
      'suite': 'algorithm'
    });

    // -----------------------------------------------------------------------------
    // TODO: Add tests of behavior when there are pre-existing js files.
    // -----------------------------------------------------------------------------
    it('leaves existing algorithm code intact', function () {
      // TODO fill this in
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
