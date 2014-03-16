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
var CFG_FILE = 'monitors:temperature:file';

exports = module.exports = {
    monitorFile: config.get(ENV_FILE) || config.get(CFG_FILE)
};

exports.process = function() {
    function dataReadCallback(data) {
        db.collection('temperature').insert(data, function(err, result) {
            if (err !== null) {
                logger.error('Could not insert temperature data: %s', err.message);
            }
        });
    };

    every(config.get('poll')).do(function() {
        logger.info('Polling file...');
        reader.read(this.monitorFile, dataReadCallback);
    }, 5000);

};