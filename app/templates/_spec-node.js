var path = require('path');
<% switch(assertstyle) {
  case "expect":
  %>
var expect = require('chai').expect;
  <% break;
  case "should":
  %>
var should = require('should');
  <% break;  } %>

var <%= algorithm %> = require(path.join(__dirname, '..', './<%= algorithm %>.js'));

describe('<%= algorithm %>()', function () {
  'use strict';

  it('exists', function () {
    <% switch( assertstyle ) { 
    case "expect": %>
      expect(<%= algorithm %>).to.be.a('function');
    <% break; 
    case "should":%>
      (typeof <%= algorithm %>).should.not.equal('function');
    <% break; } %>
  });

  it('does something', function () {
    <% switch( assertstyle ) { 
    case "expect": %>
      expect(true).to.equal(false);
    <% break; 
    case "should":%>
      true.should.not.be.ok();
    <% break; } %>
  });

  it('does something else', function () {
    <% switch( assertstyle ) { 
    case "expect": %>
      expect(true).to.equal(false);
    <% break; 
    case "should":%>
      true.should.not.be.ok();
    <% break; } %>
  });

  // Add more assertions here
});
