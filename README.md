Fish Tank Monitor
=================
A fish tank monitor using Raspberry Pi and (possibly, in the future) many sensors. Currently I'm only support the DS18B20 temperature sensor.

It's a fairly straight forward setup in the Pi and even simpler here on the app. For all details on how to setup the Pi please [visit my blog](http://tarciosaraiva.wordpress.com/category/personal-projects/fish-tank-monitor-personal-projects/) as I have everything documented there.

I leverage some work from [this repo](https://github.com/talltom/PiThermServer) created by [Tomas Holderness](https://github.com/talltom) and applied my own modifications as my ultimate goal is to setup a self-contained webapp generating graphs and maybe manipulating some water parameters.

How to get going
----------------
In order to get going, make sure you have `node.js` installed. For the Pi install version [0.10.24](nodejs.org/dist/v0.10.24/) as it's the only one of the newer versions that support ARM processors - it's [this file over here](http://nodejs.org/dist/v0.10.24/node-v0.10.24-linux-arm-pi.tar.gz).

Once you have `node.js` installed, execute the following:

    git clone https://github.com/tarciosaraiva/fish-tank-monitor.git
    cd fish-tank-monitor
    npm install
Then you're good to go. To run simply execute `npm start` and the app will be up and running on port 3000.

File to read
------------
In order to read the file, all you have to do is edit `./routes/index.js` and change the property `file` on line 11 to point to whatever file it is that your Pi is generating - usually under `/sys/bus/w1/devices/28-xxxxxx/w1_slave`.

Here's an example file you can use:

    7e 01 4b 46 7f ff 02 10 25 : crc=25 YES
    7e 01 4b 46 7f ff 02 10 25 t=23875

The Future
----------
My goal is to incorporate pH, Ammonia and Nitrite sensors which are developed by [Atlas Scientific](https://www.atlas-scientific.com). They are currently working on the later two but the [pH sensor](https://www.atlas-scientific.com/product_pages/kits/ph-kit.html) is already available.

If you feel like you want to collaborate, please feel free to fork it!
