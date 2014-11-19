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
      data: [65, 59, 80]
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
      data: [65, 59, 80]
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
      data: [65]
    },
    {
      label: "Without Recycler",
      fillColor: "rgba(217, 83, 79, 0.5)",
      strokeColor: "rgba(217, 83, 79, 0.8)",
      highlightFill: "rgba(217, 83, 79, 0.75)",
      highlightStroke: "rgba(217, 83, 79, 1)",
      data: [100]
    }
  ]
};
var recyclerChart = new Chart(inputCxt).Bar(inputData);

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
socket.on('update', function (data) {
  console.log('update: ' + data);

  for (var i = 0; i < waterBoxsChart.datasets[0].bars.length; i++) {
    waterBoxsChart.datasets[0].bars[i].value = data[i];
  };

  waterBoxsChart.update();
});
