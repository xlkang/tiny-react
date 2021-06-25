import diff from "./diff";

/**
 * 更新同一个组件
 * @param {*} virtualDOM 
 * @param {*} oldComponet 
 * @param {*} oldDOM 
 * @param {*} container 
 */
export default function updateComponent(
  virtualDOM, 
  oldComponet, 
  oldDOM, 
  container
) {
  oldComponet.componentWillReceiveProps(virtualDOM.props)
  if(oldComponet.shouldComponentUpdate(virtualDOM.props, oldComponet.state)){
    // 未更新前的props
    let prevProps = oldComponet.props;
    oldComponet.componentWillUpdate(virtualDOM.props);
    // 组件更新
    // 通过实例的updateProps更新实例的props
    oldComponet.updateProps(virtualDOM.props)
    // 获取组件返回的最新的virtualDOM
    let nextVirtualDOM = oldComponet.render();
    // 更新component 组件实例对象
    nextVirtualDOM.component = oldComponet
    // 比对
    diff(nextVirtualDOM, container, oldDOM)
    oldComponet.componentDidUpdate(prevProps)
  }
  
}