/**
 * 判断是不是组件
 * 
 * 组件的type是函数，原声dom的type是字符串 比如 input啥的
 */
export default function isFunction (virtualDom) {
  return virtualDom && typeof virtualDom.type === "function"
}