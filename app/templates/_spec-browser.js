/* global <%= algorithm %>, describe, it, expect, should */

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
