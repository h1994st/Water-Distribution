/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-16 15:41:18
 * @version 0.0.1
 */

var misc = require('./misc').global;
var WaterController = require('./WaterController');
var WaterRecycler = require('./WaterRecycler');

var mainIntervalID, mainTimeoutID, consoleIntervalID;

var waterRecycler;
var controller;

var io;

function init() {
    // lazy init
    if (!waterRecycler || !controller) {
        // console.log('init');
        waterRecycler = new WaterRecycler();
        misc.waterRecycler = waterRecycler;

        controller = new WaterController();
        controller.initWaterBox();
    }

    if (!io) {
        io = misc.io;
    }
}

function start() {
    init();
    mainIntervalID = setInterval(function () {
        mainTimeoutID = setTimeout(function () {
            var p = Math.floor(Math.random() * 100);
            console.log(new Date());
            var w = Math.floor(Math.random() * misc._random_amount);
            console.log('Use Water: ' + w);
            if (p < 20) {
                controller.water_box[0].useWater(w);
            } else if (p < 75) {
                controller.water_box[1].useWater(w);
            } else {
                controller.water_box[2].useWater(w);
            }
        }, Math.floor(Math.random() * misc._time));
    }, misc._time);

    consoleIntervalID = setInterval(function () {
        output();
    }, misc._time);
};

function pause() {
    clearInterval(mainIntervalID);
    clearTimeout(mainTimeoutID);
    clearInterval(consoleIntervalID);
};

function reset() {
    clearInterval(mainIntervalID);
    clearTimeout(mainTimeoutID);
    clearInterval(consoleIntervalID);

    waterRecycler = new WaterRecycler();
    misc.waterRecycler = waterRecycler;

    controller = new WaterController();
    controller.initWaterBox();

    misc._input = 3 * misc._init_amount;
    misc._input_compare = 0;

    output();
};

function useWaterA() {
    init();
    // console.log('use A');
    controller.water_box[0].useWater(Math.floor(Math.random() * misc._random_amount));

    output();
};

function useWaterB() {
    init();
    // console.log('use B');
    controller.water_box[1].useWater(Math.floor(Math.random() * misc._random_amount));

    output();
};

function useWaterC() {
    init();
    // console.log('use C');
    controller.water_box[2].useWater(Math.floor(Math.random() * misc._random_amount));

    output();
};

function output() {
    init();
    io.emit('waterbox', [controller.water_box[0].amount, controller.water_box[1].amount, controller.water_box[2].amount]);
    io.emit('recycler', misc.waterRecycler.amount);
    io.emit('input', [misc._input, misc._input_compare]);
}

exports = module.exports = {
    start: start,
    pause: pause,
    reset: reset,
    useWaterA: useWaterA,
    useWaterB: useWaterB,
    useWaterC: useWaterC,
    output: output
};
