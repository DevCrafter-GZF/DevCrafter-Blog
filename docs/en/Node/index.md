# Node.js Basics <Badge type="tip" text="Node.js" />

> [!TIP]
> Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, enabling JavaScript to run on the server side.

## 📋 Learning Outline

| Chapter | Content | Difficulty |
|---------|---------|------------|
| [Introduction](#introduction) | What is Node.js, features | ⭐ |
| [Installation](#installation) | Install Node.js | ⭐ |
| [Module System](#module-system) | CommonJS, ES Modules | ⭐⭐ |
| [File System](#file-system) | fs module operations | ⭐⭐ |
| [HTTP Module](#http-module) | Create web server | ⭐⭐⭐ |
| [Express Framework](#express-framework) | Express basics | ⭐⭐⭐ |
| [Database Connection](#database-connection) | MySQL operations | ⭐⭐⭐ |

## 🎯 Learning Goals

After completing this tutorial, you will be able to:

- ✅ Understand Node.js features and application scenarios
- ✅ Use Node.js module system
- ✅ Perform file system operations
- ✅ Create web servers
- ✅ Use Express framework
- ✅ Connect and operate databases

## 🔗 Related Documents

- [JavaScript Complete Guide](../fundamentals/javascript.md) - JS syntax foundation
- [MySQL](../MySQL/index.md) - Database operations
- [Project Cases](../Projects/index.md) - Backend application examples


## Introduction

### What is Node.js

Node.js is a JavaScript runtime environment that allows JavaScript to run on the server side.

### Features

- **Asynchronous I/O**: Non-blocking I/O operations
- **Event-driven**: Event-driven architecture
- **Single-threaded**: Single-threaded with event loop
- **High performance**: Built on V8 engine
- **Rich ecosystem**: npm package manager

### Application Scenarios

- Web servers
- API development
- Real-time applications (chat, games)
- Command line tools
- Microservices

## Installation

### macOS Installation

```bash
# Using Homebrew
brew install node

# Check version
node --version
npm --version
```

### Windows Installation

1. Download installer from [Node.js official website](https://nodejs.org/)
2. Run installer and follow prompts
3. Verify installation

```bash
node --version
npm --version
```

### Run JavaScript

```bash
# Run JS file
node app.js

# Enter REPL mode
node

# Exit REPL
.exit
# or press Ctrl+C twice
```

## Module System

### CommonJS (Default)

```javascript
// Export (module.exports)
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    add,
    subtract
};

// Or export individually
exports.add = add;
exports.subtract = subtract;
```

```javascript
// Import (require)
// app.js
const math = require('./math');
console.log(math.add(1, 2));  // 3

// Destructure import
const { add, subtract } = require('./math');
console.log(add(1, 2));  // 3
```

### ES Modules

```javascript
// Export
// math.mjs
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export
export default function multiply(a, b) {
    return a * b;
}
```

```javascript
// Import
// app.mjs
import { add, subtract } from './math.mjs';
import multiply from './math.mjs';

console.log(add(1, 2));        // 3
console.log(multiply(2, 3));   // 6
```

### Built-in Modules

```javascript
// path module
const path = require('path');

path.join(__dirname, 'file.txt');
path.resolve('file.txt');
path.extname('file.txt');
path.basename('file.txt');

// os module
const os = require('os');

os.platform();
os.cpus();
os.totalmem();
os.freemem();
```

## File System

### Read File

```javascript
const fs = require('fs');

// Synchronous read
const data = fs.readFileSync('./file.txt', 'utf8');
console.log(data);

// Asynchronous read (callback)
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// Asynchronous read (Promise)
const fsPromises = require('fs').promises;

async function readFile() {
    try {
        const data = await fsPromises.readFile('./file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

### Write File

```javascript
const fs = require('fs');

// Synchronous write
fs.writeFileSync('./file.txt', 'Hello World');

// Asynchronous write
fs.writeFile('./file.txt', 'Hello World', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully');
});

// Append content
fs.appendFile('./file.txt', '\nNew line', (err) => {
    if (err) throw err;
});
```

### Directory Operations

```javascript
const fs = require('fs');

// Create directory
fs.mkdir('./new-folder', (err) => {
    if (err) throw err;
});

// Create nested directories
fs.mkdir('./a/b/c', { recursive: true }, (err) => {
    if (err) throw err;
});

// Read directory
fs.readdir('./', (err, files) => {
    if (err) throw err;
    console.log(files);
});

// Delete directory
fs.rmdir('./folder', (err) => {
    if (err) throw err;
});
```

### File Information

```javascript
const fs = require('fs');

fs.stat('./file.txt', (err, stats) => {
    if (err) throw err;
    
    console.log(stats.isFile());      // Is file
    console.log(stats.isDirectory()); // Is directory
    console.log(stats.size);          // File size
    console.log(stats.birthtime);     // Creation time
    console.log(stats.mtime);         // Modification time
});
```

## HTTP Module

### Create Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Set response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    // Send response
    res.end('Hello World\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

### Handle Requests

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    // Handle different routes
    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Home</h1>');
    } else if (path === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About</h1>');
    } else if (path === '/api/users') {
        const users = [
            { id: 1, name: 'Tom' },
            { id: 2, name: 'Jerry' }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000);
```

### Handle POST Request

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/users') {
        let body = '';
        
        // Receive data
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        // Data received complete
        req.on('end', () => {
            const user = JSON.parse(body);
            console.log(user);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created', user }));
        });
    }
});

server.listen(3000);
```

## Express Framework

### Installation

```bash
npm install express
```

### Basic Usage

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### Route Parameters

```javascript
// URL parameters
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// Query parameters
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    res.send(`Search: ${keyword}`);
});
```

### Handle Requests

```javascript
// GET request
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST request
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT request
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    // Update user logic
    res.json(updatedUser);
});

// DELETE request
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Delete user logic
    res.status(204).send();
});
```

### Static Files

```javascript
// Serve static files
app.use(express.static('public'));

// With virtual path
app.use('/static', express.static('public'));
```

### Middleware

```javascript
// Custom middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

## Database Connection

### MySQL Connection

```javascript
const mysql = require('mysql');

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

// Connect
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

// Query
connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});

// Close connection
connection.end();
```

### Connection Pool

```javascript
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});
```

### Express + MySQL Example

```javascript
const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

// Get all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Create user
app.post('/api/users', (req, res) => {
    const user = req.body;
    db.query('INSERT INTO users SET ?', user, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: results.insertId, ...user });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```
