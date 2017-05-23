var noop = function noop () {};
var now = function now () {
    return new Date().getTime();
}
exports.extend = function extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < sources.length; i += 1) {
        var source = sources[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
exports.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    // 据上一次触发时间间隔
    var last = now() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

exports.confirm = function confirm(options, cbSuccess, cbFail, cbComplete) {
    cbSuccess = typeof cbSuccess == "function" ? cbSuccess : noop;
    cbFail = typeof cbFail == "function" ? cbFail : noop;
    cbComplete = typeof cbComplete == "function" ? cbComplete : noop;
    options = typeof options == "object" ? options : {
        title: "提示",
        content: options || "",
        success: cbSuccess,
        fail: cbFail
    }
    wx.showModal(options);
}

exports.alert = function alert(content) {
    wx.showModal({
        title: "提示",
        content: content,
        showCancel: false
    });
}