var nconf = require('nconf');

// configure nconf
nconf.argv().env();
nconf.file('config.json');

module.exports = nconf;