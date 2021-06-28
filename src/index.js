import TinyReact from "./TinyReact"

const root = document.getElementById("root");

/**
 * 被转换成了TinyReact.createElement
 */
const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    {/* <span>这是一被修改过的段内容</span> */}
    <button onClick={() => alert("你好!!!!!!")}>点击我</button>
    {/* <h6>这个将会被删除</h6> */}
    {/* 2, 3 */}
    <input type="text" value="13" />
  </div>
)

// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000)

function Demo () {
  return <div>Hello</div>
}

function Heart(props) {
  return <div>{props.title} &hearts; <Demo /></div>
}

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log(this.input.value)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount===")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={this.handleClick}>按钮</button>
        <Alert ref={alert=> this.alert=alert} name="十三水" age={20} />
      </div>
    )
  }
}

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      title: "Default Title"
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ title: "Changed Title" })
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps==", nextProps)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate===", nextProps, nextState)
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate")
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate")
  }
  componentWillUnmount() {}

  render () {
    console.log(this.state)
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <div>
          {this.state.title}
          <button onClick={this.handleClick}>修改title</button>
        </div>
      </div>
    )
  }
}

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { id: 1, name: "张三" },
        { id: 2, name: "王武" },
        { id: 3, name: "里斯" },
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 100, name: '赵刚' })
    newState.persons.pop()
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

// TinyReact.render(<Heart title="Hello React" />, root)
// TinyReact.render(<Alert name="张三" age={20}/>, root)
// TinyReact.render(<DemoRef />, root)
TinyReact.render(<KeyDemo />, root)

// setTimeout(() => {
//   TinyReact.render(<Alert name="李四" age={50}/>, root)
// }, 2000)

// setTimeout(() => {
//   TinyReact.render(<Heart title="Hello React" />, root)
// }, 2000)
// console.log(virtualDOM)