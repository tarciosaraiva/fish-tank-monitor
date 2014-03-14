var config = require('./config');
var winston = require('winston');

// configure winston logger
module.exports = new(winston.Logger)({
  transports: [
    new(winston.transports.File)({
      filename: config.get('log:file'),
      handleExceptions: false,
      json: true,
      level: config.get('log:level')
    })
  ]
});