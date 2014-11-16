/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-16 15:41:18
 * @version 0.0.1
 */

var WaterBox = require('./WaterBox');

var a = new WaterBox('A');
var b = new WaterBox('B');
var c = new WaterBox('C');

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
