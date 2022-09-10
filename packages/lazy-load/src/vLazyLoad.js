/**
 * 定义懒加载数据列表的指令
 * 可通过滚动懒加载来减少一次性渲染大量数据的性能卡顿
 */
import { throttle } from "lodash-es";

export default {
  /**
   * el - 指令所绑定的元素DOM
   * binding - 传入指令的其他附带参数
   *    name - 指令名
   *    value  - 指令绑定的值
   *    oldValue - 绑定的前一个值
   *    expression - 指令绑定的字符串形式的表达式
   *    arg - 传给指令的参数
   *    modifiers - 指令修饰符的对象
   * vnode
   * oldVnode
   */
  inserted: (el, binding) => {
    // 获取scroll 滚动的容器元素,由参数传入
    // 如果没有传入,则默认绑定指令的元素自己
    // 获取懒加载处理函数 , 以及其他参数
    const { loadData, distance, scrollBody, callback } = binding.value;
    let scrollContainer = el;
    if (scrollBody) {
      scrollContainer = el.querySelector(scrollBody) || el;
    }

    // 滚动事件监听
    const scroll = throttle(
      handleScroll.bind(null, scrollContainer, { distance, loadData }),
      500
    );
    scrollContainer.addEventListener("scroll", scroll);

    // 回调时 返回事件销毁函数
    let fn = () => {
      scrollContainer.removeEventListener("scroll", scroll);
    };
    callback(fn);
  },
};
/**
 * 处理容器滚动事件 ; 滚动到底部时,执行处理函数
 * @param dom
 * @param option
 */
function handleScroll(dom, option) {
  //
  const scrollBottom = dom.scrollTop + dom.clientHeight;

  if (dom.scrollHeight - scrollBottom <= option.distance) {
    // 数据加载
    option.loadData();
  }
}
