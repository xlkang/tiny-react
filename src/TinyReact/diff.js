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
    // virtualDOM.children.forEach((child, idx) => {
    //   diff(child, oldDOM, oldDOM.childNodes[idx])
    // })

    // 1. 将有key属性的子元素放置在一个单独的对象中
    let keyedElements = {}
    for(let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      if(domElement.nodeType === 1) {
        // 元素节点
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0

    if(hasNoKey) {
      // 对比子节点
      // 递归对比 Virtual DOM 的子元素
      // 深度优先： 子节点优先于同级节点
      virtualDOM.children.forEach((child, idx) => {
        diff(child, oldDOM, oldDOM.childNodes[idx])
      })
    } else {
      // 2. 循环virtualDOM 的子元素，获取子元素的key属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 3.看看当前位置的元素是不是我们期望的元素
            if(oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 同一个父级下
    // 子节点比对完成后
    // 开始删除节点
    let oldChildNodes = oldDOM.childNodes

    if(oldChildNodes.length > virtualDOM.children.length) {
      // 判断有节点需要被删除
      if(hasNoKey) {
        // 没有带key的子元素
        // 倒序循环oldChildNodes来删除
        for(
          let i = oldChildNodes.length - 1;
          i > virtualDOM.children.length - 1;
          i--
        ) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过key属性删除节点
        for(let i=0;i<oldChildNodes.length;i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false;

          for(let n = 0; n < virtualDOM.children.length;n++) {
            if(oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          if(!found) {
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}