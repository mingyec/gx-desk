let timer = null;

/**
 * @param {function} fn 要执行的函数
 * @param {number} delay 延迟执行时间
 */
function debounce(fn, delay) {
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}

const color = {
    A: '',
    B: '',
    C: '',
    a: '',
    b: '',
    c: '',
    info: ''
}
export { debounce, color }
