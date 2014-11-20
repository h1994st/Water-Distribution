/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-18 09:59:16
 * @version 0.0.1
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var misc = require('./misc').global;

function WaterRecycler() {
	EventEmitter.call(this);

	this.amount = [0, 0, 0];		//净水系统A B C水箱的剩余水量，初始均为0
	this.GETWATERFLAG = [false, false, false];

	this.recycleWater = function(input) {					//净化水，input为流入污水量
		var c = input * Math.random();
		var b = Math.random() * (input - c);
		var a = input - c - b;
		a = Math.floor(a);
		b = Math.floor(b);
		c = Math.floor(c);
		var sewage = input - a - b - c;

		misc.io.emit('console', 'Recycler Get: Waste water: ' + input + '   Output A: ' + a + ' B: '+ b + ' C: ' + c + ' sewage: ' + sewage);

		this.amount[0] += a;
		this.amount[1] += b;
		this.amount[2] += c;

		misc.io.emit('console', 'Recycler Remain: ' + 'A: ' + this.amount[0] + ' B: ' + this.amount[1] + ' C: ' + this.amount[2]);
	};

	this.getWater = function(need, type, controller, origin_type, origin_need){		//x为需水量，type为需水类型: 0-A 1-B 2-C
		while(true){
			if(!this.GETWATERFLAG[type]){
				this.GETWATERFLAG[type] = true;
				break;
			};
		};

		if(this.amount[type] >= need){
			this.amount[type] -= need;
			this.GETWATERFLAG[type] = false;
			misc.io.emit('console', 'Recycler Supplies: ' + misc._box_name[type] + ': ' + need);
			controller.getEnoughMessage(origin_need, origin_type);		//向controller发送水充足消息，附带参数：共加多少水，目的水的类型		
			return;
		};

		need -= this.amount[type];
		misc.io.emit('console', 'Recycler Supplies: '+ misc._box_name[type] + ': ' + this.amount[type]);
		this.amount[type] = 0;
		this.GETWATERFLAG[type] = false;

		if(0 == type){
			controller.getNotEnoughMessage(need, origin_need - need, origin_type)	//向controller发送水不足消息，附带参数：还缺多少水，共加多少水，目的水的类型
			return;
		};

		this.getWater(need, type-1, controller, origin_type, origin_need);		//向较高优先级的的水箱要水
		
	};

};

util.inherits(WaterRecycler, EventEmitter);

exports = module.exports = WaterRecycler;