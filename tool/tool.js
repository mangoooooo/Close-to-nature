/**
 * 查看可视区域窗口的尺寸
*/
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}

/**
 * 滚动条的滚动距离
*/
function getScrollOffset() {
    if(window.pageXOffset || window.pageXOffset == 0) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset,
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}

/**
 * 获得变量类型
* 1. 分类：原始值、引用值   2. 区分应用值
* params: (target: 待查询变量)
*/
function getVarType(target) {
    var ret = typeof(target);
    var template = {
        '[object Array]': 'array-object',
        '[object String]': 'string-object',
        '[object Boolean]': 'boolean-object',
        '[object Number]': 'number-object',
        '[object Object]': 'object',
    };

    if (target == null) {
        return "null";
    }

    if (ret == 'object') {   //  引用值  数组、对象、包装类、null
        return template[Object.prototype.toString.call(target)];

    }

    //  原始值
    return ret;

}

/**
 * Array.prototype.sort callback用，用于数字的排序
* params: (prev: sort回调的第一个参数， next： sort第二个参数，mode： 1-升序(默认) 2-降序)
*/
function numSort(prev, next, mode) {
    mode = mode || 1; //  mode默认为1

    return mode == 1 ? (prev - next) : (next - prev)
}

/**
 * 继承：圣杯模式
* params: (Target: 需要继承者，Origin：继承源)
*/
function inherit(Target, Origin) {
    function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();

    Target.prototype.constructor = Target;  // 解决 constructor 混乱问题
    Target.prototype.uber = Origin.prototype; //  保留继承信息
}

/**
 * 返回字符串字节长度
* params: (str: 字符串)
*/
function bytesLength(str) {
    if (!str) {
        return 0;
    }

    str += '';
    var len   = str.length;
    var count = len;

    for(var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
            count++;
        }
    }

    return count;
}

/**
 * trim方法
*/
function trim(text) {
    return text == null ? "" : text.toString().replace(/^\s+|\s+$/, "")
}

/**
 * 获取计算好的csss属性
* params：（elem：dom元素，prop： 属性, pseudo： 伪元素）
*/
function getStyle(elem, prop, pseudo) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, pseudo ? pseudo : null)[prop]
    }

    return elem.currentStyle[prop]
}

/**
 * 通过class获取元素列表
 * @param {*父元素} parent 
 * @param {*类名} classname 
 */
function getEleByClass(parent, classname) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(classname)
    }

    var childEle = parent.getElementsByTagName('*');
    var rs = [];

    for (var i = 0, len = childEle.length; i < len; i ++) {
        var classArr = childEle[i].className ? childEle[i].className.split(' ') : 0
        if (!classArr) {
            break;
        }

        for (var j = 0, len2 = classArr.length; j < len2; j++) { 
            if (classname == classArr[j]) {
                rs.push(childEle[i]);
            }
        }
    }

    return rs;
}

/**
 * 为一个元素绑定多个事件处理函数
* params: (elem: 元素， type： 事件类型， handle：处理函数)
*/
function addEvent(elem, type, handle, capture) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, capture);

    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })

    } else {
        elem['on' + type] = handle;
    }
}

/**
 * 解除事件绑定
*/
function removeEvent(elem, type, handle) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handel, false);

    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, function () {
            handle.call(elem);
        })

    } else {
        elem['on' + type] = null;
    }
}

/**
 * 取消冒泡
*/
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancalBubble = true
    }
}

/**
 * 阻止默认事件
*/
function cancelDefaultHandler(event) {
    if (event.preventDefault) {
        event.preventDefault()
    } else {
        event.returnValue = false
    }
}

/**
 * 拖拽
*/
function drag(elem) {
    var disX,
        disY;

    addEvent(elem, 'mousedown', function (e) {
        var event = e || window.event;
        disX = event.pageX - parseInt(getStyle(elem, 'left'));
        disY = event.pageY - parseInt(getStyle(elem, 'top'));

        addEvent(document, 'mousemove', moveHandle);
        addEvent(document, 'mouseup', function (e) {
        removeEvent(document, 'mousemove', moveHandle)
        removeEvent(document, 'mouseup', moveHandle)
        })

        stopBubble(event);
        cancelDefaultHandler(event);

    })

    function moveHandle(e) {
        var event = e || window.event;

        elem.style.left = event.pageX - disX + 'px';
        elem.style.top  = event.pageY - disY + 'px';
    }
}

/**
 * 异步加载script 并 执行某种操作
* 使用： loadScript('xxx.js', function () {test()})
*/
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'complete' || script.readyState == "loaded") {
                callback();
            }
        }

    } else {
        script.onload = function () {
            callback();
        }

    }

    script.src = src;
    document.head.appendChild(script);  //  才会立即执行
}

/**
 * 将数字按size位用逗号分隔
*/
function splitNum(num, size) {
    var str = num + '';
    var reg = new RegExp(`(?=(\\B)(\\d{${size}})+$)`,'g');

    return str.replace(reg, ',');
}


/**
 * 深度克隆
 */
function clone(obj) {
    var o;
    switch (typeof obj) {
        case "undefined":
            break;
        case "string":
            o = obj + "";
            break;
        case "number":
            o = obj - 0;
            break;
        case "boolean":
            o = obj;
            break;
        case "object": // object 分为两种情况 对象（Object）或数组（Array）
            if (obj === null) {
                o = null;
            } else {
                if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;
    }
    return o;
}
