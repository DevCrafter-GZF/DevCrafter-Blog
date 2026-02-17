# JavaScript 完全指南 <Badge type="tip" text="ES6+" />

> [!TIP]
> 本指南涵盖 JavaScript 从基础到高级的全部内容，包括 ES6+ 新特性和现代开发实践。

## 📋 内容导航

| 章节 | 内容 | 难度 |
|------|------|------|
| [基础语法](#一-基础语法) | 变量、数据类型、运算符 | ⭐ |
| [流程控制](#二-流程控制) | 条件、循环、异常处理 | ⭐ |
| [函数与作用域](#三-函数与作用域) | 函数定义、闭包、this | ⭐⭐ |
| [对象与数组](#四-对象与数组) | 对象操作、数组方法 | ⭐⭐ |
| [ES6+ 新特性](#五-es6-新特性) | let/const、箭头函数、解构 | ⭐⭐ |
| [异步编程](#六-异步编程) | Promise、async/await | ⭐⭐⭐ |
| [面向对象](#七-面向对象) | Class、继承、原型链 | ⭐⭐⭐ |
| [模块化](#八-模块化) | import/export、模块系统 | ⭐⭐ |
| [进阶主题](#九-进阶主题) | 事件循环、内存管理、设计模式 | ⭐⭐⭐ |


## 基础语法

### 1.1 变量声明

```javascript
// var - 函数作用域，可重复声明（不推荐）
var name = '张三';

// let - 块级作用域，可重新赋值
let age = 18;
age = 19;

// const - 块级作用域，不可重新赋值
const PI = 3.14159;
// PI = 3.14; // 错误！

// const 对象可以修改属性
const user = { name: '张三' };
user.name = '李四'; // 可以
// user = {}; // 错误！
```

### 1.2 数据类型

```javascript
// 基本数据类型（值类型）
let str = '字符串';      // String
let num = 123;           // Number
let bool = true;         // Boolean
let n = null;            // Null
let u = undefined;       // Undefined
let sym = Symbol('sym'); // Symbol (ES6)
let big = 9007199254740991n; // BigInt (ES2020)

// 引用数据类型
let obj = { name: '张三' };     // Object
let arr = [1, 2, 3];            // Array
let fn = function() {};         // Function
let date = new Date();          // Date
let reg = /abc/g;               // RegExp

// 类型检测
typeof 'hello';      // 'string'
typeof 123;          // 'number'
typeof true;         // 'boolean'
typeof undefined;    // 'undefined'
typeof Symbol();     // 'symbol'
typeof 123n;         // 'bigint'
typeof {};           // 'object'
typeof [];           // 'object'
typeof null;         // 'object' (历史bug)
typeof function(){}; // 'function'

// 数组检测
Array.isArray([]);   // true
```

### 1.3 类型转换

```javascript
// 显式转换
String(123);         // '123'
Number('123');       // 123
Number('abc');       // NaN
Boolean(1);          // true
Boolean(0);          // false
Boolean('');         // false
Boolean('hello');    // true

// 隐式转换（注意坑）
'5' + 3;             // '53' (字符串拼接)
'5' - 3;             // 2 (数字运算)
'5' * '3';           // 15
[] + [];             // ''
[] + {};             // '[object Object]'
{} + [];             // 0 (或 '[object Object]'，取决于上下文)
```

### 1.4 运算符

```javascript
// 算术运算符
+  -  *  /  %  **  ++  --

// 比较运算符
==   // 松散相等（类型转换后比较）
===  // 严格相等（推荐）
!=   // 松散不等
!==  // 严格不等
> < >= <=

// 逻辑运算符
&&   // 与（短路求值）
||   // 或（短路求值）
!    // 非
??   // 空值合并 (ES2020)

// 赋值运算符
=  +=  -=  *=  /=  %=

// 三元运算符
const result = age >= 18 ? '成年' : '未成年';

// 可选链 (ES2020)
const city = user?.address?.city;

// 空值合并 (ES2020)
const value = input ?? '默认值';
```


## 流程控制

### 2.1 条件语句

```javascript
// if...else
const score = 85;
if (score >= 90) {
  console.log('优秀');
} else if (score >= 80) {
  console.log('良好');
} else if (score >= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}

// switch
const day = 1;
switch (day) {
  case 1:
    console.log('周一');
    break;
  case 2:
    console.log('周二');
    break;
  default:
    console.log('其他');
}

// 三元运算符
const type = age >= 18 ? 'adult' : 'minor';
```

### 2.2 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while 循环
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do...while
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// for...of - 遍历可迭代对象（推荐）
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}

// for...in - 遍历对象属性
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}

// 循环控制
break;      // 跳出整个循环
continue;   // 跳过当前迭代
```

### 2.3 异常处理

```javascript
try {
  // 可能抛出异常的代码
  const result = riskyOperation();
} catch (error) {
  // 处理异常
  console.error('Error:', error.message);
} finally {
  // 无论是否异常都会执行
  console.log('Cleanup');
}

// 自定义异常
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}
```


## 函数与作用域

### 3.1 函数定义

```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}`;
}

// 函数表达式
const greet = function(name) {
  return `Hello, ${name}`;
};

// 箭头函数 (ES6)
const greet = (name) => `Hello, ${name}`;
const add = (a, b) => a + b;
const getUser = () => ({ name: '张三' }); // 返回对象需要括号

// 默认参数 (ES6)
function greet(name = 'Guest') {
  return `Hello, ${name}`;
}

// 剩余参数 (ES6)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// 参数解构
function printUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}
```

### 3.2 作用域

```javascript
// 全局作用域
const globalVar = 'global';

function outer() {
  // 函数作用域
  const outerVar = 'outer';
  
  function inner() {
    // 内部函数可以访问外部变量
    const innerVar = 'inner';
    console.log(globalVar); // 可以访问
    console.log(outerVar);  // 可以访问
  }
  
  inner();
  // console.log(innerVar); // 错误！无法访问
}

// 块级作用域 (let/const)
if (true) {
  const blockVar = 'block';
  let blockLet = 'block';
}
// console.log(blockVar); // 错误！无法访问
```

### 3.3 闭包

```javascript
// 闭包：函数内部返回函数，内部函数访问外部变量
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// 实际应用：函数柯里化
function add(a) {
  return function(b) {
    return a + b;
  };
}
const add5 = add(5);
console.log(add5(3)); // 8
```

### 3.4 this 指向

```javascript
// 全局上下文
console.log(this); // window (浏览器) / global (Node)

// 函数上下文
function fn() {
  console.log(this); // window (非严格模式) / undefined (严格模式)
}

// 对象方法
const user = {
  name: '张三',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
user.greet(); // Hello, 张三

// 改变 this 指向
function greet() {
  console.log(`Hello, ${this.name}`);
}

const user1 = { name: '张三' };
const user2 = { name: '李四' };

greet.call(user1);  // Hello, 张三
greet.apply(user2); // Hello, 李四
const boundGreet = greet.bind(user1);
boundGreet();       // Hello, 张三

// 箭头函数的 this
const obj = {
  name: 'Object',
  regularFn() {
    console.log(this.name); // 'Object'
  },
  arrowFn: () => {
    console.log(this.name); // undefined (继承外层 this)
  }
};
```


## 对象与数组

### 4.1 对象操作

```javascript
// 对象创建
const obj1 = {};
const obj2 = new Object();
const obj3 = Object.create(null);

// 属性访问
const user = { name: '张三', age: 18 };
user.name;      // '张三'
user['name'];   // '张三'

// 属性操作
user.gender = 'male';           // 添加
user.age = 19;                  // 修改
delete user.gender;             // 删除
'age' in user;                  // 检查属性
Object.keys(user);              // ['name', 'age']
Object.values(user);            // ['张三', 19]
Object.entries(user);           // [['name', '张三'], ['age', 19]]

// 对象展开 (ES6)
const userCopy = { ...user, age: 20 };

// 对象解构 (ES6)
const { name, age } = user;
const { name: userName } = user; // 重命名

// 计算属性名 (ES6)
const key = 'name';
const obj = { [key]: '张三' };
```

### 4.2 数组方法

```javascript
const arr = [1, 2, 3, 4, 5];

// 添加/删除
arr.push(6);        // 末尾添加，返回新长度
arr.pop();          // 末尾删除，返回删除项
arr.unshift(0);     // 开头添加，返回新长度
arr.shift();        // 开头删除，返回删除项
arr.splice(2, 1);   // 从索引2删除1项
arr.splice(2, 0, 'a'); // 从索引2插入'a'

// 查找
arr.indexOf(3);     // 2 (不存在返回 -1)
arr.includes(3);    // true
arr.find(x => x > 3);       // 4
arr.findIndex(x => x > 3);  // 3

// 遍历
arr.forEach((item, index) => console.log(item));

// 转换
const doubled = arr.map(x => x * 2);        // [2, 4, 6, 8, 10]
const evens = arr.filter(x => x % 2 === 0); // [2, 4]
const sum = arr.reduce((acc, x) => acc + x, 0); // 15

// 其他
arr.slice(1, 3);    // [2, 3] (切片)
arr.concat([6, 7]); // [1, 2, 3, 4, 5, 6, 7]
arr.join('-');      // '1-2-3-4-5'
arr.reverse();      // [5, 4, 3, 2, 1]
arr.sort((a, b) => a - b); // 排序

// 链式调用
const result = arr
  .filter(x => x > 2)
  .map(x => x * 2)
  .reduce((acc, x) => acc + x, 0);
```


## ES6+ 新特性

### 5.1 let 和 const

```javascript
// 块级作用域
{
  let a = 1;
  const b = 2;
}
// console.log(a); // 错误！

// 暂时性死区
console.log(x); // undefined (var)
var x = 1;

console.log(y); // ReferenceError (let/const)
let y = 1;

// const 必须初始化
const PI; // 错误！
```

### 5.2 箭头函数

```javascript
// 基本语法
const add = (a, b) => a + b;
const square = x => x * x;
const getUser = () => ({ name: '张三' });

// 多行需要花括号和 return
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};

// 没有自己的 this
const obj = {
  value: 42,
  getValue: () => this.value, // undefined
  getValue2() { return this.value; } // 42
};
```

### 5.3 模板字符串

```javascript
const name = '张三';
const age = 18;

// 基本使用
const message = `Hello, ${name}`;

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// 表达式
const result = `Sum: ${1 + 2}`;

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => 
    acc + str + (values[i] ? `<b>${values[i]}</b>` : ''), ''
  );
}
const text = highlight`Hello ${name}, you are ${age}`;
```

### 5.4 解构赋值

```javascript
// 数组解构
const [a, b, c] = [1, 2, 3];
const [first, ...rest] = [1, 2, 3, 4]; // first=1, rest=[2,3,4]
const [x = 10, y = 20] = [1]; // x=1, y=20

// 对象解构
const { name, age } = { name: '张三', age: 18 };
const { name: userName, age: userAge } = { name: '张三', age: 18 };
const { name, ...others } = { name: '张三', age: 18, gender: 'male' };

// 嵌套解构
const { user: { name } } = { user: { name: '张三' } };

// 函数参数解构
function printUser({ name, age = 18 }) {
  console.log(`${name}, ${age}`);
}
```

### 5.5 展开运算符

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const arr3 = [...arr1, ...arr2];

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 函数调用
const nums = [1, 2, 3];
Math.max(...nums); // 3

// 剩余参数
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

### 5.6 类 (Class)

```javascript
// 类定义
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // 实例方法
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  // 静态方法
  static isPerson(obj) {
    return obj instanceof Person;
  }
}

// 继承
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return `${this.name} is studying`;
  }
  
  // 重写父类方法
  greet() {
    return `${super.greet()} and I'm a student`;
  }
}

const student = new Student('张三', 18, '高三');
student.greet(); // Hello, I'm 张三 and I'm a student
```


## 异步编程

### 6.1 Promise

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
    // reject(new Error('Failed'));
  }, 1000);
});

// 使用 Promise
promise
  .then(result => {
    console.log(result);
    return result + '!';
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Done');
  });

// Promise 静态方法
Promise.resolve(value);     // 返回 resolved promise
Promise.reject(error);      // 返回 rejected promise
Promise.all([p1, p2, p3]);  // 全部成功才成功
Promise.race([p1, p2, p3]); // 返回最快的
Promise.allSettled([p1, p2]); // 等待全部完成
```

### 6.2 async/await

```javascript
// async 函数返回 Promise
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return await response.json();
}

// 使用
async function main() {
  try {
    const user = await fetchUser(1);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

// 并行执行
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts')
  ]);
  return { users, posts };
}
```


## 面向对象

### 7.1 原型链

```javascript
// 构造函数
function Person(name) {
  this.name = name;
}

// 原型方法
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

// 实例
const person = new Person('张三');
person.greet(); // Hello, I'm 张三

// 原型链检查
person.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; // true
person instanceof Person; // true
person instanceof Object; // true
```

### 7.2 继承

```javascript
// ES5 继承
function Student(name, grade) {
  Person.call(this, name); // 调用父类构造函数
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  return `${this.name} is studying`;
};

// ES6 Class 继承（推荐）
class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
  
  study() {
    return `${this.name} is studying`;
  }
}
```


## 模块化

### 8.1 ES Modules

```javascript
// 导出 (math.js)
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export default class Calculator {
  // ...
}

// 导入
import Calculator, { PI, add } from './math.js';
import * as math from './math.js';
import { add as sum } from './math.js';

// 动态导入
const module = await import('./math.js');
```

### 8.2 CommonJS (Node.js)

```javascript
// 导出
const PI = 3.14159;
function add(a, b) {
  return a + b;
}

module.exports = { PI, add };
// 或
exports.PI = PI;
exports.add = add;

// 导入
const { PI, add } = require('./math.js');
```


## 进阶主题

### 9.1 事件循环 (Event Loop)

#### 执行机制

```javascript
// JavaScript 是单线程的，通过事件循环实现异步

console.log('1');  // 同步

setTimeout(() => {
  console.log('2');  // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3');  // 微任务
});

console.log('4');  // 同步

// 输出顺序: 1 -> 4 -> 3 -> 2
```

#### 任务优先级

```javascript
// 1. 同步代码（最高优先级）
// 2. 微任务 (Microtask)
//    - Promise.then/catch/finally
//    - MutationObserver
//    - queueMicrotask
// 3. 宏任务 (Macrotask)
//    - setTimeout/setInterval
//    - setImmediate (Node.js)
//    - I/O 操作
//    - UI 渲染

// 示例
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('microtask'));

// 输出: promise -> microtask -> timeout
```

#### async/await 执行顺序

```javascript
async function async1() {
  console.log('async1 start');  // 2
  await async2();               // 等待 async2 完成
  console.log('async1 end');    // 6 (微任务)
}

async function async2() {
  console.log('async2');        // 3
}

console.log('script start');    // 1

setTimeout(() => {
  console.log('setTimeout');    // 8 (宏任务)
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');      // 4
  resolve();
}).then(() => {
  console.log('promise2');      // 7 (微任务)
});

console.log('script end');      // 5

// 输出顺序: 
// script start -> async1 start -> async2 -> promise1 -> script end 
// -> async1 end -> promise2 -> setTimeout
```

### 9.2 内存管理

#### 垃圾回收机制

```javascript
// 标记清除 (Mark-and-Sweep) - 主要算法
// 1. 标记所有可达对象
// 2. 清除未标记的对象

// 引用计数 (已废弃，存在循环引用问题)
function problem() {
  let obj1 = {};
  let obj2 = {};
  obj1.ref = obj2;
  obj2.ref = obj1;  // 循环引用
  // 引用计数无法回收，但标记清除可以
}
```

#### 内存泄漏场景

```javascript
// 1. 意外的全局变量
function leak() {
  globalVar = 'I am global';  // 未声明，成为全局变量
}

// 2. 闭包导致的内存泄漏
function outer() {
  const hugeData = new Array(1000000).fill('x');
  return function inner() {
    console.log(hugeData[0]);  // hugeData 无法被回收
  };
}
const leakFn = outer();

// 3. 定时器未清理
const timer = setInterval(() => {
  console.log('tick');
}, 1000);
// 组件卸载时未 clearInterval(timer)

// 4. DOM 引用未释放
const elements = {
  button: document.getElementById('button')
};
// 即使从 DOM 移除，elements.button 仍引用着

// 5. 事件监听未移除
element.addEventListener('click', handler);
// 组件卸载时未 removeEventListener
```

#### WeakMap 和 WeakSet

```javascript
// WeakMap: 键是弱引用，不影响垃圾回收
let obj = { name: 'test' };
const weakMap = new WeakMap();
weakMap.set(obj, 'value');

obj = null;  // 原对象可以被垃圾回收

// 使用场景：私有属性
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    privateData.set(this, { name, age });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}

// WeakSet: 存储弱引用对象
const weakSet = new WeakSet();
let user = { name: '张三' };
weakSet.add(user);

user = null;  // 对象可以被回收
```

### 9.3 函数式编程

#### 纯函数

```javascript
// 纯函数：相同输入永远产生相同输出，无副作用
// 优点：可预测、可测试、可缓存

// 纯函数
function add(a, b) {
  return a + b;
}

// 非纯函数（有副作用）
let count = 0;
function increment() {
  count++;  // 修改外部状态
  return count;
}

// 非纯函数（依赖外部状态）
function getRandom() {
  return Math.random();  // 输出不可预测
}
```

#### 高阶函数

```javascript
// 函数作为参数
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i], i, array));
  }
  return result;
}

// 函数作为返回值
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5);  // 10
triple(5);  // 15

// 常用高阶函数
const numbers = [1, 2, 3, 4, 5];

// map: 转换
numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter: 过滤
numbers.filter(n => n > 2);  // [3, 4, 5]

// reduce: 归约
numbers.reduce((sum, n) => sum + n, 0);  // 15

// compose: 函数组合
const compose = (...fns) => x => 
  fns.reduceRight((v, f) => f(v), x);

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const addThenMultiply = compose(multiply2, add1);

addThenMultiply(3);  // 8  (3+1)*2
```

#### 柯里化 (Currying)

```javascript
// 将多参数函数转换为单参数函数链
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// 使用
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

curriedSum(1)(2)(3);     // 6
curriedSum(1, 2)(3);     // 6
curriedSum(1)(2, 3);     // 6

// 实际应用
const add = a => b => a + b;
const add5 = add(5);
add5(3);  // 8
add5(10); // 15
```

### 9.4 常用设计模式

#### 单例模式

```javascript
// 确保一个类只有一个实例
class Singleton {
  static instance = null;
  
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = [];
  }
  
  add(item) {
    this.data.push(item);
  }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2);  // true
```

#### 工厂模式

```javascript
// 创建对象的工厂函数
class Car {
  drive() { return 'Driving car'; }
}

class Truck {
  drive() { return 'Driving truck'; }
  loadCargo() { return 'Loading cargo'; }
}

class VehicleFactory {
  static create(type) {
    switch(type) {
      case 'car': return new Car();
      case 'truck': return new Truck();
      default: throw new Error('Unknown type');
    }
  }
}

const car = VehicleFactory.create('car');
const truck = VehicleFactory.create('truck');
```

#### 观察者模式 (发布订阅)

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);  // 返回取消订阅函数
  }
  
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
  
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

// 使用
const emitter = new EventEmitter();

const unsubscribe = emitter.on('data', (data) => {
  console.log('Received:', data);
});

emitter.emit('data', { message: 'Hello' });  // Received: { message: 'Hello' }
unsubscribe();  // 取消订阅
```

#### 策略模式

```javascript
// 定义一系列算法，封装起来并且可以互相替换
const strategies = {
  discount(price) {
    return price * 0.8;
  },
  premium(price) {
    return price * 0.6;
  },
  normal(price) {
    return price;
  }
};

function calculatePrice(type, price) {
  return strategies[type](price);
}

calculatePrice('discount', 100);  // 80
calculatePrice('premium', 100);   // 60
```

### 9.5 性能优化技巧

#### 防抖 (Debounce)

```javascript
// 延迟执行，只执行最后一次
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用：搜索框输入
const handleSearch = debounce((query) => {
  console.log('Searching:', query);
  // 发送请求
}, 300);

input.addEventListener('input', (e) => handleSearch(e.target.value));
```

#### 节流 (Throttle)

```javascript
// 固定时间间隔执行
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用时间戳 + 定时器（支持首次和末次执行）
function throttleAdvanced(fn, interval) {
  let lastTime = 0;
  let timer = null;
  
  return function(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);
    
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// 使用：滚动监听
window.addEventListener('scroll', throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100));
```

#### 惰性加载

```javascript
// 图片懒加载
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// 模块懒加载
const HeavyComponent = () => import('./HeavyComponent.js');
```

#### 缓存计算结果 (Memoization)

```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用：斐波那契数列
const fibonacci = memoize(function(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(50);  // 快速计算，不会栈溢出
```


## 🔗 相关资源

- [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/)
- [ES6 入门教程](https://es6.ruanyifeng.com/)


> [!TIP]
> **学习建议**
> 1. 掌握基础语法后再学习框架（Vue/React）
> 2. ES6+ 特性是现代开发的基础，务必熟练掌握
> 3. 理解异步编程和闭包是进阶的关键
