# Regular Expressions <Badge type="tip" text="RegExp" />

> [!TIP]
> Regular expressions are powerful tools for string processing, used for pattern matching, search and replace, and form validation.

## 📋 Learning Outline

| Chapter | Content | Difficulty |
|---------|---------|------------|
| [Creating Regex](#creating-regular-expressions) | Literal, Constructor | ⭐ |
| [Test Methods](#test-methods) | test, exec | ⭐⭐ |
| [Boundary Symbols](#boundary-symbols) | ^, $, Exact Match | ⭐⭐ |
| [Character Classes](#character-classes) | [], Range, Negation | ⭐⭐ |
| [Quantifiers](#quantifiers) | *, +, ?, {n}, {n,m} | ⭐⭐ |
| [Predefined Classes](#predefined-classes) | \d, \w, \s, etc. | ⭐⭐ |
| [Common Examples](#common-regex-examples) | Phone, Email, ID Card | ⭐⭐⭐ |
| [Match Modes](#match-modes) | i, g, ig | ⭐⭐ |
| [Grouping](#grouping) | (), Capture Groups | ⭐⭐⭐ |
| [Regex & String Methods](#regex-and-string-methods) | match, replace, search, split | ⭐⭐ |

## 🎯 Learning Goals

After completing this tutorial, you will be able to:

- ✅ Create and use regular expressions for string matching
- ✅ Master various metacharacters and quantifiers
- ✅ Write common form validation regex (phone, email, etc.)
- ✅ Use regex for string search and replace

## 🔗 Related Documentation

- [JavaScript Complete Guide](../fundamentals/javascript.md) - String manipulation methods
- [Vue Complete Guide](../frameworks/vue.md) - Form validation applications


## Creating Regular Expressions

### Method 1: Literal Notation

```javascript
const reg = /abc/;
```

### Method 2: Constructor

```javascript
const reg = new RegExp(/abc/);
const reg = new RegExp('abc');
```

## Test Methods

### test Method

```javascript
// Test if string matches the regex pattern
const reg = /abc/;
reg.test('abc');  // true
reg.test('def');  // false
```

### exec Method

```javascript
// Search for matches in a string
const str = 'hello';
const pattern = /o/;
pattern.exec(str);  // ['o', index: 4, ...]
```

## Boundary Symbols

| Symbol | Description | Example |
|--------|-------------|---------|
| `^` | Start of string | `/^abc/` |
| `$` | End of string | `/abc$/` |
| `^$` | Exact match | `/^abc$/` |

```javascript
/^abc/;    // Starts with abc
/abc$/;    // Ends with abc
/^abc$/;   // Exactly matches abc
```

## Character Classes

### Square Brackets

```javascript
/[abc]/;       // Matches any of a, b, or c
/[^abc]/;      // Matches any character except a, b, c
/[a-z]/;       // Matches any lowercase letter
/[A-Z]/;       // Matches any uppercase letter
/[0-9]/;       // Matches any digit
/[a-zA-Z0-9]/; // Matches any letter or digit
```

## Quantifiers

| Symbol | Description | Example |
|--------|-------------|---------|
| `*` | 0 or more times | `/a*/` |
| `+` | 1 or more times | `/a+/` |
| `?` | 0 or 1 time | `/a?/` |
| `{n}` | Exactly n times | `/a{3}/` |
| `{n,}` | n or more times | `/a{3,}/` |
| `{n,m}` | Between n and m times | `/a{3,6}/` |

```javascript
/a*/;      // a appears 0 or more times
/a+/;      // a appears 1 or more times
/a?/;      // a appears 0 or 1 time
/a{3}/;    // a appears exactly 3 times
/a{3,}/;   // a appears 3 or more times
/a{3,6}/;  // a appears between 3 to 6 times
```

## Predefined Classes

| Symbol | Description | Equivalent |
|--------|-------------|------------|
| `\d` | Digit | `[0-9]` |
| `\D` | Non-digit | `[^0-9]` |
| `\w` | Word character (letter, digit, underscore) | `[a-zA-Z0-9_]` |
| `\W` | Non-word character | `[^a-zA-Z0-9_]` |
| `\s` | Whitespace (space, tab, newline) |  |
| `\S` | Non-whitespace |  |

## OR Operator

```javascript
// | means OR
const reg = /^(aaa)|(bbb)$/;
```

## Common Regex Examples

### Landline Phone Number

```javascript
const reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
```

### Mobile Phone Number (China)

```javascript
const reg = /^1[3-9]\d{9}$/;
```

### QQ Number

```javascript
const reg = /^[1-9]\d{4,}$/;
```

### Chinese Characters

```javascript
const reg = /[\u4e00-\u9fa5]/;
```

### Email

```javascript
const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
```

### ID Card Number (China)

```javascript
const reg = /^\d{15}|\d{18}$/;
```

### Username (Letters, Digits, Underscore, 4-16 characters)

```javascript
const reg = /^[a-zA-Z0-9_]{4,16}$/;
```

### Password (6-20 characters, at least one letter and one digit)

```javascript
const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
```

### URL

```javascript
const reg = /^https?:\/\/.+/;
```

### IPv4 Address

```javascript
const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
```

## Match Modes

### Case Insensitive

```javascript
/abc/i;  // Case insensitive
```

### Global Match

```javascript
/abc/g;  // Match all occurrences
```

### Combined Usage

```javascript
/abc/ig;  // Case insensitive + Global match
```

## Grouping

```javascript
// () creates a capture group
const reg = /{{ ([a-zA-Z]+) }}/;
const str = '{{name}}';
const result = reg.exec(str);
// result[0] = '{{name}}'
// result[1] = 'name'
```

### Non-capturing Group

```javascript
// (?:) creates a non-capturing group
const reg = /(?:https?:\/\/)?(www\.\w+\.com)/;
```

### Named Capture Groups (ES2018)

```javascript
const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const result = '2024-01-15'.match(reg);
// result.groups.year = '2024'
// result.groups.month = '01'
// result.groups.day = '15'
```

## Brackets Summary

| Brackets | Purpose |
|----------|---------|
| `{}` | Quantifier, specifies repetition count |
| `[]` | Character set, matches any character inside |
| `()` | Grouping, sets precedence and captures |

## Regex and String Methods

### match

```javascript
// Returns array of matches
str.match(/abc/g);
```

### replace

```javascript
// Replace matched content
str.replace(/abc/g, 'def');
```

### search

```javascript
// Returns index of match
str.search(/abc/);
```

### split

```javascript
// Split string by regex
str.split(/\s+/);
```

## Practical Examples

### Extract All Numbers

```javascript
const str = 'Price: $100, Quantity: 5';
const numbers = str.match(/\d+/g);  // ['100', '5']
```

### Remove Extra Whitespace

```javascript
const str = '  hello   world  ';
const clean = str.replace(/\s+/g, ' ').trim();  // 'hello world'
```

### Validate Hex Color

```javascript
const reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
reg.test('#FF5733');  // true
reg.test('#F53');     // true
```

### Match HTML Tags

```javascript
const reg = /<([a-z][a-z0-9]*)\b[^>]*>/gi;
const html = '<div class="test">Hello</div>';
const tags = html.match(reg);  // ['<div class="test">']
```


> [!TIP]
> **Learning Tips**
> 1. Start with simple patterns and gradually build complexity
> 2. Use online regex testers (regex101.com, regexr.com) to debug patterns
> 3. Comment complex regex patterns for maintainability
> 4. Consider using string methods for simple operations instead of regex
