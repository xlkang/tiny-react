import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

/**
 * 渲染组件
 */
export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextvirtualDOM = null
  let component = null
  /**
   * 判断类组件和函数组件
   */ 
  if(isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextvirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextvirtualDOM = buildClassComponent(virtualDOM)
    component = nextvirtualDOM.component;
  }

  // 递归分支
  if(isFunction(nextvirtualDOM)) {
    mountComponent(nextvirtualDOM, container, oldDOM)
  } else {
    mountNativeElement(nextvirtualDOM, container, oldDOM)
  }

  // 处理类组件的ref
  if(component) {
    component.componentDidMount();
    // component不为空说明是类组件
    if(component.props && component.props.ref) {
      component.props.ref(component)
    }
  }
}

function buildFunctionComponent(virtualDOM) {
  // type存储的是函数组件本身
  // 传入props参数
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  // 类组件实例
  const component = new virtualDOM.type(virtualDOM.props || props)
  // 调用render方法
  const nextvirtualDOM =  component.render()
  // 把组件的实例对象挂在nextvirtualDOM上！！
  nextvirtualDOM.component = component
  return nextvirtualDOM;
}