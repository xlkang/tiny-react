import isFunction from './isFunction'
import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
/**
 * 挂在虚拟dom
 */
export default function mountElement(virtualDom, container, oldDOM) {
  // Component VS NativeElement
  
  if (isFunction(virtualDom)) {
    // Component 
    mountComponent(virtualDom, container, oldDOM)
  } else {
    // NativeElement
    mountNativeElement(virtualDom, container, oldDOM)
  }
}