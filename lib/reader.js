var fs = require('fs');
var logger = require('./logger');

/**
 * Read current temperature from DS18B20.
 * Inspired to create this reader file after studying the solution
 * from Tom Holderness on his PiThermServer: git://github.com/talltom/PiThermServer.git
 *
 * @param {Object} must be an object containing two keys: file and callback, where callback is a function taking one parameter
 * @api public
 */
exports = module.exports = {};

var isValidFile = function(content) {
  var lines = content.split(/\n/);
  if (lines.length !== 2) return false;

  var temperatureRead = lines[0].split(' ').pop();
  if (temperatureRead !== 'YES' && temperatureRead !== 'NO') return false;

  var hasTemperature = lines[1].split(' ').pop();
  if (hasTemperature.indexOf('t=') < 0) return false;

  return true;
};

var extractData = function(content) {
  var data = {
    time: Date.now()
  },
    lines = content.split(/\n/),
    temperature = 0,
    temperatureRead = lines[0].split(' ').pop();

  data.read = temperatureRead;

  if (temperatureRead === 'YES') {
    // the temperature format is t=12345
    // we simply parse it to float and ensure that
    // celsius is still captured appropriately
    temperature = lines[1].split(' ').pop().split('=')[1];
    temperature = parseFloat(temperature) / 1000.0;
  } else {
    temperature = 0;
  }

  data.temp = temperature;;
  return data;
};

exports.read = function(file, next) {

  if (!file) {
    return next(new Error('You must provide a file to be read.'));
  }

  fs.readFile(file, function(err, buffer) {
    if (err) {
      logger.error('Error: %s', err);
      return next(err);
    }

    var asciiStr = buffer.toString('ascii');
    logger.debug('Raw data captured: %s', asciiStr);

    if (isValidFile(asciiStr)) {

      var capturedData = extractData(asciiStr);

      logger.info('Data to be recorded into database: %s', capturedData);

      // Execute call back with data
      return next(capturedData);
    }

    return next(new Error('File is not valid.'));

  });
};