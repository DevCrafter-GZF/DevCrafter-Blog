# MySQL 基础操作 <Badge type="tip" text="MySQL 8.0" />

> [!TIP]
> MySQL 是最流行的开源关系型数据库，本教程涵盖从基础操作到高级查询的完整知识体系。

## 📋 学习大纲

| 章节 | 内容 | 难度 |
|------|------|------|
| [数据库操作](#一-数据库操作) | 查询、新增、更新、删除数据 | ⭐⭐ |
| [条件运算符](#二-条件运算符) | 逻辑、比较运算符 | ⭐⭐ |
| [聚合函数](#三-聚合函数) | COUNT、SUM、AVG、MAX、MIN | ⭐⭐ |
| [表结构操作](#四-表结构操作) | CREATE、ALTER、DROP | ⭐⭐ |
| [Node.js 操作](#五-nodejs-操作-mysql) | mysql 模块使用 | ⭐⭐⭐ |
| [多表查询](#六-多表查询) | JOIN、UNION | ⭐⭐⭐ |
| [事务处理](#七-事务处理) | BEGIN、COMMIT、ROLLBACK | ⭐⭐⭐ |
| [索引优化](#八-索引优化) | 创建索引、查询优化 | ⭐⭐⭐ |

## 🎯 学习目标

完成本教程后，你将能够：

- ✅ 设计数据库表结构
- ✅ 编写 SQL 进行数据增删改查
- ✅ 使用多表关联查询复杂数据
- ✅ 在 Node.js 中操作数据库
- ✅ 理解事务和索引原理

## 🔗 相关文档

- [Node.js](../Node/index.md) - 后端数据库连接
- [项目实战](../Projects/index.md) - 数据库应用案例


## 数据库操作

### 1. 查询数据

```sql
-- 查询所有列
SELECT * FROM 表名;

-- 查询指定列
SELECT 列名1, 列名2 FROM 表名;

-- 条件查询
SELECT * FROM 表名 WHERE id = 2;

-- 模糊查询
SELECT * FROM 表名 WHERE name LIKE '%张%';

-- 排序（升序）
SELECT * FROM 表名 ORDER BY 列名 ASC;

-- 排序（降序）
SELECT * FROM 表名 ORDER BY 列名 DESC;

-- 分页查询
SELECT * FROM 表名 LIMIT 0, 10;
```

### 2. 新增数据

```sql
-- 插入完整数据
INSERT INTO 表名 (列1, 列2, 列3) VALUES (值1, 值2, 值3);

-- 插入多条数据
INSERT INTO 表名 (列1, 列2) VALUES 
    (值1, 值2),
    (值3, 值4);

-- 简写（插入所有列）
INSERT INTO 表名 VALUES (值1, 值2, 值3);
```

### 3. 更新数据

```sql
-- 更新指定数据
UPDATE 表名 SET 列名 = '新值' WHERE 条件;

-- 更新多个列
UPDATE 表名 SET 列1 = '值1', 列2 = '值2' WHERE 条件;
```

### 4. 删除数据

```sql
-- 删除指定数据
DELETE FROM 表名 WHERE 条件;

-- 清空表（保留结构）
TRUNCATE TABLE 表名;
```

## 条件运算符

### 逻辑运算符

| 运算符 | 说明 |
|--------|------|
| `AND` | 且，同时满足 |
| `OR` | 或，满足其一 |
| `NOT` | 非，取反 |

```sql
-- AND 示例
SELECT * FROM users WHERE age > 18 AND status = 1;

-- OR 示例
SELECT * FROM users WHERE status = 1 OR status = 2;
```

### 比较运算符

| 运算符 | 说明 |
|--------|------|
| `=` | 等于 |
| `!=` 或 `<>` | 不等于 |
| `>` | 大于 |
| `<` | 小于 |
| `>=` | 大于等于 |
| `<=` | 小于等于 |
| `BETWEEN` | 在范围内 |
| `IN` | 在集合中 |
| `LIKE` | 模糊匹配 |

```sql
-- BETWEEN
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- IN
SELECT * FROM users WHERE status IN (1, 2, 3);

-- LIKE（% 匹配任意字符，_ 匹配单个字符）
SELECT * FROM users WHERE name LIKE '张%';   -- 以张开头的
SELECT * FROM users WHERE name LIKE '%张%';  -- 包含张的
SELECT * FROM users WHERE name LIKE '张_';   -- 张 + 一个字符
```

## 聚合函数

| 函数 | 说明 |
|------|------|
| `COUNT(*)` | 统计行数 |
| `SUM(列名)` | 求和 |
| `AVG(列名)` | 平均值 |
| `MAX(列名)` | 最大值 |
| `MIN(列名)` | 最小值 |

```sql
-- 统计用户数量
SELECT COUNT(*) FROM users;

-- 求年龄总和
SELECT SUM(age) FROM users;

-- 求平均年龄
SELECT AVG(age) FROM users;

-- 分组统计
SELECT status, COUNT(*) FROM users GROUP BY status;
```

## 表结构操作

### 创建表

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 修改表

```sql
-- 添加列
ALTER TABLE 表名 ADD 列名 数据类型;

-- 修改列
ALTER TABLE 表名 MODIFY 列名 数据类型;

-- 删除列
ALTER TABLE 表名 DROP 列名;

-- 重命名表
RENAME TABLE 旧表名 TO 新表名;
```

### 删除表

```sql
DROP TABLE 表名;
```

## Node.js 操作 MySQL

### 安装 mysql 模块

```bash
npm install mysql
```

### 创建连接

```javascript
const mysql = require('mysql');

// 创建连接池
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});

// 测试连接
db.query('SELECT 1', (err, results) => {
    if (err) return console.log(err.message);
    console.log('数据库连接成功');
});
```

### 查询数据

```javascript
// 查询所有用户
db.query('SELECT * FROM users', (err, results) => {
    if (err) return console.log(err.message);
    console.log(results);
});

// 条件查询
db.query('SELECT * FROM users WHERE id = ?', [1], (err, results) => {
    if (err) return console.log(err.message);
    console.log(results);
});
```

### 插入数据

```javascript
// 方式1：使用占位符
const user = { username: 'tom', password: '123456' };
const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

db.query(sql, [user.username, user.password], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('插入成功');
    }
});

// 方式2：使用对象（推荐）
const user = { username: 'jerry', password: '123456' };
const sql = 'INSERT INTO users SET ?';

db.query(sql, user, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('插入成功，ID：', results.insertId);
    }
});
```

### 更新数据

```javascript
// 方式1
const user = { id: 7, username: 'spike', password: '123000' };
const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';

db.query(sql, [user.username, user.password, user.id], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('更新成功');
    }
});

// 方式2
const user = { id: 7, username: 'spike' };
const sql = 'UPDATE users SET ? WHERE id = ?';

db.query(sql, [user, user.id], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('更新成功');
    }
});
```

### 删除数据

```javascript
// 物理删除
const sql = 'DELETE FROM users WHERE id = ?';

db.query(sql, 7, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('删除成功');
    }
});

// 标记删除（推荐）
const sql = 'UPDATE users SET status = 1 WHERE id = ?';

db.query(sql, 1, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('标记删除成功');
    }
});
```

## 数据类型

### 数值类型

| 类型 | 说明 | 范围 |
|------|------|------|
| `TINYINT` | 小整数 | -128 ~ 127 |
| `SMALLINT` | 短整数 | -32768 ~ 32767 |
| `INT` | 整数 | -21亿 ~ 21亿 |
| `BIGINT` | 大整数 | 很大 |
| `FLOAT` | 单精度浮点数 | |
| `DOUBLE` | 双精度浮点数 | |
| `DECIMAL` | 定点数 | |

### 字符串类型

| 类型 | 说明 | 最大长度 |
|------|------|----------|
| `CHAR` | 定长字符串 | 255 字符 |
| `VARCHAR` | 变长字符串 | 65535 字节 |
| `TEXT` | 长文本 | 65535 字符 |
| `LONGTEXT` | 超长文本 | 4GB |

### 日期时间类型

| 类型 | 说明 | 格式 |
|------|------|------|
| `DATE` | 日期 | YYYY-MM-DD |
| `TIME` | 时间 | HH:MM:SS |
| `DATETIME` | 日期时间 | YYYY-MM-DD HH:MM:SS |
| `TIMESTAMP` | 时间戳 | YYYY-MM-DD HH:MM:SS |
| `YEAR` | 年份 | YYYY |

## 约束条件

| 约束 | 说明 |
|------|------|
| `PRIMARY KEY` | 主键，唯一标识 |
| `AUTO_INCREMENT` | 自增 |
| `NOT NULL` | 非空 |
| `UNIQUE` | 唯一 |
| `DEFAULT` | 默认值 |
| `FOREIGN KEY` | 外键 |

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 联表查询

### 内连接

```sql
-- 查询用户及其订单
SELECT u.username, o.amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;
```

### 左连接

```sql
-- 查询所有用户及其订单（包括没有订单的用户）
SELECT u.username, o.amount 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;
```

### 右连接

```sql
-- 查询所有订单及用户信息
SELECT u.username, o.amount 
FROM users u 
RIGHT JOIN orders o ON u.id = o.user_id;
```
