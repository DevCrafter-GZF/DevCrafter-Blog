# React Basics <Badge type="tip" text="React 18" />

> [!TIP]
> React is a JavaScript library for building user interfaces, developed by Facebook. It uses component-based development and virtual DOM technology.

## 📋 Learning Outline

| Chapter | Content | Difficulty |
|---------|---------|------------|
| [Introduction](#introduction) | What is React, features | ⭐ |
| [JSX](#jsx) | JSX syntax | ⭐⭐ |
| [Components](#components) | Function components, class components | ⭐⭐ |
| [Props](#props) | Component communication | ⭐⭐ |
| [State](#state) | Component state | ⭐⭐ |
| [Lifecycle](#lifecycle) | Component lifecycle | ⭐⭐⭐ |
| [Hooks](#hooks) | useState, useEffect, etc. | ⭐⭐⭐ |
| [Event Handling](#event-handling) | Event binding | ⭐⭐ |
| [Conditional Rendering](#conditional-rendering) | Conditional display | ⭐⭐ |
| [List Rendering](#list-rendering) | List display | ⭐⭐ |
| [Forms](#forms) | Form handling | ⭐⭐ |
| [Router](#router) | React Router | ⭐⭐⭐ |

## 🎯 Learning Goals

After completing this tutorial, you will be able to:

- ✅ Understand React core concepts and features
- ✅ Use JSX syntax
- ✅ Create and use components
- ✅ Manage component state
- ✅ Use Hooks for state and side effects
- ✅ Implement page routing

## 🔗 Related Documents

- [JavaScript Complete Guide](../fundamentals/javascript.md) - JS foundation
- [Vue Complete Guide](../frameworks/vue.md) - Comparison with Vue
- [Project Cases](../Projects/index.md) - React application examples


## Introduction

### What is React

React is a JavaScript library for building user interfaces, developed by Facebook (now Meta) in 2013.

### Core Features

- **Component-based**: Build UIs with independent, reusable components
- **Virtual DOM**: Efficient DOM updates through virtual DOM comparison
- **Unidirectional data flow**: Data flows from parent to child components
- **Declarative**: Describe UI state, React handles updates
- **JSX**: JavaScript XML syntax extension

### Create React App

```bash
# Using create-react-app
npx create-react-app my-app
cd my-app
npm start

# Using Vite (recommended)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## JSX

### What is JSX

JSX is a JavaScript syntax extension that looks similar to HTML.

```jsx
// JSX example
const element = <h1>Hello, React!</h1>;

// Embedding expressions
const name = 'React';
const element = <h1>Hello, {name}!</h1>;

// Function call
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const element = <h1>Hello, {formatName(user)}!</h1>;
```

### JSX Rules

```jsx
// Must have one root element
const element = (
    <div>
        <h1>Title</h1>
        <p>Content</p>
    </div>
);

// Or use fragment
const element = (
    <>
        <h1>Title</h1>
        <p>Content</p>
    </>
);

// Use className instead of class
const element = <div className="container">Content</div>;

// Use camelCase for attributes
const element = <button onClick={handleClick}>Click</button>;

// Self-closing tags must end with />
const element = <img src="photo.jpg" alt="Photo" />;
```

## Components

### Function Components

```jsx
// Basic function component
function Welcome() {
    return <h1>Hello, React!</h1>;
}

// With props
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Welcome = (props) => {
    return <h1>Hello, {props.name}!</h1>;
};

// Use component
function App() {
    return (
        <div>
            <Welcome name="Tom" />
            <Welcome name="Jerry" />
        </div>
    );
}
```

### Class Components

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

export default Welcome;
```

## Props

### Passing Props

```jsx
// Parent component
function App() {
    return (
        <div>
            <UserInfo 
                name="Tom" 
                age={25} 
                isAdmin={true}
                hobbies={['reading', 'gaming']}
            />
        </div>
    );
}

// Child component
function UserInfo(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Age: {props.age}</p>
            <p>Admin: {props.isAdmin ? 'Yes' : 'No'}</p>
            <ul>
                {props.hobbies.map(hobby => (
                    <li key={hobby}>{hobby}</li>
                ))}
            </ul>
        </div>
    );
}

// Destructure props
function UserInfo({ name, age, isAdmin, hobbies }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
        </div>
    );
}
```

### Default Props

```jsx
function Welcome({ name = 'Guest' }) {
    return <h1>Hello, {name}!</h1>;
}

// Or
Welcome.defaultProps = {
    name: 'Guest'
};
```

## State

### useState Hook

```jsx
import { useState } from 'react';

function Counter() {
    // Declare state variable
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
        </div>
    );
}
```

### Multiple State Variables

```jsx
function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    
    return (
        <form>
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input 
                type="number"
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Age"
            />
        </form>
    );
}

// Or use object state
function UserForm() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };
    
    return (
        <form>
            <input 
                name="name"
                value={user.name} 
                onChange={handleChange}
                placeholder="Name"
            />
            <input 
                name="email"
                value={user.email} 
                onChange={handleChange}
                placeholder="Email"
            />
        </form>
    );
}
```

## Lifecycle

### Class Component Lifecycle

```jsx
import React, { Component } from 'react';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        console.log('Constructor');
    }
    
    componentDidMount() {
        console.log('Component did mount');
        // Good for: API calls, subscriptions
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log('Component did update');
        // Good for: Responding to prop or state changes
    }
    
    componentWillUnmount() {
        console.log('Component will unmount');
        // Good for: Cleanup, unsubscribe
    }
    
    render() {
        console.log('Render');
        return <div>{this.state.count}</div>;
    }
}
```

## Hooks

### useEffect

```jsx
import { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    // Run after every render
    useEffect(() => {
        document.title = `Count: ${count}`;
    });
    
    // Run only once (componentDidMount)
    useEffect(() => {
        console.log('Component mounted');
    }, []);
    
    // Run when count changes
    useEffect(() => {
        console.log('Count changed:', count);
    }, [count]);
    
    // Cleanup (componentWillUnmount)
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Tick');
        }, 1000);
        
        return () => {
            clearInterval(timer);
            console.log('Cleanup');
        };
    }, []);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Add
            </button>
        </div>
    );
}
```

### Other Common Hooks

```jsx
import { useRef, useContext, useReducer, useMemo, useCallback } from 'react';

// useRef - Access DOM or persist values
function TextInput() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus</button>
        </>
    );
}

// useContext - Access context
const ThemeContext = React.createContext('light');

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return <button className={theme}>Click</button>;
}

// useReducer - Complex state logic
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    );
}
```

## Event Handling

```jsx
function Button() {
    // Event handler
    const handleClick = () => {
        console.log('Button clicked');
    };
    
    // With parameters
    const handleClick = (name) => {
        console.log(`Hello, ${name}`);
    };
    
    return (
        <div>
            {/* Without parameters */}
            <button onClick={handleClick}>Click</button>
            
            {/* With parameters - use arrow function */}
            <button onClick={() => handleClick('Tom')}>
                Greet
            </button>
            
            {/* Access event object */}
            <button onClick={(e) => {
                e.preventDefault();
                console.log('Clicked');
            }}>
                Click
            </button>
        </div>
    );
}
```

## Conditional Rendering

```jsx
function Greeting({ isLoggedIn }) {
    // if statement
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    }
    return <h1>Please sign in.</h1>;
}

// Ternary operator
function Greeting({ isLoggedIn }) {
    return (
        <h1>
            {isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
        </h1>
    );
}

// Logical AND
function Mailbox({ unreadMessages }) {
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 && (
                <p>You have {unreadMessages.length} unread messages.</p>
            )}
        </div>
    );
}
```

## List Rendering

```jsx
function NumberList({ numbers }) {
    // Map to create list
    const listItems = numbers.map((number) => (
        <li key={number.toString()}>
            {number}
        </li>
    ));
    
    return <ul>{listItems}</ul>;
}

// Inline
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

// With index (not recommended if order changes)
function NumberList({ numbers }) {
    return (
        <ul>
            {numbers.map((number, index) => (
                <li key={index}>
                    {number}
                </li>
            ))}
        </ul>
    );
}
```

## Forms

### Controlled Components

```jsx
function NameForm() {
    const [value, setValue] = useState('');
    
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Name: ' + value);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type="text" 
                    value={value} 
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

// Textarea
function EssayForm() {
    const [essay, setEssay] = useState('');
    
    return (
        <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
        />
    );
}

// Select
function FlavorForm() {
    const [flavor, setFlavor] = useState('coconut');
    
    return (
        <select 
            value={flavor} 
            onChange={(e) => setFlavor(e.target.value)}
        >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
        </select>
    );
}
```

## Router

### Installation

```bash
npm install react-router-dom
```

### Basic Usage

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### Route Parameters

```jsx
import { useParams, useNavigate } from 'react-router-dom';

function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>User ID: {id}</h1>
            <button onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
}
```

### Navigation

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleLogin = () => {
        // Login logic
        navigate('/dashboard', { replace: true });
    };
    
    return <button onClick={handleLogin}>Login</button>;
}
```
