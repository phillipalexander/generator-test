var path = require('path');
var expect = require('chai').expect;

var <%= algorithm %> = require(path.join(__dirname, '..',
  './<%= algorithm %>.js'));

describe('<%= algorithm %>()', function() {
  'use strict';

  it('exists', function() {
    expect( <%= algorithm %> ).to.be.a('function');

  });

  it('does something', function() {
    expect(true).to.equal(true);
  });

  it('does something else', function() {
    expect(false).to.equal(false);
  });

  // Add more assertions here
});
