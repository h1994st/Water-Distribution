/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-17 23:25:48
 * @version 0.0.1
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function WaterController(a, b, c, recycler){
	EventEmitter.call(this);

	this.water_box = [a, b, c];		//控制器控制的水箱
	this.recycler = recycler;		//净水系统
	this.NEEDWATERFLAG = [false, false, false];		//保证水箱同一时刻最多发出一个缺水请求

	this.on('enough', function(need, type){
		console.log('控制器收到水充足信号');
		this.water_box[type].addWater(need);
		this.NEEDWATERFLAG[type] = false;
	}).on('not_enough', function(need, add, type){
		console.log('控制器收到水不足信号');
		this.water_box[type].addWater(add);
		console.log('从水塔进水：' + need);
		util.input += need;
		this.water_box[type].addWater(need);
		this.NEEDWATERFLAG[type] = false;
	});

	this.on('need_water', function(need, type)){
		if(this.NEEDWATERFLAG[type]) return;
		this.NEEDWATERFLAG[type] = true;
		console.log('控制器收到水箱' + util._box_name[type] + '的缺水信号');
		this.recycler.getWater(need, type, this, type, need);
	};
}


util.inherits(WaterBox, EventEmitter);
exports = module.exports = WaterController;
