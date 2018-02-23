/**
 * 固话校验
 */
function isTelephone (str) {
    return  /^([0-9]{3,4}[-\\s])?[0-9]{7,8}$/.test(str);
}

/**
 * 移动电话校验
 */
function isMobile (str) {
    return  /^[1][34578][0-9]{9}$/.test(str);
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