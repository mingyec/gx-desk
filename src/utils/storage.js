/**
 * @description 存入缓存
 * @param {string} key 标识符
 * @param {*} config 值
 */
let set = function(key, config) {
    //如果是json对象则转为json字符串
    if (typeof config === 'object') {
        config = JSON.stringify(config);
    }
    sessionStorage.setItem(key,config);
}

/**
 * @desc 从缓存中获取
 * @param {string} key 标识符
 * @param {boolean} isParse 是否序列化？默认为否
 */
let get = function(key, isParse = false) {
    let value = sessionStorage.getItem(key);
    if(isParse) {
        return JSON.parse(value);
    }else {
        return value;
    }
}

/**
 * @description 移除
 * @param {string} key
 */
let remove = function(key) {
    sessionStorage.removeItem(key);
}

//清除所有缓存
let clear = function() {
    sessionStorage.clear();
}

const storage = {
    set: set,
    get: get,
    remove: remove,
    clear: clear
}

export {
    storage
}
