var mongo = require('mongoskin');
var reader = require('./lib/reader');
var config = require('./lib/config');
var logger = require('./lib/logger');
var every = require('schedule').every;

// configure mongo
var db = mongo.db(config.get('db:url'), {
    native_parser: true
});

module.exports = function app() {

    return {
        process: function() {
            var temperatureMonitorFile = config.get('monitors:temperature'),
                dbData = {};

            function dataReadCallback(data) {
                db.collection('temperature').insert(data, function(err, result) {
                    if (err !== null) {
                        logger.error('Could not insert temperature data: %s', err);
                    }
                });
            };

            every(config.get('poll')).do(function() {
                logger.info('Polling file...');
                reader.read(temperatureMonitorFile, dataReadCallback);
            }, 5000);

        }
    };
};