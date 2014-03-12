var fs = require('fs');
var sys = require('sys');

exports = module.exports = reader;

/**
 * Read current temperature from DS18B20.
 * Inspired to create this reader file after studying the solution
 * from Tom Holderness on his PiThermServer: git://github.com/talltom/PiThermServer.git
 *
 * @param {Object} format or options
 * @api public
 */
function reader(options) {

  fs.readFile(options.file, function(err, buffer) {
    if (err) {
      console.error(err);
    }

    // Read data from file (using fast node ASCII encoding).
    var data = buffer.toString('ascii').split(" "); // Split by space

    // Extract temperature from string and divide by 1000 to give celsius
    var temp = parseFloat(data[data.length - 1].split("=")[1]) / 1000.0;

    // Round to one decimal place
    temp = Math.round(temp * 10) / 10;

    // Execute call back with data
    options.callback({
      time: Date.now(),
      temp: temp
    });
  });

};