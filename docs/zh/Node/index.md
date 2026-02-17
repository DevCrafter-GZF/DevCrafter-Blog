# Node.js 基础 <Badge type="tip" text="Node" />

> [!TIP]
> 本教程适合有 JavaScript 基础的开发者，学习服务端开发。

## 📋 学习大纲

| 章节 | 内容 | 难度 |
|------|------|------|
| [Node.js 简介](#一-nodejs-简介) | 特点、应用场景 | ⭐ |
| [基础操作](#二-基础操作) | 版本查看、运行脚本 | ⭐ |
| [fs 模块](#三-fs-文件系统模块) | 文件读写操作 | ⭐⭐ |
| [HTTP 模块](#四-http-模块) | 创建 Web 服务器 | ⭐⭐⭐ |
| [模块化](#五-模块化) | CommonJS、模块导出导入 | ⭐⭐ |
| [npm](#六-npm-包管理) | 包管理、镜像切换 | ⭐⭐ |
| [Express](#七-express-框架) | Web 框架、路由、中间件 | ⭐⭐⭐ |
| [跨域处理](#九-跨域处理) | CORS、JSONP | ⭐⭐ |
| [JWT 认证](#十-jwt-认证) | Token 生成与验证 | ⭐⭐⭐ |
| [数据库操作](#十二-nodejs-操作-mysql) | MySQL 集成 | ⭐⭐⭐ |
| [Promise/async](#十四-promise-和-asyncawait) | 异步处理 | ⭐⭐⭐ |

## 🎯 前置知识

学习 Node.js 之前，建议先掌握：

- [JavaScript 完全指南](../fundamentals/javascript.md) - JS 语法基础、异步编程、模块化

## 🔄 学习路径

```
Node.js 基础 → Express 框架 → 数据库操作 → 项目实战
     ↓              ↓              ↓
   fs/http      路由/中间件      MySQL/MongoDB
```

## 🔗 相关文档

- [MySQL 教程](../MySQL/index.md) - 数据库基础
- [项目实战](../Projects/index.md) - 完整项目开发
- [Vue 完全指南](../frameworks/vue.md) - 前端框架配合

## Node.js 简介

Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时环境，使 JavaScript 可以在服务器端运行。

## 基础操作

### 1. 查看 Node 版本

```bash
node -v
```

### 2. 运行 JavaScript 文件

```bash
node app.js
```

## fs 文件系统模块

### 导入 fs 模块

```javascript
const fs = require('fs');
```

### 读取文件

```javascript
fs.readFile(path[, options], callback);

// 示例
fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log('读取失败：', err.message);
    }
    console.log('读取成功：', data);
});
```

### 写入文件

```javascript
fs.writeFile(file, data[, options], callback);

// 示例
fs.writeFile('./test.txt', 'Hello Node.js', (err) => {
    if (err) {
        return console.log('写入失败：', err.message);
    }
    console.log('写入成功');
});
```

### 路径处理

```javascript
const path = require('path');

// __dirname 表示当前文件所在目录
const fullPath = path.join(__dirname, './test.txt');
```

## HTTP 模块

### 创建 Web 服务器

```javascript
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // 设置响应头，解决中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // 获取请求信息
    console.log(req.url);     // 请求 URL
    console.log(req.method);  // 请求方法
    
    // 响应数据
    res.end('你好，Node.js');
});

server.listen(8080, () => {
    console.log('服务器运行在 http://127.0.0.1:8080');
});
```

## 模块化

### 模块类型

```javascript
// 1. 内置模块
const fs = require('fs');
const http = require('http');
const path = require('path');

// 2. 自定义模块
const custom = require('./custom.js');

// 3. 第三方模块
const moment = require('moment');
```

### 模块导出

```javascript
// 导出单个成员
module.exports = {
    name: '张三',
    age: 18
};

// 或
exports.name = '张三';
exports.age = 18;

// 注意：module.exports 优先级高于 exports
```

### 模块导入

```javascript
const obj = require('./module.js');
// 导入的结果永远是 module.exports 指向的对象
```

## npm 包管理

### 常用命令

```bash
# 初始化项目
npm init -y

# 安装包
npm install 包名
npm i 包名

# 安装开发依赖
npm i 包名 -D

# 全局安装
npm i 包名 -g

# 卸载包
npm uninstall 包名

# 安装所有依赖
npm install
```

### 切换镜像源

```bash
# 安装 nrm
npm i nrm -g

# 查看可用源
nrm ls

# 切换源
nrm use taobao
```

### package.json 字段

```json
{
    "dependencies": {
        "包名": "版本号"
    },
    "devDependencies": {
        "开发依赖包": "版本号"
    }
}
```

- `dependencies`：项目运行依赖
- `devDependencies`：开发环境依赖

## Express 框架

### 安装

```bash
npm install express
```

### 基本使用

```javascript
const express = require('express');
const app = express();

// 监听 GET 请求
app.get('/user', (req, res) => {
    res.send({ name: '张三', age: 20 });
});

// 监听 POST 请求
app.post('/user', (req, res) => {
    res.send('请求成功');
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器运行在 http://127.0.0.1:3000');
});
```

### 获取请求参数

```javascript
// GET 请求参数（查询字符串）
app.get('/user', (req, res) => {
    console.log(req.query);  // { name: '张三', age: '20' }
});

// URL 动态参数
app.get('/user/:id', (req, res) => {
    console.log(req.params);  // { id: '123' }
});
```

### 托管静态资源

```javascript
// 托管 public 目录下的静态文件
app.use(express.static('public'));

// 挂载路径前缀
app.use('/public', express.static('public'));
```

### 路由

```javascript
// 简单路由
app.get('/', (req, res) => {
    res.send('首页');
});

// 模块化路由
const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
    res.send('列表页');
});

module.exports = router;

// 使用路由模块
const userRouter = require('./router/user.js');
app.use('/user', userRouter);
```

## 中间件

### 全局中间件

```javascript
// 注册全局中间件
app.use((req, res, next) => {
    console.log('中间件执行');
    next();  // 传递给下一个中间件或路由
});
```

### 局部中间件

```javascript
const mw = (req, res, next) => {
    console.log('局部中间件');
    next();
};

app.get('/user', mw, (req, res) => {
    res.send('用户页');
});
```

### 内置中间件

```javascript
// 解析 JSON 格式请求体
app.use(express.json());

// 解析 URL-encoded 格式请求体
app.use(express.urlencoded({ extended: false }));
```

### 错误处理中间件

```javascript
// 必须注册在所有路由之后
app.use((err, req, res, next) => {
    console.log('发生错误：', err.message);
    res.send('服务器错误');
});
```

## 跨域处理

### 使用 CORS 中间件

```bash
npm install cors
```

```javascript
const cors = require('cors');

// 配置中间件（必须在路由之前）
app.use(cors());
```

### CORS 响应头

```javascript
// 允许所有来源
res.setHeader('Access-Control-Allow-Origin', '*');

// 允许特定来源
res.setHeader('Access-Control-Allow-Origin', 'http://example.com');

// 允许的请求方法
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

// 允许的请求头
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

## JWT 认证

### 安装

```bash
npm install jsonwebtoken express-jwt@5.3.3
```

### 生成 Token

```javascript
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

// 登录成功后生成 token
app.post('/login', (req, res) => {
    const userinfo = req.body;
    
    // 生成 JWT 字符串
    const tokenStr = jwt.sign(
        { username: userinfo.username },
        secretKey,
        { expiresIn: '30s' }  // 有效期 30 秒
    );
    
    res.send({
        status: 200,
        message: '登录成功',
        token: tokenStr
    });
});
```

### 验证 Token

```javascript
const expressJWT = require('express-jwt');

// 解析 JWT（排除 /api/ 开头的请求）
app.use(expressJWT({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({ path: [/^\/api\//] }));

// 获取用户信息
app.get('/userinfo', (req, res) => {
    console.log(req.user);  // 解析后的用户信息
});

// 错误处理
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的 token'
        });
    }
    res.send({
        status: 500,
        message: '未知错误'
    });
});
```

## 密码加密

### bcryptjs

```bash
npm install bcryptjs@2.4.3
```

```javascript
const bcrypt = require('bcryptjs');

// 加密密码
const hashedPassword = bcrypt.hashSync(password, 10);

// 验证密码
const isValid = bcrypt.compareSync(password, hashedPassword);
```

## 数据验证

### 使用 joi

```bash
npm install @hapi/joi@17.1.0
npm install @escook/express-joi
```

```javascript
const joi = require('@hapi/joi');

// 定义验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^\S{6,12}$/).required();

const schema = {
    body: {
        username,
        password
    }
};

// 使用验证中间件
const expressJoi = require('@escook/express-joi');
app.post('/reguser', expressJoi(schema), (req, res) => {
    // 验证通过后的处理
});
```

## 文件上传

### 使用 multer

```bash
npm install multer@1.4.2
```

```javascript
const multer = require('multer');
const path = require('path');

// 配置存储
const upload = multer({
    dest: path.join(__dirname, 'uploads')
});

// 单文件上传
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);   // 文件信息
    console.log(req.body);   // 文本信息
    res.send('上传成功');
});

// 多文件上传
app.post('/uploads', upload.array('files', 5), (req, res) => {
    console.log(req.files);  // 文件数组
});
```

## Promise 和 async/await

### Promise

```javascript
const fs = require('fs');

// 读取文件 Promise 化
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

// 使用
readFile('./test.txt')
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

### async/await

```javascript
// async 函数
async function getData() {
    try {
        const data1 = await readFile('./file1.txt');
        const data2 = await readFile('./file2.txt');
        console.log(data1, data2);
    } catch (err) {
        console.log(err);
    }
}

getData();
```

### Promise.all

```javascript
// 并发执行多个异步任务
Promise.all([
    readFile('./file1.txt'),
    readFile('./file2.txt'),
    readFile('./file3.txt')
]).then(results => {
    console.log(results);  // 所有结果数组
});
```

### Promise.race

```javascript
// 返回最先完成的 Promise
Promise.race([
    readFile('./file1.txt'),
    readFile('./file2.txt')
]).then(result => {
    console.log(result);  // 最先完成的结果
});
```

## 常用依赖包

| 包名 | 作用 |
|------|------|
| `express` | Web 框架 |
| `cors` | 跨域处理 |
| `jsonwebtoken` | JWT 认证 |
| `express-jwt` | JWT 验证中间件 |
| `bcryptjs` | 密码加密 |
| `multer` | 文件上传 |
| `joi` | 数据验证 |
| `mysql` | MySQL 数据库 |
| `mongoose` | MongoDB 数据库 |
| `nodemon` | 开发时自动重启 |
