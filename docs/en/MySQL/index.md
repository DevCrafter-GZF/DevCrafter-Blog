# MySQL Basics <Badge type="tip" text="MySQL 8.0" />

> [!TIP]
> MySQL is the most popular open-source relational database. This tutorial covers a complete knowledge system from basic operations to advanced queries.

## 📋 Learning Outline

| Chapter | Content | Difficulty |
|---------|---------|------------|
| [Database Operations](#database-operations) | Query, insert, update, delete data | ⭐⭐ |
| [Conditional Operators](#conditional-operators) | Logical, comparison operators | ⭐⭐ |
| [Aggregate Functions](#aggregate-functions) | COUNT, SUM, AVG, MAX, MIN | ⭐⭐ |
| [Table Structure Operations](#table-structure-operations) | CREATE, ALTER, DROP | ⭐⭐ |
| [Node.js Operations](#nodejs-mysql-operations) | mysql module usage | ⭐⭐⭐ |
| [Multi-table Queries](#multi-table-queries) | JOIN, UNION | ⭐⭐⭐ |

## 🎯 Learning Goals

After completing this tutorial, you will be able to:

- ✅ Design database table structures
- ✅ Write SQL for data CRUD operations
- ✅ Use multi-table joins for complex data queries
- ✅ Operate databases in Node.js
- ✅ Understand transaction and index principles

## 🔗 Related Documents

- [Node.js](../Node/index.md) - Backend database connection
- [Project Cases](../Projects/index.md) - Database application examples


## Database Operations

### 1. Query Data

```sql
-- Query all columns
SELECT * FROM table_name;

-- Query specific columns
SELECT column1, column2 FROM table_name;

-- Conditional query
SELECT * FROM table_name WHERE id = 2;

-- Fuzzy query
SELECT * FROM table_name WHERE name LIKE '%zhang%';

-- Sort (ascending)
SELECT * FROM table_name ORDER BY column ASC;

-- Sort (descending)
SELECT * FROM table_name ORDER BY column DESC;

-- Pagination query
SELECT * FROM table_name LIMIT 0, 10;
```

### 2. Insert Data

```sql
-- Insert complete data
INSERT INTO table_name (col1, col2, col3) VALUES (val1, val2, val3);

-- Insert multiple rows
INSERT INTO table_name (col1, col2) VALUES 
    (val1, val2),
    (val3, val4);

-- Shorthand (insert all columns)
INSERT INTO table_name VALUES (val1, val2, val3);
```

### 3. Update Data

```sql
-- Update specific data
UPDATE table_name SET column = 'new_value' WHERE condition;

-- Update multiple columns
UPDATE table_name SET col1 = 'val1', col2 = 'val2' WHERE condition;
```

### 4. Delete Data

```sql
-- Delete specific data
DELETE FROM table_name WHERE condition;

-- Clear table (keep structure)
TRUNCATE TABLE table_name;
```

## Conditional Operators

### Logical Operators

| Operator | Description |
|----------|-------------|
| `AND` | And, both conditions must be met |
| `OR` | Or, either condition must be met |
| `NOT` | Not, negation |

```sql
-- AND example
SELECT * FROM users WHERE age > 18 AND status = 1;

-- OR example
SELECT * FROM users WHERE status = 1 OR status = 2;
```

### Comparison Operators

| Operator | Description |
|----------|-------------|
| `=` | Equal to |
| `!=` or `<>` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |
| `BETWEEN` | Within range |
| `IN` | In set |
| `LIKE` | Fuzzy match |

```sql
-- BETWEEN
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- IN
SELECT * FROM users WHERE status IN (1, 2, 3);

-- LIKE (% matches any characters, _ matches single character)
SELECT * FROM users WHERE name LIKE 'zhang%';   -- starts with zhang
SELECT * FROM users WHERE name LIKE '%zhang%';  -- contains zhang
SELECT * FROM users WHERE name LIKE 'zhang_';   -- zhang + one character
```

## Aggregate Functions

| Function | Description |
|----------|-------------|
| `COUNT(*)` | Count rows |
| `SUM(column)` | Sum |
| `AVG(column)` | Average |
| `MAX(column)` | Maximum |
| `MIN(column)` | Minimum |

```sql
-- Count users
SELECT COUNT(*) FROM users;

-- Sum of ages
SELECT SUM(age) FROM users;

-- Average age
SELECT AVG(age) FROM users;

-- Group statistics
SELECT status, COUNT(*) FROM users GROUP BY status;
```

## Table Structure Operations

### Create Table

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

### Modify Table

```sql
-- Add column
ALTER TABLE table_name ADD column_name data_type;

-- Modify column
ALTER TABLE table_name MODIFY column_name data_type;

-- Delete column
ALTER TABLE table_name DROP column_name;

-- Rename table
RENAME TABLE old_name TO new_name;
```

### Delete Table

```sql
DROP TABLE table_name;
```

## Node.js MySQL Operations

### Install mysql Module

```bash
npm install mysql
```

### Create Connection

```javascript
const mysql = require('mysql');

// Create connection pool
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});

// Test connection
db.query('SELECT 1', (err, results) => {
    if (err) return console.log(err.message);
    console.log('Database connected successfully');
});
```

### Query Data

```javascript
// Query all users
db.query('SELECT * FROM users', (err, results) => {
    if (err) return console.log(err.message);
    console.log(results);
});

// Conditional query
db.query('SELECT * FROM users WHERE id = ?', [1], (err, results) => {
    if (err) return console.log(err.message);
    console.log(results);
});
```

### Insert Data

```javascript
// Method 1: Using placeholders
const user = { username: 'tom', password: '123456' };
const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

db.query(sql, [user.username, user.password], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('Insert successful');
    }
});

// Method 2: Using object (recommended)
const user = { username: 'jerry', password: '123456' };
const sql = 'INSERT INTO users SET ?';

db.query(sql, user, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('Insert successful, ID:', results.insertId);
    }
});
```

### Update Data

```javascript
// Method 1
const user = { id: 7, username: 'spike', password: '123000' };
const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';

db.query(sql, [user.username, user.password, user.id], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('Update successful');
    }
});

// Method 2
const user = { id: 7, username: 'spike' };
const sql = 'UPDATE users SET ? WHERE id = ?';

db.query(sql, [user, user.id], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('Update successful');
    }
});
```

### Delete Data

```javascript
// Physical delete
const sql = 'DELETE FROM users WHERE id = ?';

db.query(sql, 7, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('Delete successful');
    }
});

// Soft delete (recommended)
const sql = 'UPDATE users SET status = 1 WHERE id = ?';

db.query(sql, 1, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log('Soft delete successful');
    }
});
```

## Data Types

### Numeric Types

| Type | Description | Range |
|------|-------------|-------|
| `TINYINT` | Small integer | -128 ~ 127 |
| `SMALLINT` | Short integer | -32768 ~ 32767 |
| `INT` | Integer | -2.1B ~ 2.1B |
| `BIGINT` | Big integer | Very large |
| `FLOAT` | Single precision float | |
| `DOUBLE` | Double precision float | |
| `DECIMAL` | Fixed-point number | |

### String Types

| Type | Description | Max Length |
|------|-------------|------------|
| `CHAR` | Fixed-length string | 255 chars |
| `VARCHAR` | Variable-length string | 65535 bytes |
| `TEXT` | Long text | 65535 chars |
| `LONGTEXT` | Very long text | 4GB |

### Date and Time Types

| Type | Description | Format |
|------|-------------|--------|
| `DATE` | Date | YYYY-MM-DD |
| `TIME` | Time | HH:MM:SS |
| `DATETIME` | Date and time | YYYY-MM-DD HH:MM:SS |
| `TIMESTAMP` | Timestamp | YYYY-MM-DD HH:MM:SS |
| `YEAR` | Year | YYYY |

## Constraints

| Constraint | Description |
|------------|-------------|
| `PRIMARY KEY` | Primary key, unique identifier |
| `AUTO_INCREMENT` | Auto-increment |
| `NOT NULL` | Non-null |
| `UNIQUE` | Unique |
| `DEFAULT` | Default value |
| `FOREIGN KEY` | Foreign key |

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

## Multi-table Queries

### Inner Join

```sql
-- Query users and their orders
SELECT u.username, o.amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;
```

### Left Join

```sql
-- Query all users and their orders (including users without orders)
SELECT u.username, o.amount 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;
```

### Right Join

```sql
-- Query all orders and user information
SELECT u.username, o.amount 
FROM users u 
RIGHT JOIN orders o ON u.id = o.user_id;
```
