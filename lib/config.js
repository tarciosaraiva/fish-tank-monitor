var nconf = require('nconf');

// configure nconf
nconf.env().file('config.json');

module.exports = nconf;