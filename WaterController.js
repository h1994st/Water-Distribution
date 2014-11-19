/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-17 23:25:48
 * @version 0.0.1
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var misc = require('./misc').global;
var WaterBox = require('./WaterBox');
var WaterRecycler = require('./WaterRecycler');

function WaterController(){
	EventEmitter.call(this);

	var a = new WaterBox(0);
	var b = new WaterBox(1);
	var c = new WaterBox(2);

	a.controller = this;
	b.controller = this;
	c.controller = this;

	this.water_box = [a, b, c];		//控制器控制的水箱
	this.NEEDWATERFLAG = [false, false, false];		//保证水箱同一时刻最多发出一个缺水请求

	this.initWaterBox = function(){
		for(var i = 0; i < 3; ++i){
			this.water_box[i].addWater(misc._init_amount);
		};
	};

	this.getEnoughMessage = function(need, type){
		console.log('控制器收到水充足信号');
		this.water_box[type].addWater(need);
		this.NEEDWATERFLAG[type] = false;
	};

	this.getNotEnoughMessage = function(need, add, type){
		console.log('控制器收到水不足信号');
		this.water_box[type].addWater(add);
		console.log('从水塔进水：' + need);
		misc._input += need;
		this.water_box[type].addWater(need);
		this.NEEDWATERFLAG[type] = false;
	};

	this.getNeedWaterMessage = function(need, type){
		if(this.NEEDWATERFLAG[type]) return;
		this.NEEDWATERFLAG[type] = true;
		console.log('控制器收到水箱' + misc._box_name[type] + '的缺水信号');
		misc.waterRecycler.getWater(need, type, this, type, need);
	};

}


util.inherits(WaterBox, EventEmitter);
exports = module.exports = WaterController;
