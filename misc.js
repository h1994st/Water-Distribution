var _box_name = ['A', 'B', 'C'];	//水箱名
var _max_amount = 400;				//水箱最大容量
var _warning_amount = 100;			//水箱警戒值
var _init_amount = 300;				//水箱初始值
var _getwater_amount = 300;			//水箱每次请求调水量
var _input = _init_amount * 3;		//总用水量（从水厂进的水）
var _input_compare = 0;				//对比总水量值（若净水循环系统不存在）

var _random_amount = 50;				//水箱每次随机取水值上限
var _time = 500;					//水箱每次动作间隔
	

exports.global = {
	_box_name : _box_name,
	_input : _input,
	_input_compare : _input_compare,
	_max_amount : _max_amount,
	_warning_amount : _warning_amount,
	_init_amount : _init_amount,
	_getwater_amount : _getwater_amount,
	_random_amount : _random_amount,
	_time : _time
};