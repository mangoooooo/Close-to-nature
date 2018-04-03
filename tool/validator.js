/**
 * 固话校验
 */
function isTelephone (str) {
    return  /^([0-9]{3,4}([-\s])?)?[0-9]{7,8}$/.test(str);
}

/**
 * 移动电话校验
 */
function isMobile (str) {
    return  /^[1][3-9][0-9]{9}$/.test(str);
}

/**
 * 身份证号校验
 * @param {*} str 
 */
function isIDCard (str) {
    return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value);
}

/**
 * 是否为空值
 * @param {*} data 
 * @param {*0是否判定为空} ckeckZero 
 */
function isEmpty (data, ckeckZero) {
    if (ckeckZero == undefined) {
        ckeckZero = true;
    }

    //  原始值
    if (data == null || data == '' || data == undefined || (ckeckZero && data === 0)) {
        return true;
    }
    //  引用值
    for(var i in data) {
        return false;
    }

    return true;
}

/**
 * ip地址校验
 * @param ipaddress
 * @returns {boolean}
 * @constructor
 */
function ValidateIPaddress (ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}

/**
 * 当前环境是否支持webp格式的图片
 * @param successCallBack
 */
function supportWebP (successCallBack) {
    var isSupport = false

    const img = new Image()
    img.onload = function () {
        isSupport = true
        successCallBack && successCallBack(isSupport)
    }
    img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=='
}

/**
 * 邮箱校验
 * @param str
 * @returns {boolean}
 */
function isEmail (str) {
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    return reg.test(str)
}