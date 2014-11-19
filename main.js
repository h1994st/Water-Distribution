/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-16 15:41:18
 * @version 0.0.1
 */

var WaterBox = require('./WaterBox');
var WaterRecycler = require('./WaterRecycler');
var WaterController = require('./WaterController');

var a = new WaterBox('A');
var b = new WaterBox('B');
var c = new WaterBox('C');

var recycler = new WaterRecycler();
var controller = new WaterController(a, b, c, recycler);
a.controller = controller;
b.controller = controller;
c.controller = controller;




console.log(a.name);
console.log(b.name);
console.log(c.name);

a.on('full', function (x) {
  console.log('控制器：收到水满信号');
  console.log('多出 ' + x);
}).on('empty', function (x) {
  console.log('控制器：收到水空信号');
  console.log('缺 ' + x);
}).on('warning', function (x) {
  console.log('控制器：收到警报');
});
b.on('full', function (x) {
  console.log('控制器：收到水满信号');
  console.log('多出 ' + x);
}).on('empty', function (x) {
  console.log('控制器：收到水空信号');
  console.log('缺 ' + x);
}).on('warning', function (x) {
  console.log('控制器：收到警报');
});
c.on('full', function (x) {
  console.log('控制器：收到水满信号');
  console.log('多出 ' + x);
}).on('empty', function (x) {
  console.log('控制器：收到水空信号');
  console.log('缺 ' + x);
}).on('warning', function (x) {
  console.log('控制器：收到警报');
});

a.addWater(100);
b.addWater(100);
c.addWater(100);

console.log();

setInterval(function () {
  setTimeout(function () {
    var p = Math.floor(Math.random() * 100);
    console.log(new Date());
    var w = Math.floor(Math.random() * 100);
    console.log('Use Water: ' + w);
    if (p < 20) {
      a.useWater(w);
    } else if (p < 75) {
      b.useWater(w);
    } else {
      c.useWater(w);
    }
    console.log();
  }, Math.floor(Math.random() * 1000));
}, 500);
