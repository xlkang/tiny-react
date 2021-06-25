import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

/**
 * 比较新旧virtualDOM
 * 
 * 深度优先： 子节点优先于同级节点
 * 
 * @param {*} virtualDOM 虚拟dom
 * @param {*} container 容器dom
 * @param {*} oldDOM virtualDOM对应的old真实dom
 */
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // buildClassComponent中挂上去的！！
  const oldComponet = oldVirtualDOM && oldVirtualDOM.component
  
  /** 判断oldDOM是否存在 */
  if(!oldDOM) {
    // oldDOM不存在，首次挂载
    mountElement(virtualDOM, container)
  } else if(
    // 如果要对比的两个节点类型不相同
    virtualDOM.type !== oldVirtualDOM.type && 
    // 并且节点的类型不是组件，因为组件要单独处理
    typeof virtualDOM.type !== "function"
  ) {
    // 如果元素类型不同的话，直接用新的dom替换掉旧的dom
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if(typeof virtualDOM.type === "function"){
    // 组件
    diffComponent(virtualDOM, oldComponet, oldDOM, container)
  } else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 元素类型相同
    
    if(virtualDOM.type === "text") {
      // 如果是文本类型, 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 递归对比 Virtual DOM 的子元素
    // 深度优先： 子节点优先于同级节点
    virtualDOM.children.forEach((child, idx) => {
      diff(child, oldDOM, oldDOM.childNodes[idx])
    })

    // 同一个父级下
    // 子节点比对完成后
    // 开始删除节点
    let oldChildNodes = oldDOM.childNodes

    if(oldChildNodes.length > virtualDOM.children.length) {
      // 判断有节点需要被删除
      // 倒序循环oldChildNodes来删除
      for(
        let i = oldChildNodes.length - 1;
        i > virtualDOM.children.length - 1;
        i--
      ) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}