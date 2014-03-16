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
var CFG_FILE = 'monitors:temperature:file';
var CFG_POLL = 'poll';

exports = module.exports = {};

exports.process = function() {
    var monitorFile = config.get(ENV_FILE) || config.get(CFG_FILE)
    var polling = config.get(ENV_POLL) || config.get(CFG_POLL)

    logger.info('Polling file `%s` every `%s`', monitorFile, polling);

    function dataReadCallback(data) {
        if (typeof data === 'Error') {
            logger.error('Error: %s', data.message);
            process.exit(1);
        }
        logger.info('About to insert data: %s', data);
        db.collection('temperature').insert(data, function(err, result) {
            if (err !== null) {
                logger.error('Could not insert temperature data: %s', err.message);
            }
        });
    };

    every(polling).do(function() {
        reader.read(monitorFile, dataReadCallback);
    }, 5000);

};