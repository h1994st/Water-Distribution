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
		var c = Math.floor(input * Math.random());
		var b = Math.floor(Math.random() * (input - c));
		var a = Math.floor(Math.random() * (input - c - b));
		var sewage = input - a - b - c;

		misc.io.emit('console', '净化水：' + input + '\n生成A类水：' + a + '\n生成B类水：'+ b + '\n生成C类水：' + c + '\n剩余污水：' + sewage);

		this.amount[0] += a;
		this.amount[1] += b;
		this.amount[2] += c;

		misc.io.emit('console', 'Water Recycler剩余水量：' + '\nA水箱：' + this.amount[0] + '\nB水箱：' + this.amount[1] + '\nC水箱：' + this.amount[2]);
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
			misc.io.emit('console', misc._box_name[i] + '水箱出水：' + need);
			controller.getEnoughMessage(origin_need, origin_type);		//向controller发送水充足消息，附带参数：共加多少水，目的水的类型		
			return;
		};

		need -= this.amount[type];
		misc.io.emit('console', misc._box_name[type] + '水箱出水：' + this.amount[type]);
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