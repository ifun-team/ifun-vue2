/**
 * 防抖 - 多次触发只执行一次
 * 持续触发，只执行最后一次的调用
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
function debounce(fn, delay) {
  let timer = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...arguments);
      timer = null;
    }, delay);
  };
}

export default debounce;
