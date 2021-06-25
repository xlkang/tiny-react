import mountElement from "./mountElement"
import updateComponent from './updateComponent'

/**
 * 对比（类）组件并更新
 * 
 * @param {*} virtualDOM 
 * @param {*} oldComponet 
 * @param {*} oldDOM 
 * @param {*} container 
 */
export default function diffComponent(
  virtualDOM, 
  oldComponet, 
  oldDOM, 
  container
) {
  if(isSameComponent(virtualDOM, oldComponet)) {
    // 同一个组件 做组件更新操作
    console.log("同一个组件")
    updateComponent(virtualDOM, 
      oldComponet, 
      oldDOM, 
      container)
  } else {
    // 不同组件
    // 把新的更新上去
    mountElement(virtualDOM, container, oldDOM)
  }
}

// 判断是否是同一个组件（同一个构造函数）
// 显示virtualDOM.type保存了类组件的构造函数类型
function isSameComponent (virtualDOM, oldComponent) {
  // oldComponent实例的constructor可以表明组件的类型
  return oldComponent && virtualDOM.type === oldComponent.constructor
}