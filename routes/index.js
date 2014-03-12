var reader = require('../reader');
var moment = require('moment');

/* GET home page. */
exports.index = function(req, res) {
  var templateParams = {
    title: 'Fish tank monitor'
  };

  reader({
    file: '/Users/tarcio/content', // '/sys/bus/w1/devices/28-00000400a88a/w1_slave',
    callback: function(data) {
      templateParams.time = moment(data.time).format('ddd @ h:mm:ss A');
      templateParams.temp = data.temp;
      res.render('index', templateParams);
    }
  });

};