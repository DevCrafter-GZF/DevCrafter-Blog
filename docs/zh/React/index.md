# React 基础 <Badge type="tip" text="React" />

> [!TIP]
> 本教程基于 React 18+ 版本，使用函数组件和 Hooks 进行教学。

## 📋 学习大纲

| 章节 | 内容 | 难度 |
|------|------|------|
| [React 简介](#一-react-简介) | 特点、生态系统 | ⭐ |
| [环境准备](#二-环境准备) | Node.js、编辑器 | ⭐ |
| [创建项目](#三-创建-react-项目) | Vite、CRA | ⭐⭐ |
| [JSX 语法](#四-jsx-语法) | 模板语法规则 | ⭐⭐ |
| [组件](#五-组件) | 函数组件、类组件 | ⭐⭐ |
| [Props](#六-props) | 属性传递、类型检查 | ⭐⭐ |
| [State](#七-state) | useState、状态管理 | ⭐⭐⭐ |
| [事件处理](#八-事件处理) | 事件绑定、表单 | ⭐⭐ |
| [条件渲染](#九-条件渲染) | if、三元、逻辑与 | ⭐⭐ |
| [列表渲染](#十-列表渲染) | map、key | ⭐⭐ |
| [Effect](#十一-effect-hook) | useEffect、生命周期 | ⭐⭐⭐ |
| [Context](#十二-context) | 跨组件通信 | ⭐⭐⭐ |
| [Router](#十三-react-router) | 单页路由 | ⭐⭐⭐ |
| [Redux](#十四-redux-状态管理) | 全局状态管理 | ⭐⭐⭐ |

## 🎯 前置知识

学习 React 之前，建议先掌握：

- [HTML 基础](../HTML/index.md) - JSX 模板基础
- [CSS 基础](../CSS/index.md) - 样式处理
- [JavaScript 完全指南](../fundamentals/javascript.md) - ES6+ 语法、箭头函数、解构、模块化

## 🔄 React vs Vue

| 特性 | React | Vue |
|------|-------|-----|
| 开发方 | Meta (Facebook) | 社区 + 尤雨溪 |
| 模板语法 | JSX | 模板 + JSX |
| 学习曲线 | 中等 | 平缓 |
| 灵活性 | 高 | 中高 |
| 生态系统 | 极丰富 | 丰富 |
| 适用场景 | 大型应用 | 中小型应用 |
| 国内就业 | 多 | 多 |

## 🔗 相关文档

- [Vue 完全指南](../frameworks/vue.md) - 对比学习 Vue 2/3
- [Node.js 教程](../Node/index.md) - 全栈开发

## React 简介

React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook（现 Meta）开发和维护，并在 2013 年开源。

### React 的特点

| 特性 | 说明 |
|------|------|
| **组件化** | 将 UI 分解为独立的、可重用的组件 |
| **声明式编程** | 描述 UI 应该是什么样，而非手动操作 DOM |
| **虚拟 DOM** | 通过比较虚拟 DOM 找出最小变化，提高性能 |
| **单向数据流** | 数据通过 props 传递，流动清晰可预测 |
| **生态系统** | 庞大的社区，丰富的第三方库和工具 |

## 环境准备

### 1. Node.js 安装

确保已安装 Node.js（建议 14.x 以上版本）：

```bash
node -v
```

### 2. VS Code 插件

- **Simple React Snippets** - React 代码片段

## 创建 React 项目

### 使用 Vite 创建

```bash
# 创建项目
npm create vite@latest

# 按提示操作
# 1. 输入项目名称
# 2. 选择 React
# 3. 选择 TypeScript 或 JavaScript

# 进入项目并安装依赖
cd 项目名
npm install

# 启动开发服务器
npm run dev
```

### 使用 Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

## JSX 语法

### 什么是 JSX

JSX 是一种 JavaScript 语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。

### 基本用法

```jsx
// 绑定变量
const name = '张三';
const element = <h1>你好，{name}</h1>;

// 表达式
const element = <h1>1 + 1 = {1 + 1}</h1>;

// 条件渲染
const element = isLoggedIn ? <Dashboard /> : <Login />;

// 列表渲染
const list = items.map(item => <li key={item.id}>{item.name}</li>);
```

### JSX 规则

1. **只能返回一个根元素**

```jsx
// 正确
return (
    <div>
        <h1>标题</h1>
        <p>内容</p>
    </div>
);

// 或使用 Fragment
return (
    <>
        <h1>标题</h1>
        <p>内容</p>
    </>
);
```

2. **标签必须闭合**

```jsx
<img src="photo.jpg" alt="照片" />
<input type="text" />
```

3. **使用 className 代替 class**

```jsx
<div className="container">内容</div>
```

4. **使用 camelCase 属性名**

```jsx
<button onClick={handleClick}>点击</button>
<input readOnly={true} />
```

## 组件

### 函数组件

```jsx
// 基本组件
function Welcome(props) {
    return <h1>你好，{props.name}</h1>;
}

// 箭头函数组件
const Welcome = (props) => {
    return <h1>你好，{props.name}</h1>;
};

// 使用组件
<Welcome name="张三" />
```

### 类组件

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        return <h1>你好，{this.props.name}</h1>;
    }
}
```

## Props

### 传递 Props

```jsx
// 父组件
function App() {
    return (
        <UserCard 
            name="张三" 
            age={18} 
            isAdmin={true}
        />
    );
}

// 子组件
function UserCard(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>年龄：{props.age}</p>
            {props.isAdmin && <span>管理员</span>}
        </div>
    );
}

// 解构写法
function UserCard({ name, age, isAdmin }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>年龄：{age}</p>
            {isAdmin && <span>管理员</span>}
        </div>
    );
}
```

### Props 默认值

```jsx
function Button({ text = '默认文字', onClick }) {
    return <button onClick={onClick}>{text}</button>;
}
```

### Props 类型检查

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{age}</p>
        </div>
    );
}

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isAdmin: PropTypes.bool
};

UserCard.defaultProps = {
    age: 18,
    isAdmin: false
};
```

## State

### useState Hook

```jsx
import { useState } from 'react';

function Counter() {
    // 声明 state
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点击
            </button>
        </div>
    );
}
```

### 对象类型的 State

```jsx
function UserForm() {
    const [user, setUser] = useState({
        name: '',
        age: 0
    });
    
    const updateName = (e) => {
        setUser({
            ...user,  // 展开原有属性
            name: e.target.value
        });
    };
    
    return (
        <input 
            value={user.name} 
            onChange={updateName} 
        />
    );
}
```

### 数组类型的 State

```jsx
function TodoList() {
    const [todos, setTodos] = useState([]);
    
    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text }]);
    };
    
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => removeTodo(todo.id)}>
                        删除
                    </button>
                </li>
            ))}
        </ul>
    );
}
```

## 事件处理

### 绑定事件

```jsx
function Button() {
    const handleClick = () => {
        console.log('按钮被点击');
    };
    
    return <button onClick={handleClick}>点击</button>;
}

// 传参
function Button({ id }) {
    const handleClick = (e) => {
        console.log('ID:', id);
        console.log('事件对象:', e);
    };
    
    return <button onClick={handleClick}>点击</button>;
}

// 箭头函数传参
<button onClick={(e) => handleClick(id, e)}>点击</button>
```

### 表单事件

```jsx
function Form() {
    const [value, setValue] = useState('');
    
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('提交:', value);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={value} 
                onChange={handleChange} 
            />
            <button type="submit">提交</button>
        </form>
    );
}
```

## 条件渲染

### if 语句

```jsx
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <UserDashboard />;
    }
    return <Login />;
}
```

### 三元运算符

```jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? <UserDashboard /> : <Login />}
        </div>
    );
}
```

### 逻辑与运算符

```jsx
function Mailbox({ unreadMessages }) {
    return (
        <div>
            <h1>邮箱</h1>
            {unreadMessages.length > 0 && (
                <p>你有 {unreadMessages.length} 条未读消息</p>
            )}
        </div>
    );
}
```

## 列表渲染

### 基本列表

```jsx
function NumberList({ numbers }) {
    const listItems = numbers.map((number) => (
        <li key={number.toString()}>
            {number}
        </li>
    ));
    
    return <ul>{listItems}</ul>;
}

// 内联写法
function NumberList({ numbers }) {
    return (
        <ul>
            {numbers.map((number) => (
                <li key={number.toString()}>
                    {number}
                </li>
            ))}
        </ul>
    );
}
```

> **注意**：列表项必须设置唯一的 `key` 属性

## Effect Hook

### 基本用法

```jsx
import { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    // 每次渲染后执行
    useEffect(() => {
        document.title = `点击了 ${count} 次`;
    });
    
    return (
        <div>
            <p>点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点击
            </button>
        </div>
    );
}
```

### 依赖数组

```jsx
useEffect(() => {
    // 只在 count 变化时执行
    console.log('count 变化了:', count);
}, [count]);

useEffect(() => {
    // 只在组件挂载时执行
    console.log('组件挂载');
}, []);

useEffect(() => {
    // 每次渲染都执行
    console.log('每次渲染');
});
```

### 清理副作用

```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log('定时器');
    }, 1000);
    
    // 清理函数
    return () => {
        clearInterval(timer);
        console.log('清理定时器');
    };
}, []);
```

## Context

### 创建 Context

```jsx
// ThemeContext.js
import { createContext } from 'react';

const ThemeContext = createContext('light');

export default ThemeContext;
```

### 提供 Context

```jsx
import ThemeContext from './ThemeContext';

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}
```

### 消费 Context

```jsx
import { useContext } from 'react';
import ThemeContext from './ThemeContext';

function ThemedButton() {
    const theme = useContext(ThemeContext);
    
    return <button className={theme}>按钮</button>;
}
```

## React Router

### 安装

```bash
npm install react-router-dom
```

### 基本配置

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">首页</Link>
                <Link to="/about">关于</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### 路由参数

```jsx
import { useParams } from 'react-router-dom';

function User() {
    const { id } = useParams();
    return <div>用户 ID: {id}</div>;
}
```

### 编程式导航

```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        // 登录逻辑
        navigate('/dashboard');
    };
    
    return <button onClick={handleLogin}>登录</button>;
}
```

## Redux 状态管理

### 安装

```bash
npm install @reduxjs/toolkit react-redux
```

### 创建 Store

```javascript
// store/index.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});
```

### 使用 Redux

```jsx
// index.js
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// 组件中使用
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

function Counter() {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    
    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}
```
