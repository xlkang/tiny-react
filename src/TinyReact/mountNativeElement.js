import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
/**
 * 将virtualDOM转换为真实dom
 * @param {*} virtualDOM 
 * @param {*} container 
 */
export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  
  // 将转换之后的DOM对象放置在container中
  if(oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    
    container.appendChild(newElement)
  }
  
  // 如果旧的dom存在，删除
  if(oldDOM) unmountNode(oldDOM)

  // 如果是类组件，把
  let component = virtualDOM.component
  if(component) {
    component.setDOM(newElement)
  }
}