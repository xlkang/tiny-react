import diff from './diff'

export default class Component {
  constructor(props) {
    this.props = props;
  }

  setState(state) {
    // 毫无疑问，this指向子类实例对象
    this.state = Object.assign({}, this.state, state)
    // 调用实例的render得到新的virtualDOM
    let virtualDOM = this.render()
    // 获取旧的 virtualDOM 对象进行比对
    // 上一次渲染的时候 在mountNativeElement中setDOM上去的
    let oldDOM = this.getDOM();
    // 实现对比
    diff(virtualDOM, oldDOM.parentNode, oldDOM)
  }
  setDOM(dom) {
    this._dom = dom
  }
  getDOM() {
    return this._dom
  }
  // 更新组件实例的props
  updateProps (props) {
    this.props = props
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}
}