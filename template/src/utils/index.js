const utils = {

  /**
   * 阻止冒泡、默认动作
   * @param  {[type]} evt  [description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   *
   * DEMO: utils.returnFalse(1)
   *       utils.returnFalse(2)
   *       utils.returnFalse()
   */
  returnFalse: function(evt, type){
    type = type || 0;
    switch(parseInt(type, 10)){
        case 1:
            evt.stopPropagation();
        break;

        case 2:
            evt.preventDefault();
        break;

        default :
            evt.stopPropagation();
            evt.preventDefault();
        break;
    };
    return null;
  },

  /**
   * 判断 Object 是否为空
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  isEmptyObject: function(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }

      return true;
  },

  /**
   * 判断 Array 是否为空
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  isEmptyArray : function(value) {
	  return (Array.isArray(value) && value.length === 0)
	      || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
	},

	/**
	 * 判断元素是否为数组
	 * @param  {[type]}  arr [description]
	 * @return {Boolean}     [description]
	 */
	isArray(arr) {
    var ret = false;
    if (typeof Array.isArray) {
        ret = Array.isArray(arr);
    } else {
        ret = Object.prototype.toString.call(arr) === "[object Array]";
    }
    return ret;
	},

	/**
	 * 判断元素是否为对象
	 * @param  {[type]}  obj [description]
	 * @return {Boolean}     [description]
	 */
	isObject(obj) {
    var ret = false;
    if (!this.isEmptyObject(obj) && typeof obj === 'object' && obj instanceof Object && obj.constructor === Object) {
        ret = true
    }
    return ret;
	},

	/**
	 * 判断数组中是否含有指定元素
	 * @param  {Array} arr
	 * @param  {Objext} value
	 * @return {Array}
	 */
	_inArray(arr, value) {
		return Array.prototype.indexOf.call(arr, value) != -1
	},

	/**
	 * 判断数组是否包含指定元素
	 * @param  {[type]} array  [description]
	 * @param  {[type]} needle [description]
	 * @return {[type]}        [description]
	 */
	inArray(array,value){
		for (let i in array) {
	    if (array[i] == value) return true;
	  }
	  return false;
	},
	/**
	 * 在数组中查找某值，并返回key
	 * @param  {[type]} array [description]
	 * @param  {[type]} value [description]
	 * @return {[type]}       [description]
	 */
	findKeyByValue(array, value) {
    for (var k in array) {
        if(array[k]==value) return k;
    }
    return -1;
	},

	/**
	 * 数组删除指定的元素，并返回新数组
	 * @param  {Array} array
	 * @param  {String} value
	 * @return {Number}
	 */
	arrayRemove(array, value) {
		let index = array.indexOf(value)
		if (index >= 0) {
			array.splice(index, 1)
		}
		return array
	},

	/**
	 * 删除数组指定下标或指定对象
	 * @param  {[type]} array [description]
	 * @param  {[type]} value [description]
	 * @return {[type]}     [description]
	 */
	removeArrayByValue(array,value){
		for(var i =0;i <array.length;i++){
	    var temp = array[i];
	    if(!isNaN(value)){
	      temp=i;
	    }
	    if(temp == value){
	      for(var j = i;j <array.length;j++){
	        array[j]=array[j+1];
	      }
	      array.length = array.length-1;
	    }
	  }
	  return array
	},

	/**
	 * 数组去重
	 * @param  {[type]} array [description]
	 * @return {[type]}       [description]
	 */
	arrayUniq(array){
		return [...new Set(array)]
	},

	/**
	 * 合并数组
	 * @param  {[type]} arr1 [description]
	 * @param  {[type]} arr2 [description]
	 * @return {[type]}      [description]
	 */
	arrayConcat(arr1,arr2){
		return [...arr1, ...arr2]
	},

	/**
	 * 对象合并
	 * @param  {[type]} target [description]
	 * @param  {[type]} source [description]
	 * @return {[type]}        [description]
	 */
	mergeObject(target,...source){
		return Object.assign(target, ...source)
	},

  /**
   * js 加减乘除
   * @param  {[type]} arg1 数值1
   * @param  {[type]} op   操作符string 【+ - * /】
   * @param  {[type]} arg2 数值2
   * @return {[type]}      [description]
   *
   * DEMO: utils.calc(1,'*'1);
   */
  calc : function (arg1, op, arg2) {
        var ra = 1, rb = 1, m;

        try {
            ra = arg1.toString().split('.')[1].length;
        } catch (e) {
        }
        try {
            rb = arg2.toString().split('.')[1].length;
        } catch (e) {
        }
        m = Math.pow(10, Math.max(ra, rb));

        switch (op) {
            case '+':
            case '-':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                break;
            case '*':
                ra = Math.pow(10, ra);
                rb = Math.pow(10, rb);
                m = ra * rb;
                arg1 = Math.round(arg1 * ra);
                arg2 = Math.round(arg2 * rb);
                break;
            case '/':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                m = 1;
                break;
        }
        try {
            var result = eval('(' + '(' + arg1 + ')' + op + '(' + arg2 + ')' + ')/' + m);
        } catch (e) {
        }
        return result;
  },

  /**
   * 倒计时
   * @param format 时间格式 {%d}天{%h}时{%m}分{%s}秒{%f}毫秒
   * @param time 结束时间时间戳 毫秒
   * @param speed 速度
   * @param callback ret 倒计时结束回调函数 ret 时间字符 ；ret == '' 则倒计时结束
   *
   * DEMO: utils.countdown('{%d天}{%h时}{%m分}{%s秒}{%f毫秒}', Date.parse(new Date()) + 60000, 1000, function(ret){ console.log(ret)};
   */
  countdown : function (format, time, speed, callback) {
      var that = this;
      var timer = setInterval(function () {
          var l_time = time - new Date().getTime();
          if (l_time > 0) {
              callback(that.timestampTotime(format, l_time));
          } else {
              clearInterval(timer);
              typeof callback == 'function' && callback('');
          }
      }, speed);
  },

  /**
   * 日期格式化
   * @param format 日期格式 {%d天}{%h时}{%m分}{%s秒}{%f毫秒}
   * @param time 单位 毫秒
   *
   * DEMO: utils.timestampTotime('{%d天}',1495266776)
   */
  timestampTotime : function (format, time) {
    var t = {},
        floor = Math.floor;

    t.f = time % 1000;
    time = floor(time / 1000);
    t.s = time % 60;
    time = floor(time / 60);
    t.m = time % 60;
    time = floor(time / 60);
    t.h = time % 24;
    t.d = floor(time / 24);

    var ment = function (a) {
        if (a <= 0) {
            return '';
        }
        return '$1' + (a < 10 ? '0' + a : a) + '$2';
    };

    format = format.replace(/\{([^{]*?)%d(.*?)\}/g, ment(t.d));
    format = format.replace(/\{([^{]*?)%h(.*?)\}/g, ment(t.h));
    format = format.replace(/\{([^{]*?)%m(.*?)\}/g, ment(t.m));
    format = format.replace(/\{([^{]*?)%s(.*?)\}/g, ment(t.s));
    format = format.replace(/\{([^{]*?)%f(.*?)\}/g, ment(t.f));

    return format;
  },

  /**
   * 截取字符串
   * @param  {[type]} str [description]
   * @param  {[type]} len [description]
   * @return {[type]}     [description]
   */
  subString : function(str, len){
	  var newLength = 0;
	  var newStr = "";
	  var chineseRegex = /[^\x00-\xff]/g;
	  var singleChar = "";
	  var strLength = str.replace(chineseRegex,"**").length;
	  for(var i = 0;i < strLength;i++) {
	      singleChar = str.charAt(i).toString();
	      if(singleChar.match(chineseRegex) != null) {
	          newLength += 2;
	      } else  {
	          newLength++;
	      }
	      if(newLength > len) {
	          break;
	      }
	      newStr += singleChar;
	  }
	  return newStr;
	},

	/**
	 * 类型检测
	 * @param  {[type]} str  [description]
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	checkType (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'mobile':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]*$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        case 'array' :
        	return Array.isArray(str);
        case 'object':
        	return typeof str === 'object' && str instanceof Object && str.constructor === Object
        default :
            return true;
    }
	},

  /**
   * 序列化
   * @param value
   * @returns {string}
   */
  serialize: function (value) {
      if (typeof value === 'string') return value;
      return JSON.stringify(value);
  },

  /**
   * 反序列化
   * @param value
   * @returns {*}
   */
  deserialize: function (value) {
      if (typeof value !== 'string') return undefined;
      try {
          return JSON.parse(value);
      } catch (e) {
          return value || undefined;
      }
  },
}


export default utils;

