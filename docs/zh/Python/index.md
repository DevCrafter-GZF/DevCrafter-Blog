# Python 基础 <Badge type="tip" text="Python 3" />

> [!TIP]
> Python 是一门简洁优雅、功能强大的编程语言，广泛应用于 Web 开发、数据分析、人工智能等领域。

## 📋 学习大纲

| 章节 | 内容 | 难度 |
|------|------|------|
| [Python 安装](#一-python-安装) | macOS、Windows 安装 | ⭐ |
| [运行 Python](#二-运行-python) | 运行脚本、交互式模式 | ⭐ |
| [基础语法](#三-基础语法) | 注释、变量、数据类型 | ⭐ |
| [字符串操作](#四-字符串操作) | 字符串方法、格式化 | ⭐⭐ |
| [列表操作](#五-列表操作) | 创建、增删改查、切片 | ⭐⭐ |
| [元组操作](#六-元组操作) | 不可变序列 | ⭐ |
| [字典操作](#七-字典操作) | 键值对、增删改查 | ⭐⭐ |
| [集合操作](#八-集合操作) | 去重、集合运算 | ⭐⭐ |
| [流程控制](#九-流程控制) | if、while、for、推导式 | ⭐⭐ |
| [函数](#十-函数) | 定义、参数、返回值 | ⭐⭐ |
| [文件操作](#十一-文件操作) | 读写文件 | ⭐⭐ |
| [异常处理](#十二-异常处理) | try/except/finally | ⭐⭐ |
| [模块与包](#十三-模块与包) | import、自定义模块 | ⭐⭐⭐ |
| [面向对象](#十四-面向对象) | 类、对象、继承 | ⭐⭐⭐ |

## 🎯 学习目标

完成本教程后，你将能够：

- ✅ 安装配置 Python 开发环境
- ✅ 掌握 Python 基础语法和数据类型
- ✅ 使用列表、字典等数据结构
- ✅ 编写函数和类进行模块化编程
- ✅ 进行文件操作和异常处理

## 🔗 相关文档

- [Node.js](../Node/index.md) - JavaScript 后端
- [项目实战](../Projects/index.md) - Python 应用案例


## Python 安装

### macOS 安装

```bash
# 使用 Homebrew 安装
brew install python3

# 查看版本
python3 --version
```

### Windows 安装

1. 访问 [Python 官网](https://www.python.org/downloads/)
2. 下载安装程序
3. 安装时勾选 "Add Python to PATH"

## 运行 Python

### 运行 Python 文件

```bash
# 运行脚本
python3 hello.py

# 或
python hello.py
```

### 交互式模式

```bash
# 进入交互式
python3

# 退出交互式
exit()
# 或
quit()

# 运行后进入交互式
python3 -i hello.py
```

## 基础语法

### 注释

```python
# 单行注释

"""
多行注释
多行注释
"""

'''
也可以用单引号
多行注释
'''
```

### 变量

```python
# 变量赋值
name = "张三"
age = 18
is_student = True

# 多变量赋值
a = b = c = 1
x, y, z = 1, 2, 3

# 变量类型
# Python 是动态类型语言，不需要声明类型
```

### 数据类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `int` | 整数 | `10`, `-5` |
| `float` | 浮点数 | `3.14`, `-0.5` |
| `str` | 字符串 | `"hello"`, `'world'` |
| `bool` | 布尔值 | `True`, `False` |
| `list` | 列表 | `[1, 2, 3]` |
| `tuple` | 元组 | `(1, 2, 3)` |
| `dict` | 字典 | `{"name": "张三"}` |
| `set` | 集合 | `{1, 2, 3}` |
| `None` | 空值 | `None` |

### 类型转换

```python
# 转整数
int("10")      # 10
int(3.14)      # 3

# 转浮点数
float("3.14")  # 3.14

# 转字符串
str(100)       # "100"

# 转列表
list("abc")    # ['a', 'b', 'c']

# 转元组
tuple([1,2,3]) # (1, 2, 3)
```

## 字符串操作

### 字符串定义

```python
# 单引号
s1 = 'hello'

# 双引号
s2 = "world"

# 三引号（多行字符串）
s3 = """
这是
多行字符串
"""

# 原始字符串（不转义）
path = r"C:\Users\name"
```

### 字符串方法

```python
s = "Hello World"

# 大小写
s.upper()       # "HELLO WORLD"
s.lower()       # "hello world"
s.title()       # "Hello World"
s.capitalize()  # "Hello world"

# 查找
s.find("World")     # 6（索引）
s.find("Python")    # -1（未找到）
s.index("World")    # 6（未找到会报错）
s.count("l")        # 3（出现次数）

# 替换
s.replace("World", "Python")  # "Hello Python"

# 分割
s.split(" ")         # ["Hello", "World"]
"a,b,c".split(",")  # ["a", "b", "c"]

# 连接
"-".join(["a", "b", "c"])  # "a-b-c"

# 去除空白
"  hello  ".strip()   # "hello"
"  hello  ".lstrip()  # "hello  "
"  hello  ".rstrip()  # "  hello"

# 判断
s.startswith("Hello")  # True
s.endswith("World")    # True
s.isdigit()            # False
"123".isdigit()        # True
s.isalpha()            # False（有空格）
```

### 字符串格式化

```python
name = "张三"
age = 18

# % 格式化
print("我叫%s，今年%d岁" % (name, age))

# format 方法
print("我叫{}，今年{}岁".format(name, age))
print("我叫{0}，今年{1}岁".format(name, age))
print("我叫{name}，今年{age}岁".format(name=name, age=age))

# f-string（推荐，Python 3.6+）
print(f"我叫{name}，今年{age}岁")
print(f"明年{age + 1}岁")
```

## 列表操作

### 创建列表

```python
# 空列表
lst = []
lst = list()

# 有元素的列表
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]
```

### 列表方法

```python
lst = [1, 2, 3]

# 添加元素
lst.append(4)           # [1, 2, 3, 4]
lst.insert(0, 0)        # [0, 1, 2, 3, 4]
lst.extend([5, 6])      # [0, 1, 2, 3, 4, 5, 6]

# 删除元素
lst.remove(3)           # 删除第一个值为3的元素
lst.pop()               # 删除并返回最后一个元素
lst.pop(0)              # 删除并返回索引0的元素
del lst[0]              # 删除索引0的元素
lst.clear()             # 清空列表

# 查询
lst.index(2)            # 返回元素2的索引
lst.count(1)            # 返回元素1的出现次数

# 排序
lst.sort()              # 升序排序
lst.sort(reverse=True)  # 降序排序
lst.reverse()           # 反转列表

# 复制
new_lst = lst.copy()
```

### 列表切片

```python
lst = [0, 1, 2, 3, 4, 5]

lst[0]       # 0
lst[-1]      # 5（最后一个）
lst[1:4]     # [1, 2, 3]
lst[:3]      # [0, 1, 2]
lst[3:]      # [3, 4, 5]
lst[::2]     # [0, 2, 4]（步长为2）
lst[::-1]    # [5, 4, 3, 2, 1, 0]（反转）
```

### 列表推导式

```python
# 基本语法
[x for x in range(10)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 带条件
[x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# 处理元素
[x**2 for x in range(5)]
# [0, 1, 4, 9, 16]

# 双重循环
[(x, y) for x in [1, 2] for y in ['a', 'b']]
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
```

## 字典操作

### 创建字典

```python
# 空字典
d = {}
d = dict()

# 有元素的字典
person = {
    "name": "张三",
    "age": 18,
    "city": "北京"
}
```

### 字典操作

```python
person = {"name": "张三", "age": 18}

# 访问
person["name"]          # "张三"
person.get("name")      # "张三"
person.get("gender", "未知")  # "未知"（默认值）

# 添加/修改
person["gender"] = "男"
person["age"] = 19

# 删除
del person["age"]
person.pop("age")
person.popitem()        # 删除并返回最后一个键值对
person.clear()          # 清空

# 获取所有键、值、键值对
person.keys()           # dict_keys(['name', 'age'])
person.values()         # dict_values(['张三', 18])
person.items()          # dict_items([('name', '张三'), ('age', 18)])

# 更新
person.update({"age": 20, "city": "上海"})

# 遍历
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(key, value)
```

## 条件语句

### if 语句

```python
age = 18

if age < 13:
    print("儿童")
elif age < 20:
    print("青少年")  # 输出
else:
    print("成年人")

# 三元表达式
status = "成年" if age >= 18 else "未成年"
```

### 比较运算符

| 运算符 | 说明 |
|--------|------|
| `==` | 等于 |
| `!=` | 不等于 |
| `>` | 大于 |
| `<` | 小于 |
| `>=` | 大于等于 |
| `<=` | 小于等于 |

### 逻辑运算符

```python
# and（与）
age > 18 and age < 60

# or（或）
age < 18 or age > 60

# not（非）
not age > 18

# 简写
18 < age < 60
```

## 循环

### for 循环

```python
# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 遍历字符串
for char in "hello":
    print(char)

# range 函数
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)

# 带索引遍历
for index, fruit in enumerate(fruits):
    print(index, fruit)

# zip 同时遍历多个序列
names = ["张三", "李四"]
ages = [18, 20]
for name, age in zip(names, ages):
    print(name, age)
```

### while 循环

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
    print("循环结束")
```

### 循环控制

```python
# break - 终止循环
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - 跳过当前迭代
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4

# pass - 占位符
for i in range(5):
    pass  # 什么都不做
```

## 函数

### 定义函数

```python
# 无参数函数
def say_hello():
    print("Hello!")

# 有参数函数
def greet(name):
    print(f"Hello, {name}!")

# 带返回值
def add(a, b):
    return a + b

# 默认参数
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("张三")           # Hello, 张三!
greet("李四", "Hi")     # Hi, 李四!

# 关键字参数
def person_info(name, age, city):
    print(f"{name}, {age}岁, {city}")

person_info(age=18, city="北京", name="张三")

# 可变参数
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3, 4)  # 10

# 关键字可变参数
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="张三", age=18)
```

### Lambda 表达式

```python
# 基本语法
square = lambda x: x**2
square(5)  # 25

# 多参数
add = lambda x, y: x + y
add(3, 4)  # 7

# 作为参数
nums = [1, 2, 3, 4, 5]
list(filter(lambda x: x > 3, nums))  # [4, 5]
list(map(lambda x: x**2, nums))      # [1, 4, 9, 16, 25]
```

## 文件操作

### 读取文件

```python
# 方式1：使用 with（推荐）
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()          # 读取全部
    lines = f.readlines()       # 读取为列表

# 方式2：逐行读取
with open('file.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# 模式
# 'r' - 读取（默认）
# 'w' - 写入（覆盖）
# 'a' - 追加
# 'b' - 二进制模式
```

### 写入文件

```python
# 写入
with open('file.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, World!\n')
    f.writelines(['Line 1\n', 'Line 2\n'])

# 追加
with open('file.txt', 'a', encoding='utf-8') as f:
    f.write('New line\n')
```

## 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"发生错误: {e}")
else:
    print("没有异常时执行")
finally:
    print("无论有无异常都执行")

# 自定义异常
class ValidationError(Exception):
    pass

def validate_age(age):
    if age < 0:
        raise ValidationError("年龄不能为负数")
```

## 常用内置函数

| 函数 | 说明 | 示例 |
|------|------|------|
| `print()` | 打印输出 | `print("Hello")` |
| `input()` | 获取输入 | `name = input("姓名：")` |
| `len()` | 获取长度 | `len([1,2,3])` → 3 |
| `type()` | 获取类型 | `type(123)` → `<class 'int'>` |
| `range()` | 生成序列 | `range(5)` → 0,1,2,3,4 |
| `enumerate()` | 枚举 | `enumerate(['a','b'])` |
| `zip()` | 合并序列 | `zip([1,2], ['a','b'])` |
| `map()` | 映射 | `map(str, [1,2,3])` |
| `filter()` | 过滤 | `filter(lambda x: x>0, nums)` |
| `sorted()` | 排序 | `sorted([3,1,2])` → `[1,2,3]` |
| `sum()` | 求和 | `sum([1,2,3])` → 6 |
| `max()` | 最大值 | `max([1,2,3])` → 3 |
| `min()` | 最小值 | `min([1,2,3])` → 1 |
| `abs()` | 绝对值 | `abs(-5)` → 5 |
| `round()` | 四舍五入 | `round(3.14)` → 3 |
| `int()` | 转整数 | `int("10")` → 10 |
| `str()` | 转字符串 | `str(123)` → "123" |
| `list()` | 转列表 | `list("abc")` → ['a','b','c'] |
| `dict()` | 转字典 | `dict([('a',1)])` → {'a':1} |
| `set()` | 转集合 | `set([1,2,2])` → {1,2} |
