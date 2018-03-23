/**
* 实现insertAfter()
*/
Element.prototype.insertAfter = function(target, after) {
    var afterNode = after && after.nextElementSibling || null;
    this.insertBefore(target, afterNode);
}

/**
 * 数组去重
*/
Array.prototype.unique = function () {
    if (typeof Set == 'function') {
        return Array.from(new Set(this))
    }
    
    var arr = [];
    var obj = {};
    var len = this.length;
    
    for (var i = 0; i < len; i++) {
        var j = this[i];
        var type = typeof j;

        if (!(obj[j + type])) {
            obj[j + type] = j;
            arr.push(j);
        }
    }

    return arr;

}

/**
 * 不管reject还是resolve 都能在Promise.almost([..]).then(values => {}) 中获取
 * Promise.almost = r => Promise.all(r.map(p => p.catch ? p.catch(e => e) : p));
  */
if (Promise) {
    Promise.prototype.almost = function (r) {
        return Promise.all(r.map(function (p) {
            if (p.catch) {
                return p.catch(function (e) {
                    return e
                })
            }

            return p
        }))
    }
}