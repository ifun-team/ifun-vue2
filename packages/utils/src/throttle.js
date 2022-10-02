/**
 * 节流 - 在一段时间内只触发一次
 * 持续触发，周期性调用
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
function throttle(fn, delay) {
  let timer = null;

  return () => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn(...arguments);
      timer = null;
    }, delay);
  };
}

export default throttle;
