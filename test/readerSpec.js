var expect = require('chai').expect
var assert = require('chai').assert
var reader = require('../lib/reader')

describe('reader', function() {

  describe('#read()', function() {

    it('should throw msgor when file is not provided', function() {
      reader.read('', function(msg) {
        expect(msg).to.be.an.instanceof(Error);
        assert.equal(msg.message, 'You must provide a file to be read.', 'Error message is correct');
      });
    });

    it('should throw msgor with inexistent file', function() {
      reader.read('/tmp/file', function(msg) {
        expect(msg).to.be.an.instanceof(Error);
        assert.equal(msg.message, "ENOENT, open '/tmp/file'", 'Message');
      });
    });

    it('should read from invalid file format', function() {
      reader.read('./test/fixtures/invalid_content', function(msg) {
        expect(msg).to.be.an.instanceof(Error);
        assert.equal(msg.message, 'File is not valid.', '');
      });
    });

    it('should not read temperature when sensor is not working', function() {
      reader.read('./test/fixtures/unread_content', function(msg) {
        expect(msg).to.have.property('read', 'NO');
        expect(msg).to.have.property('time');
        expect(msg).to.have.property('temp', 0);
      });
    });

    it('should read temperature', function() {
      reader.read('./test/fixtures/valid_content', function(msg) {
        expect(msg).to.have.property('read', 'YES');
        expect(msg).to.have.property('time');
        expect(msg).to.have.property('temp', 23.875);
      });
    });

  });

});