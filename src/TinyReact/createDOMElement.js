
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement (virtualDOM) {
  let newElement = null
  if(virtualDOM.type === "text") {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    updateNodeElement(newElement, virtualDOM)
  }

  // 保存旧的virtualDOM
  newElement._virtualDOM = virtualDOM
  
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    // child 子节点的virtualDOM
    // 注意这里是mountElement！！
    mountElement(child, newElement)
  })

  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  return newElement
}