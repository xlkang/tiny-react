/**
 * 更新文本节点
 * @param {*} virtualDom 
 * @param {*} oldVirtualDOM 
 * @param {*} oldDOM 
 */
export default function updateTextNode(virtualDom, oldVirtualDOM, oldDOM) {
  if(virtualDom.props.textContent !== oldVirtualDOM.props.textContent) {
    // 更新真实dom
    oldDOM.textContent = virtualDom.props.textContent
    // 更新virtualDom
    oldDOM._virtualDOM = virtualDom
  }
}