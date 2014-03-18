var mongo = require('mongoskin');
var reader = require('./lib/reader');
var config = require('./lib/config');
var logger = require('./lib/logger');
var every = require('schedule').every;

// configure mongo
var db = mongo.db(config.get('db:url'), {
  native_parser: true
});

var ENV_FILE = 'TMP_FILE';
var ENV_POLL = 'TMP_POLL';
var CFG_FILE = 'monitors:temperature';
var CFG_POLL = 'poll';

exports = module.exports = {};

exports.monitorFile = config.get(ENV_FILE) || config.get(CFG_FILE);
exports.polling = config.get(ENV_POLL) || config.get(CFG_POLL);

exports.process = function() {
  logger.info('Polling file `%s` every `%s`', this.monitorFile, this.polling);

  function dataReadCallback(data) {
    if (typeof data === 'Error') {
      logger.error('Error: %s', data.message);
      process.exit(1);
    }

    db.collection('temperature').insert(data, function(err, result) {
      if (err !== null) {
        logger.error('Could not insert temperature data: %s', err.message);
      }
    });
  };

  every(this.polling).do(function() {
    reader.read(this.monitorFile, dataReadCallback);
  });

};