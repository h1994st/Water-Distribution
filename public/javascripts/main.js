/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-19 18:24:01
 * @version 0.0.1
 */

var socket = io();

// Chart
Chart.defaults.global.responsive = true;

var waterBoxCxt = document.getElementById("water-box-canvas").getContext("2d");
var waterBoxData = {
    labels: ["A", "B", "C"],
    datasets: [
        {
            label: "Water Box",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [0, 0, 0]
        }
    ]
};
var waterBoxsChart = new Chart(waterBoxCxt).Bar(waterBoxData);

var recyclerCxt = document.getElementById("recycler-canvas").getContext("2d");
var recyclerData = {
    labels: ["A", "B", "C"],
    datasets: [
        {
            label: "Recycler",
            fillColor: "rgba(91, 192, 222, 0.5)",
            strokeColor: "rgba(91, 192, 222, 0.8)",
            highlightFill: "rgba(91, 192, 222, 0.75)",
            highlightStroke: "rgba(91, 192, 222, 1)",
            data: [0, 0, 0]
        }
    ]
};
var recyclerChart = new Chart(recyclerCxt).Bar(recyclerData);

var inputCxt = document.getElementById("input-canvas").getContext("2d");
var inputData = {
    labels: ["Water Input (from Water Works)"],
    datasets: [
        {
            label: "With Recycler",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },
        {
            label: "Without Recycler",
            fillColor: "rgba(217, 83, 79, 0.5)",
            strokeColor: "rgba(217, 83, 79, 0.8)",
            highlightFill: "rgba(217, 83, 79, 0.75)",
            highlightStroke: "rgba(217, 83, 79, 1)",
            data: [0]
        }
    ]
};
var inputChart = new Chart(inputCxt).Bar(inputData);

// Console
function Console(consoleID) {
    this.consoleMain = document.getElementById(consoleID);
    this.consoleMain.style.height = document.getElementById('input-canvas').style.height;

    if (this.consoleMain.tagName.toUpperCase() != "TEXTAREA") {
        throw new Error("控制台输出窗口必须为TEXTAREA");
    };

    Console.prototype.log = function (string) {
        this.consoleMain.value += ("> " + string + "\n");
    };

    Console.prototype.error = function (string) {
        this.consoleMain.value += ("> !ERROR: " + string + "\n");
    };

    Console.prototype.clear = function () {
        this.consoleMain.value = "";
    };
};

// 初始化控制台
var myConsole = new Console("console");

// Update & Socket.io
socket.on('waterbox', function(data){
    console.log('waterbox: ' + data);

    for (var i = 0; i < waterBoxsChart.datasets[0].bars.length; i++) {
        waterBoxsChart.datasets[0].bars[i].value = data[i];
    };
    waterBoxsChart.update();
});

socket.on('recycler', function (data){
    console.log('recycler: ' + data);

    for (var i = 0; i < recyclerChart.datasets[0].bars.length; i++) {
        recyclerChart.datasets[0].bars[i].value = data[i];
    };

    recyclerChart.update();

});

socket.on('input', function (data){
    console.log('intput: ' + data);

    for (var i = 0; i < inputChart.datasets.length; i++) {
        inputChart.datasets[i].bars[0].value = data[i];
    };

    inputChart.update();
});

socket.on('console', function (data){

    myConsole.log(data);
    
});

// Start & Stop & Reset
$('#start-btn').on('click', function (event) {
    event.preventDefault();

    socket.emit('start');

    // Start后，自身不可用
    $(this).addClass('disabled')
    $(this).attr('disabled', true);

    // Reset & Pause可用
    $('#reset-btn').removeClass('disabled');
    $('#reset-btn').removeAttr("disabled");
    $('#pause-btn').removeClass('disabled');
    $('#pause-btn').removeAttr("disabled");
});

$('#pause-btn').on('click', function (event) {
    event.preventDefault();

    socket.emit('pause');

    // Pause后，Start可用
    $('#start-btn').removeClass('disabled');
    $('#start-btn').removeAttr("disabled");

    // Pause后，自身不可用
    $(this).addClass('disabled')
    $(this).attr('disabled', true);
});

$('#reset-btn').on('click', function (event) {
    event.preventDefault();

    socket.emit('reset');

    // 清空Console
    myConsole.clear();

    // Reset后，Start可用
    $('#start-btn').removeClass('disabled');
    $('#start-btn').removeAttr("disabled");

    // Reset后，Pause和自身不可用
    $('#pause-btn').addClass('disabled');
    $('#pause-btn').attr('disabled', true);
    $(this).addClass('disabled')
    $(this).attr('disabled', true);
});

// A & B & C
$('#A-btn').on('click', function (event) {
    console.log('Use A: ' + new Date());
    event.preventDefault();

    socket.emit('useA');

    $('#reset-btn').removeClass('disabled');
    $('#reset-btn').removeAttr("disabled");
});

$('#B-btn').on('click', function (event) {
    console.log('Use B: ' + new Date());
    event.preventDefault();

    socket.emit('useB');

    $('#reset-btn').removeClass('disabled');
    $('#reset-btn').removeAttr("disabled");
});

$('#C-btn').on('click', function (event) {
    console.log('Use C: ' + new Date());
    event.preventDefault();

    socket.emit('useC');

    $('#reset-btn').removeClass('disabled');
    $('#reset-btn').removeAttr("disabled");
});
