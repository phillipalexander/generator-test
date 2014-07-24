// run with mocha

var expect = require('chai').expect();

var algorithmPath = '../<%= algorithm %>.js'

try {
  var <%= algorithm %> = require(algorithmPath);
} catch (err) {}

// either require threw or algorithm file doesn't export
if (!<%= algorithm %>) {
  eval(require('fs').readFileSync(algorithmPath));
}

describe('<%= algorithm %>()', function () {
  'use strict';

  it('exists', function () {
    expect(<%= algorithm %>).to.be.a('function');

  });

  it('does something', function () {
    expect(true).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
