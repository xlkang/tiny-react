/**
 * 创建Virtual Dom
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 * @returns 
 */
export default function createElement (type, props, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    if(child !== false && child !== true && child !== null) {
      // 过滤空值
      if (child instanceof Object) {
        result.push(child) 
      } else {
        // 文本节点
        // 文本放入 props.textContent
        result.push(createElement("text", { textContent: child }, null)) 
      }
    }
    return result
  }, [])

  return {
    type,
    // 把children属性合并进props --> props.children
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
}