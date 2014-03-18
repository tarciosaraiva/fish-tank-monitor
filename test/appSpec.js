var expect = require('chai').expect
var assert = require('chai').assert
var should = require('should');
var sinon = require('sinon');
var reader = require('../lib/reader');
var app = require('../app');

describe('app', function() {

  var clock, readerSpy = sinon.spy(reader, 'read');

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it('should read file according to config file', function() {
    assert(app.monitorFile.should.be.eql('/tmp/content'));
  });

  it('should poll file according to env property', function() {
    assert(app.polling.should.be.eql('5s'));
  });

  describe('#read()', function() {

    it('should read file at correct intervals', function() {

      // 31s
      setTimeout(function() {
        readerSpy.calledOn(reader);
        readerSpy.callCount.should.be.eql(6);
      }, 31000);

      // 61s
      setTimeout(function() {
        readerSpy.calledOn(reader);
        readerSpy.callCount.should.be.eql(12);
      }, 61000);

      app.process();

      clock.tick(32000);
      clock.tick(70000);
    });

  });

});