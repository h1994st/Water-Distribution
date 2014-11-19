var _box_name = ['A', 'B', 'C'];	//水箱名
var _input = 0;						//总用水量（从水厂进的水）
var _input_compare = 0;				//对比总水量值（若净水循环系统不存在）
var _max_amount = 100;				//水箱最大容量
var _warning_amount = 10;			//水箱警戒值
var _init_amount = 0;				//水箱初始值
	

exports.global = {
	_box_name : _box_name,
	_input : _input,
	_input_compare : _input_compare,
	_max_amount : _max_amount,
	_warning_amount : _warning_amount,
	_init_amount : _init_amount
};