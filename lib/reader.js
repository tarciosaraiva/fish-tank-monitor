var fs = require('fs');
var logger = require('./logger');
var moment = require('moment');

exports = module.exports = {};

exports.read = function(file, next) {

  if (!file) {
    return next(new Error('You must provide a file to be read.'));
  }

  fs.readFile(file, function(err, buffer) {
    if (err) {
      logger.error('Error: %s', err);
      return next(err);
    }

    function isValidFile(content) {
      var lines = content.split(/\n/);
      logger.debug('Lines: %d', lines.length);
      if (lines.length > 3) return false;

      var temperatureRead = lines[0].split(' ').pop();
      logger.debug('Temperature: %s', temperatureRead);
      if (temperatureRead !== 'YES' && temperatureRead !== 'NO') return false;

      var hasTemperature = lines[1].split(' ').pop();
      logger.debug('Has temperature?: %s', hasTemperature);
      if (hasTemperature.indexOf('t=') < 0) return false;

      return true;
    };

    function extractData(content) {
      var data = {
        time: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
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

    var asciiStr = buffer.toString('ascii');
    logger.debug('Raw data captured: %s', asciiStr);

    if (isValidFile(asciiStr)) {

      var capturedData = extractData(asciiStr);

      logger.debug('Data to be recorded into database: %s', capturedData);

      // Execute call back with data
      return next(capturedData);
    }

    return next(new Error('File is not valid.'));

  });
};