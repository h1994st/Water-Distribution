/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-16 17:15:04
 * @version 0.0.1
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function WaterBox(name, max, delegate) {
  EventEmitter.call(this);
  this.name = name || "Water Box";
  this.delegate = delegate; // 代理，留给之后的HomeController
  var _surplusWater = 0; // 默认为空
  var _max = max ? max : 100; // 默认100升
  var _warning = 0.1 * _max; // 警戒线为十分之一

  console.log('\n水箱' + this.name + ': ');
  console.log('\t余量: ' + _surplusWater);
  console.log('\t上限: ' + _max);
  console.log('\t警戒线: ' + _warning);
  console.log();

  this.useWater = function(x) {
    // 检查是否会为空
    if (_surplusWater - x <= 0) {
      console.log(this.name + ' 水空');
      this.emit('empty', x - _surplusWater); // 触发水空的消息，并附送参数：还缺多少水
      _surplusWater = 0; // 水空
      return;
    };

    _surplusWater -= x; // 用水
    console.log(this.name + ' 余量：' + _surplusWater);

    // 检查是否会在警戒线以下
    if (_surplusWater < _warning) {
      console.log(this.name + ' 警报');
      this.emit('warning', _warning - _surplusWater); // 触发警报的消息，并附送参数：需要多少水消除警报
    };
  };

  this.addWater = function(x) {
    // 检查是否溢出
    if (_surplusWater + x > _max) {
      console.log(this.name + ' 水满');
      this.emit('full', _surplusWater + x - _max); // 触发水满的消息，并附送参数：多出来的水
      _surplusWater = _max; // 水满
      return;
    };

    _surplusWater += x; // 加水
    console.log(this.name + ' 余量：' + _surplusWater);

    // 检查是否会在警戒线以下
    if (_surplusWater < _warning) {
      console.log(this.name + ' 警报');
      this.emit('warning', _warning - _surplusWater); // 触发警报的消息，并附送参数：需要多少水消除警报
    };
  };
};

util.inherits(WaterBox, EventEmitter);

exports = module.exports = WaterBox;
