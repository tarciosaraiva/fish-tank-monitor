// Database
var mongo = require('mongoskin');
var logger = require('morgan');
var reader = require('./reader');
var nconf = require('nconf');
var every = require('schedule').every;

// configure nconf
nconf.argv().env();
nconf.file('config.json');

// configure mongo
var db = mongo.db(nconf.get('db:url'), {
    native_parser: true
});

module.exports = function app() {

    return {
        process: function() {
            var temperatureMonitorFile = nconf.get('monitors:temperature'),
                dbData = {};

            function dataReadCallback(data) {
                db.collection('temperature').insert(data, function(err, result) {
                    if (err !== null) {
                        console.log({
                            msg: err
                        });
                    }
                });
            };

            var readerData = {
                file: temperatureMonitorFile,
                callback: dataReadCallback
            };

            every(nconf.get('poll')).do(function() {
                console.log('reading temperature from sensor...');
                reader(readerData).read();
            }, 5000);

        }
    };
};