# Python Basics <Badge type="tip" text="Python 3" />

> [!TIP]
> Python is a concise, elegant, and powerful programming language widely used in web development, data analysis, artificial intelligence, and other fields.

## 📋 Learning Outline

| Chapter | Content | Difficulty |
|---------|---------|------------|
| [Python Installation](#python-installation) | macOS, Windows installation | ⭐ |
| [Running Python](#running-python) | Running scripts, interactive mode | ⭐ |
| [Basic Syntax](#basic-syntax) | Comments, variables, data types | ⭐ |
| [String Operations](#string-operations) | String methods, formatting | ⭐⭐ |
| [List Operations](#list-operations) | Creation, CRUD, slicing | ⭐⭐ |
| [Tuple Operations](#tuple-operations) | Immutable sequences | ⭐ |
| [Dictionary Operations](#dictionary-operations) | Key-value pairs, CRUD | ⭐⭐ |
| [Set Operations](#set-operations) | Deduplication, set operations | ⭐⭐ |
| [Control Flow](#control-flow) | if, while, for, comprehensions | ⭐⭐ |
| [Functions](#functions) | Definition, parameters, return values | ⭐⭐ |
| [File Operations](#file-operations) | Reading and writing files | ⭐⭐ |
| [Exception Handling](#exception-handling) | try/except/finally | ⭐⭐ |
| [Modules and Packages](#modules-and-packages) | import, custom modules | ⭐⭐⭐ |
| [Object-Oriented](#object-oriented) | Classes, objects, inheritance | ⭐⭐⭐ |

## 🎯 Learning Goals

After completing this tutorial, you will be able to:

- ✅ Install and configure Python development environment
- ✅ Master Python basic syntax and data types
- ✅ Use data structures like lists and dictionaries
- ✅ Write functions and classes for modular programming
- ✅ Perform file operations and exception handling

## 🔗 Related Documents

- [Node.js](../Node/index.md) - JavaScript backend
- [Project Cases](../Projects/index.md) - Python application examples


## Python Installation

### macOS Installation

```bash
# Install using Homebrew
brew install python3

# Check version
python3 --version
```

### Windows Installation

1. Visit [Python Official Website](https://www.python.org/downloads/)
2. Download the installer
3. Check "Add Python to PATH" during installation

## Running Python

### Running Python Files

```bash
# Run script
python3 hello.py

# Or
python hello.py
```

### Interactive Mode

```bash
# Enter interactive mode
python3

# Exit interactive mode
exit()
# Or
quit()

# Enter interactive mode after running
python3 -i hello.py
```

## Basic Syntax

### Comments

```python
# Single-line comment

"""
Multi-line comment
Multi-line comment
"""

'''
Can also use single quotes
Multi-line comment
'''
```

### Variables

```python
# Variable assignment
name = "Zhang San"
age = 18
is_student = True

# Multiple variable assignment
a = b = c = 1
x, y, z = 1, 2, 3

# Variable types
# Python is dynamically typed, no type declaration needed
```

### Data Types

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer | `10`, `-5` |
| `float` | Floating point | `3.14`, `-0.5` |
| `str` | String | `"hello"`, `'world'` |
| `bool` | Boolean | `True`, `False` |
| `list` | List | `[1, 2, 3]` |
| `tuple` | Tuple | `(1, 2, 3)` |
| `dict` | Dictionary | `{"name": "Zhang San"}` |
| `set` | Set | `{1, 2, 3}` |
| `None` | Null value | `None` |

### Type Conversion

```python
# To integer
int("10")      # 10
int(3.14)      # 3

# To float
float("3.14")  # 3.14

# To string
str(100)       # "100"

# To list
list("abc")    # ['a', 'b', 'c']

# To tuple
tuple([1,2,3]) # (1, 2, 3)
```

## String Operations

### String Definition

```python
# Single quotes
s1 = 'hello'

# Double quotes
s2 = "world"

# Triple quotes (multi-line string)
s3 = """
This is
multi-line string
"""

# Raw string (no escaping)
path = r"C:\Users\name"
```

### String Methods

```python
s = "Hello World"

# Case conversion
s.upper()       # "HELLO WORLD"
s.lower()       # "hello world"
s.title()       # "Hello World"
s.capitalize()  # "Hello world"

# Search
s.find("World")     # 6 (index)
s.find("Python")    # -1 (not found)
s.index("World")    # 6 (error if not found)
s.count("l")        # 3 (occurrence count)

# Replace
s.replace("World", "Python")  # "Hello Python"

# Split
s.split(" ")         # ["Hello", "World"]
"a,b,c".split(",")  # ["a", "b", "c"]

# Join
"-".join(["a", "b", "c"])  # "a-b-c"

# Strip whitespace
"  hello  ".strip()   # "hello"
"  hello  ".lstrip()  # "hello  "
"  hello  ".rstrip()  # "  hello"

# Check
s.startswith("Hello")  # True
s.endswith("World")    # True
s.isdigit()            # False
"123".isdigit()        # True
s.isalpha()            # False (has space)
```

### String Formatting

```python
name = "Zhang San"
age = 18

# % formatting
print("My name is %s, I'm %d years old" % (name, age))

# format method
print("My name is {}, I'm {} years old".format(name, age))
print("My name is {0}, I'm {1} years old".format(name, age))
print("My name is {name}, I'm {age} years old".format(name=name, age=age))

# f-string (recommended, Python 3.6+)
print(f"My name is {name}, I'm {age} years old")
print(f"Next year I'll be {age + 1}")
```

## List Operations

### Creating Lists

```python
# Empty list
lst = []
lst = list()

# List with elements
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]
```

### List Methods

```python
lst = [1, 2, 3]

# Add elements
lst.append(4)           # [1, 2, 3, 4]
lst.insert(0, 0)        # [0, 1, 2, 3, 4]
lst.extend([5, 6])      # [0, 1, 2, 3, 4, 5, 6]

# Remove elements
lst.remove(3)           # Remove first element with value 3
lst.pop()               # Remove and return last element
lst.pop(0)              # Remove and return element at index 0
del lst[0]              # Delete element at index 0
lst.clear()             # Clear list

# Query
lst.index(2)            # Return index of element 2
lst.count(1)            # Return occurrence count of element 1

# Sort
lst.sort()              # Sort ascending
lst.sort(reverse=True)  # Sort descending
lst.reverse()           # Reverse list

# Copy
new_lst = lst.copy()
```

### List Slicing

```python
lst = [0, 1, 2, 3, 4, 5]

lst[0]       # 0
lst[-1]      # 5 (last element)
lst[1:4]     # [1, 2, 3]
lst[:3]      # [0, 1, 2]
lst[3:]      # [3, 4, 5]
lst[::2]     # [0, 2, 4] (step 2)
lst[::-1]    # [5, 4, 3, 2, 1, 0] (reverse)
```

### List Comprehensions

```python
# Basic syntax
[x for x in range(10)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# With condition
[x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# Process elements
[x**2 for x in range(5)]
# [0, 1, 4, 9, 16]

# Nested loops
[(x, y) for x in [1, 2] for y in ['a', 'b']]
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
```

## Dictionary Operations

### Creating Dictionaries

```python
# Empty dictionary
d = {}
d = dict()

# Dictionary with elements
person = {
    "name": "Zhang San",
    "age": 18,
    "city": "Beijing"
}
```

### Dictionary Operations

```python
person = {"name": "Zhang San", "age": 18}

# Access
person["name"]          # "Zhang San"
person.get("name")      # "Zhang San"
person.get("gender", "unknown")  # "unknown" (default value)

# Add/Modify
person["gender"] = "male"
person["age"] = 19

# Delete
del person["age"]
person.pop("age")
person.popitem()        # Remove and return last key-value pair
person.clear()          # Clear

# Get all keys, values, key-value pairs
person.keys()           # dict_keys(['name', 'age'])
person.values()         # dict_values(['Zhang San', 18])
person.items()          # dict_items([('name', 'Zhang San'), ('age', 18)])

# Update
person.update({"age": 20, "city": "Shanghai"})

# Iterate
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(key, value)
```

## Control Flow

### If Statement

```python
age = 18

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")  # Output
else:
    print("Adult")

# Ternary expression
status = "Adult" if age >= 18 else "Minor"
```

### Comparison Operators

| Operator | Description |
|----------|-------------|
| `==` | Equal to |
| `!=` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

### Logical Operators

```python
# and
age > 18 and age < 60

# or
age < 18 or age > 60

# not
not age > 18

# Shorthand
18 < age < 60
```

## Loops

### For Loop

```python
# Iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterate over string
for char in "hello":
    print(char)

# range function
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)

# Iterate with index
for index, fruit in enumerate(fruits):
    print(index, fruit)

# zip multiple sequences
names = ["Zhang San", "Li Si"]
ages = [18, 20]
for name, age in zip(names, ages):
    print(name, age)
```

### While Loop

```python
count = 0
while count < 5:
    print(count)
    count += 1

# while...else
while count < 5:
    print(count)
    count += 1
else:
    print("Loop ended")
```

### Loop Control

```python
# break - terminate loop
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - skip current iteration
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4

# pass - placeholder
for i in range(5):
    pass  # Do nothing
```

## Functions

### Defining Functions

```python
# Function without parameters
def say_hello():
    print("Hello!")

# Function with parameters
def greet(name):
    print(f"Hello, {name}!")

# With return value
def add(a, b):
    return a + b

# Default parameters
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Zhang San")           # Hello, Zhang San!
greet("Li Si", "Hi")         # Hi, Li Si!

# Keyword arguments
def person_info(name, age, city):
    print(f"{name}, {age} years old, {city}")

person_info(age=18, city="Beijing", name="Zhang San")

# Variable arguments
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3, 4)  # 10

# Keyword variable arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Zhang San", age=18)
```

### Lambda Expressions

```python
# Basic syntax
square = lambda x: x**2
square(5)  # 25

# Multiple parameters
add = lambda x, y: x + y
add(3, 4)  # 7

# As argument
nums = [1, 2, 3, 4, 5]
list(filter(lambda x: x > 3, nums))  # [4, 5]
list(map(lambda x: x**2, nums))      # [1, 4, 9, 16, 25]
```

## File Operations

### Reading Files

```python
# Method 1: Using with (recommended)
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()          # Read all
    lines = f.readlines()       # Read as list

# Method 2: Read line by line
with open('file.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# Modes
# 'r' - Read (default)
# 'w' - Write (overwrite)
# 'a' - Append
# 'b' - Binary mode
```

### Writing Files

```python
# Write
with open('file.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, World!\n')
    f.writelines(['Line 1\n', 'Line 2\n'])

# Append
with open('file.txt', 'a', encoding='utf-8') as f:
    f.write('New line\n')
```

## Exception Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Error occurred: {e}")
else:
    print("Execute when no exception")
finally:
    print("Execute regardless of exception")

# Custom exception
class ValidationError(Exception):
    pass

def validate_age(age):
    if age < 0:
        raise ValidationError("Age cannot be negative")
```

## Common Built-in Functions

| Function | Description | Example |
|----------|-------------|---------|
| `print()` | Print output | `print("Hello")` |
| `input()` | Get input | `name = input("Name: ")` |
| `len()` | Get length | `len([1,2,3])` → 3 |
| `type()` | Get type | `type(123)` → `<class 'int'>` |
| `range()` | Generate sequence | `range(5)` → 0,1,2,3,4 |
| `enumerate()` | Enumerate | `enumerate(['a','b'])` |
| `zip()` | Combine sequences | `zip([1,2], ['a','b'])` |
| `map()` | Map | `map(str, [1,2,3])` |
| `filter()` | Filter | `filter(lambda x: x>0, nums)` |
| `sorted()` | Sort | `sorted([3,1,2])` → `[1,2,3]` |
| `sum()` | Sum | `sum([1,2,3])` → 6 |
| `max()` | Maximum | `max([1,2,3])` → 3 |
| `min()` | Minimum | `min([1,2,3])` → 1 |
| `abs()` | Absolute value | `abs(-5)` → 5 |
| `round()` | Round | `round(3.14)` → 3 |
| `int()` | To integer | `int("10")` → 10 |
| `str()` | To string | `str(123)` → "123" |
| `list()` | To list | `list("abc")` → ['a','b','c'] |
| `dict()` | To dictionary | `dict([('a',1)])` → {'a':1} |
| `set()` | To set | `set([1,2,2])` → {1,2} |
