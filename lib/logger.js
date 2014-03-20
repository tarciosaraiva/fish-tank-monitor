var config = require('./config');
var winston = require('winston');

// configure winston logger
module.exports = new(winston.Logger)({
  transports: [
    new(winston.transports.File)({
      filename: config.get('log:file'),
      handleExceptions: false,
      level: config.get('log:level'),
      maxsize: 10485760,
      maxFiles: 7
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: config.get('log:exception'),
      json: false
    })
  ]
});