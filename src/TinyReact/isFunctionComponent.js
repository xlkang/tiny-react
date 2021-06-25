import isFunction from "./isFunction"

/**
 * 原型对象上没有render方法则是函数组件
 */
export default function isFunctionComponent(virtualDom) {
  const type = virtualDom.type
  return type && isFunction(virtualDom) && !(type.prototype && type.prototype.render)
}