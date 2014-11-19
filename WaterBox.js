/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-11-16 17:15:04
 * @version 0.0.1
 */

 var EventEmitter = require('events').EventEmitter;
 var util = require('util');
 var misc = require('./misc').global;
 var WaterRecycler = require('./WaterRecycler');

 function WaterBox(type){
  EventEmitter.call(this);

    this.type = type;   //水箱类型: A-0 B-1 C-2
    this.controller;
    this.amount = 0;    //水箱中的水量
    this.USEWATERFLAG = false;

    this.useWater = function(need){       //用水
      if(this.amount < need){
        while(this.amount < need){
          this.needWater();
          for(var i = 0; i < 1000000000; ++i){

          };     //单纯延时
        };
        this.useWater(need);
        return;
      };
      
      while(true){
        if(!this.USEWATERFLAG){
          this.USEWATERFLAG = true;
          break;    
        };
      };

      this.amount -= need;
      misc.io.emit('console', misc._box_name[type] + '水箱出水：' + need + '  剩余：' + this.amount);
      console.log();
      this.USEWATERFLAG = false;

      if(this.amount < misc._warning_amount){
        this.needWater();
      };

      misc.waterRecycler.recycleWater(Math.floor(need * Math.random()));    //用后排出的废水直接送往recycler
    };

    this.needWater = function(){                  //水不足
      var need = misc._max_amount - this.amount;
      misc._input_compare += need;          //对比参照
      misc.io.emit('console', misc._box_name[type] + '水箱缺水：');
      this.controller.getNeedWaterMessage(need, this.type);    //向控制器发送缺水请求
    };

    this.addWater = function(add){                //加水
      this.amount += add;
      misc.io.emit('console', misc._box_name[type] + '水箱加水：' + add + '  剩余：' + this.amount);
    };

  };

  util.inherits(WaterBox, EventEmitter);

  exports = module.exports = WaterBox;
