/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-18 09:59:16
 * @version 0.0.1
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function WaterRecycler() {

	EventEmitter.call(this);

	this.amount = [0, 0, 0];		//净水系统A B C水箱的剩余水量，初始均为0
	this.GETWATERFLAG = [true, true, true];

	var _box_name = ['A', 'B', 'C'];	//水箱名

	this.recycleWater = function(input) {					//净化水，input为流入污水量
		var c = Math.floor(input * Math.random());
		var b = Math.floor(Math.random() * (input - c));
		var a = Math.floor(Math.random() * (input - c - b));
		var sewage = input - a - b - c;

		console.log('净化水：' + input);
		console.log('生成A类水：' + a);
		console.log('生成B类水：' + b);
		console.log('生成C类水：' + c);
		console.log('剩余污水：' + sewage);

		this.amount[0] += a;
		this.amount[1] += b;
		this.amount[2] += c;

		console.log('\nWater Recycler剩余水量：');
		console.log('A水箱：' + this.amount[0]);
		console.log('B水箱：' + this.amount[1]);
		console.log('C水箱：' + this.amount[2]);
	};

	this.getWater = function(need, type){		//x为需水量，type为需水类型: 0-A 1-B 2-C
		while(true){
			if(this.GETWATERFLAG[type]){
				this.GETWATERFLAG[type] = false;
				break;
			};
		};

		if(this.amount[type] >= need){
			this.amount[type] -= need;
			GETWATERFLAG[type] = true;
			console.log(this._box_name[i] + ‘水箱出水：’ + need);
			this.emit('enough');			//向controller发送水充足消息
			return;
		};

		need -= this.amount[type];
		console.log(this._box_name[i] + ‘水箱出水：’ + this.amount[type]);
		this.amount[type] = 0;
		GETWATERFLAG[type] = true;

		if(0 == type){
			this.emit('not_enough', need);	//向controller发送水不足消息，附带参数：还缺多少水
			return;
		};

		this.getWater(need, type-1);		//向较高优先级的的水箱要水
		
	};

};

util.inherits(WaterRecycler, EventEmitter);

exports = module.exports = WaterRecycler;