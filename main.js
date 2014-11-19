/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-16 15:41:18
 * @version 0.0.1
 */

var misc = require('./misc').global;
var WaterController = require('./WaterController');
var WaterRecycler = require('./WaterRecycler');

var waterRecycler = new WaterRecycler();
misc.waterRecycler = waterRecycler;

var controller = new WaterController();
controller.initWaterBox();

setInterval(function () {
  setTimeout(function () {
    console.log();
    console.log();
    var p = Math.floor(Math.random() * 100);
    console.log(new Date());
    var w = Math.floor(Math.random() * 20);
    console.log('Use Water: ' + w);
    if (p < 20) {
      controller.water_box[0].useWater(w);
    } else if (p < 75) {
      controller.water_box[1].useWater(w);
    } else {
      controller.water_box[2].useWater(w);
    }
    console.log();
    output();
  }, Math.floor(Math.random() * 1000));
}, 1000);

// setInterval(function(){
//   }, 1000);

var output = function(){
  console.log('总输入量：' + misc._input);
  console.log('对比输入量：' + misc._input_compare);
  console.log('用户需水池状况：');
  console.log('A水箱水量：' + controller.water_box[0].amount);
  console.log('B水箱水量：' + controller.water_box[1].amount);
  console.log('C水箱水量：' + controller.water_box[2].amount);
  console.log('净水设施水存储状况：');
  console.log('A类水剩余：' + misc.waterRecycler.amount[0]);
  console.log('B类水剩余：' + misc.waterRecycler.amount[1]);
  console.log('C类水剩余：' + misc.waterRecycler.amount[2]);
}
