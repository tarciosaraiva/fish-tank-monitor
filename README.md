[![Build Status](https://travis-ci.org/tarciosaraiva/fish-tank-monitor.png?branch=master)](https://travis-ci.org/tarciosaraiva/fish-tank-monitor)
[![Code Climate](https://codeclimate.com/github/tarciosaraiva/fish-tank-monitor.png)](https://codeclimate.com/github/tarciosaraiva/fish-tank-monitor)

Fish Tank Monitor
=================
A fish tank monitor using Raspberry Pi and (possibly, in the future) many sensors. Currently I'm only support the DS18B20 temperature sensor.

It's a fairly straight forward setup in the Pi and even simpler here on the app. For all details on how to setup the Pi please [visit my blog](http://tarciosaraiva.wordpress.com/category/personal-projects/fish-tank-monitor-personal-projects/) as I have everything documented there.

I leverage some work from [this repo](https://github.com/talltom/PiThermServer) created by [Tomas Holderness](https://github.com/talltom) and applied my own modifications.

Contributing
------------
You can contribute with your own ideas using our [open Trello board](https://trello.com/b/YvK3La8t) or simply clone this repo and submit pull requests.

How to get going
----------------
In order to get going, make sure you have `node.js` installed. For the Pi install version [0.10.24](nodejs.org/dist/v0.10.24/) as it's the only one of the newer versions that support ARM processors - it's [this file over here](http://nodejs.org/dist/v0.10.24/node-v0.10.24-linux-arm-pi.tar.gz).

Once you have `node.js` installed, execute the following:

    git clone https://github.com/tarciosaraiva/fish-tank-monitor.git
    cd fish-tank-monitor
    npm install

But before you run, you might want to update the `config.json` file with your own preferences. By default we poll for file changes every 5 seconds and the file to read is available at `/tmp/content`. **You should replace this with your own file and possibly your own polling preference.**

The polling is based on the [schedule](https://www.npmjs.org/package/schedule) package available from `npm`. It's very easy to use: just specify a number followed by either ms, s, m, h or d.

Then you're good to go. To run simply execute `npm start` and the app will be running, polling for file changes at your specified schedule.

File to read
------------
Here's an example file you can use:

    7e 01 4b 46 7f ff 02 10 25 : crc=25 YES
    7e 01 4b 46 7f ff 02 10 25 t=23875

The Future
----------
My goal is to incorporate pH, Ammonia and Nitrite sensors which are developed by [Atlas Scientific](https://www.atlas-scientific.com). They are currently working on the later two but the [pH sensor](https://www.atlas-scientific.com/product_pages/kits/ph-kit.html) is already available.
