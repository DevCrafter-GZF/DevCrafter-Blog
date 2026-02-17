layout: doc
layoutClass: m-nav-layout

<style src="../Navigation/nav.css"></style>

# ECharts 配置指南 <Badge type="tip" text="v5.0" />

> [!NOTE]
> 本文档涵盖 ECharts 常用配置项，帮助你快速构建数据可视化图表。


## 📝 title 标题组件

图表的标题配置，用于说明图表内容。

### 基础配置

| 属性        | 类型            | 默认值      | 说明      |
|-----------|---------------|----------|---------|
| `show`    | boolean       | `true`   | 是否显示标题  |
| `text`    | string        | `''`     | 主标题文本   |
| `subtext` | string        | `''`     | 副标题文本   |
| `left`    | string/number | `'auto'` | 离容器左侧距离 |
| `top`     | string/number | `'auto'` | 离容器顶部距离 |
| `right`   | string/number | `'auto'` | 离容器右侧距离 |
| `bottom`  | string/number | `'auto'` | 离容器底部距离 |

### 文本样式 textStyle

::: code-group

```javascript [基础样式]
title: {
  text: '销售数据',
      textStyle
:
  {
    color: '#333',
        fontSize
  :
    18,
        fontWeight
  :
    'bold'
  }
}
```

```javascript [完整配置]
title: {
  text: '年度报表',
      subtext
:
  '2024年数据',
      left
:
  'center',
      textStyle
:
  {
    color: '#1890ff',
        fontSize
  :
    24,
        fontWeight
  :
    700
  }
,
  subtextStyle: {
    color: '#666',
        fontSize
  :
    14
  }
}
```

:::


## 🎨 legend 图例组件

展现不同系列的标记、颜色和名字。

### 基础配置

| 属性           | 类型            | 默认值            | 说明                           |
|--------------|---------------|----------------|------------------------------|
| `type`       | string        | `'plain'`      | 图例类型：`plain`/`scroll`        |
| `orient`     | string        | `'horizontal'` | 布局朝向：`horizontal`/`vertical` |
| `left`       | string/number | `'auto'`       | 左侧距离                         |
| `top`        | string/number | `'auto'`       | 顶部距离                         |
| `itemGap`    | number        | `10`           | 每项间隔                         |
| `itemWidth`  | number        | `25`           | 标记宽度                         |
| `itemHeight` | number        | `14`           | 标记高度                         |

### 图例类型

::: code-group

```javascript [普通图例]
legend: {
  type: 'plain',
      orient
:
  'horizontal',
      bottom
:
  10,
      data
:
  ['销售额', '利润']
}
```

```javascript [滚动图例]
legend: {
  type: 'scroll',
      orient
:
  'vertical',
      right
:
  10,
      top
:
  20,
      bottom
:
  20,
      pageIconColor
:
  '#2f4554',
      pageTextStyle
:
  {
    color: '#333'
  }
}
```

:::

### 自定义图例数据

```javascript
legend: {
  data: [
    {
      name: '系列1',
      icon: 'circle',
      textStyle: {
        color: 'red'
      }
    },
    {
      name: '系列2',
      icon: 'rect',
      textStyle: {
        color: 'blue'
      }
    }
  ]
}
```

> [!TIP]
> 可用图标类型：`circle`、`rect`、`roundRect`、`triangle`、`diamond`、`pin`、`arrow`、`none`


## 💬 tooltip 提示框组件

鼠标悬停时显示的提示框。

### 基础配置

| 属性            | 类型                    | 默认值      | 说明                        |
|---------------|-----------------------|----------|---------------------------|
| `show`        | boolean               | `true`   | 是否显示                      |
| `trigger`     | string                | `'item'` | 触发类型：`item`/`axis`/`none` |
| `axisPointer` | object                | -        | 坐标轴指示器配置                  |
| `formatter`   | string/function       | -        | 内容格式器                     |
| `position`    | string/array/function | -        | 位置                        |

### 触发类型

::: code-group

```javascript [数据项触发 item]
tooltip: {
  trigger: 'item',
      formatter
:
  '{a} <br/>{b}: {c} ({d}%)'
}
```

```javascript [坐标轴触发 axis]
tooltip: {
  trigger: 'axis',
      axisPointer
:
  {
    type: 'cross',
        crossStyle
  :
    {
      color: '#999'
    }
  }
}
```

:::

### 坐标轴指示器类型

| 类型       | 说明      |
|----------|---------|
| `line`   | 直线指示器   |
| `shadow` | 阴影指示器   |
| `cross`  | 十字准星指示器 |
| `none`   | 无指示器    |


## 🧰 toolbox 工具栏组件

内置的工具栏，包含导出图片、数据视图、动态类型切换等功能。

### 基础配置

| 属性         | 类型      | 默认值            | 说明      |
|------------|---------|----------------|---------|
| `show`     | boolean | `true`         | 是否显示    |
| `orient`   | string  | `'horizontal'` | 布局方式    |
| `itemSize` | number  | `15`           | 工具栏图标大小 |
| `itemGap`  | number  | `10`           | 工具栏图标间隔 |
| `feature`  | object  | -              | 各工具配置   |

### 常用工具

```javascript
toolbox: {
  show: true,
      orient
:
  'vertical',
      left
:
  'right',
      top
:
  'center',
      feature
:
  {
    dataView: {
      readOnly: false
    }
  ,      // 数据视图
    restore: {
    }
  ,                        // 还原
    saveAsImage: {
    }
  ,                    // 保存为图片
    dataZoom: {
    }
  ,                       // 区域缩放
    magicType: {                        // 动态类型切换
      type: ['line', 'bar', 'stack']
    }
  }
}
```


## 📐 grid 绘图网格

直角坐标系内绘图区域。

| 属性                | 类型            | 默认值             | 说明        |
|-------------------|---------------|-----------------|-----------|
| `left`            | string/number | `'10%'`         | 左侧距离      |
| `top`             | string/number | `60`            | 顶部距离      |
| `right`           | string/number | `'10%'`         | 右侧距离      |
| `bottom`          | string/number | `60`            | 底部距离      |
| `width`           | string/number | `'auto'`        | 宽度        |
| `height`          | string/number | `'auto'`        | 高度        |
| `containLabel`    | boolean       | `false`         | 是否包含坐标轴标签 |
| `backgroundColor` | string        | `'transparent'` | 背景色       |
| `borderColor`     | string        | `'#ccc'`        | 边框颜色      |
| `borderWidth`     | number        | `1`             | 边框宽度      |

```javascript
grid: {
  left: '3%',
      right
:
  '4%',
      bottom
:
  '3%',
      containLabel
:
  true
}
```

> [!TIP]
> 设置 `containLabel: true` 可自动调整网格大小，防止坐标轴标签被截断。


## 📊 xAxis X轴配置

### 基础属性

| 属性             | 类型            | 默认值          | 说明                           |
|----------------|---------------|--------------|------------------------------|
| `show`         | boolean       | `true`       | 是否显示                         |
| `type`         | string        | `'category'` | 轴类型：value/category/time/log  |
| `position`     | string        | `'bottom'`   | 位置：top/bottom                |
| `name`         | string        | -            | 坐标轴名称                        |
| `nameLocation` | string        | `'end'`      | 名称位置：start/middle/center/end |
| `boundaryGap`  | boolean/array | `true`       | 两边留白策略                       |

### 轴线 axisLine

```javascript
xAxis: {
  axisLine: {
    show: true,
        onZero
  :
    true,
        symbol
  :
    ['none', 'arrow'],
        lineStyle
  :
    {
      color: '#333',
          width
    :
      1,
          type
    :
      'solid'
    }
  }
}
```

### 刻度 axisTick

| 属性               | 类型              | 默认值     | 说明      |
|------------------|-----------------|---------|---------|
| `show`           | boolean         | `true`  | 是否显示    |
| `alignWithLabel` | boolean         | `false` | 刻度与标签对齐 |
| `interval`       | number/function | `auto`  | 显示间隔    |
| `inside`         | boolean         | `false` | 刻度是否朝内  |
| `length`         | number          | `5`     | 刻度长度    |

### 刻度标签 axisLabel

```javascript
xAxis: {
  axisLabel: {
    show: true,
        interval
  :
    0,
        rotate
  :
    45,
        margin
  :
    8,
        color
  :
    '#333',
        fontSize
  :
    12,
        align
  :
    'center',
        verticalAlign
  :
    'middle',
        formatter
  :
    '{value} kg'
  }
}
```

### 分隔线 splitLine

```javascript
xAxis: {
  splitLine: {
    show: true,
        lineStyle
  :
    {
      color: '#eee',
          width
    :
      1,
          type
    :
      'dashed'
    }
  }
}
```


## 📈 yAxis Y轴配置

### 基础属性

| 属性            | 类型                     | 默认值       | 说明            |
|---------------|------------------------|-----------|---------------|
| `show`        | boolean                | `true`    | 是否显示          |
| `type`        | string                 | `'value'` | 轴类型           |
| `position`    | string                 | `'left'`  | 位置：left/right |
| `name`        | string                 | -         | 坐标轴名称         |
| `nameGap`     | number                 | `15`      | 名称与轴线距离       |
| `inverse`     | boolean                | `false`   | 是否反向          |
| `min`         | number/string/function | -         | 最小值           |
| `max`         | number/string/function | -         | 最大值           |
| `splitNumber` | number                 | `5`       | 分割段数          |
| `minInterval` | number                 | `0`       | 最小间隔          |
| `maxInterval` | number                 | -         | 最大间隔          |
| `interval`    | number                 | -         | 强制分割间隔        |

### 坐标轴类型说明

::: code-group

```javascript [数值轴 value]
yAxis: {
  type: 'value',
      min
:
  0,
      max
:
  100,
      interval
:
  20,
      axisLabel
:
  {
    formatter: '{value} °C'
  }
}
```

```javascript [类目轴 category]
yAxis: {
  type: 'category',
      data
:
  ['周一', '周二', '周三', '周四', '周五']
}
```

```javascript [时间轴 time]
yAxis: {
  type: 'time',
      min
:
  '2024-01-01',
      max
:
  '2024-12-31'
}
```

```javascript [对数轴 log]
yAxis: {
  type: 'log',
      logBase
:
  10
}
```

:::

### 名称样式 nameTextStyle

```javascript
yAxis: {
  name: '销售额（万元）',
      nameLocation
:
  'middle',
      nameGap
:
  30,
      nameTextStyle
:
  {
    color: '#333',
        fontSize
  :
    12,
        fontWeight
  :
    'normal'
  }
}
```


## 📊 series 数据系列

数据系列，一组数值以及他们映射成的图。

### 基础配置

| 属性           | 类型                    | 默认值             | 说明                         |
|--------------|-----------------------|-----------------|----------------------------|
| `type`       | string                | -               | 图表类型：line/bar/pie/scatter等 |
| `name`       | string                | -               | 系列名称                       |
| `data`       | array                 | -               | 数据数组                       |
| `stack`      | string                | -               | 数据堆叠                       |
| `smooth`     | boolean/number        | `false`         | 平滑曲线（折线图）                  |
| `symbol`     | string                | `'emptyCircle'` | 标记图形                       |
| `symbolSize` | number/array/function | `4`             | 标记大小                       |
| `label`      | object                | -               | 图形上的文本标签                   |
| `itemStyle`  | object                | -               | 图形样式                       |
| `lineStyle`  | object                | -               | 线条样式                       |
| `areaStyle`  | object                | -               | 区域填充样式                     |

### 图表类型

::: code-group

```javascript [折线图 line]
series: [{
  type: 'line',
  name: '销售额',
  data: [120, 200, 150, 80, 70, 110],
  smooth: true,
  symbol: 'circle',
  symbolSize: 8,
  lineStyle: {
    width: 3,
    type: 'solid'
  }
}]
```

```javascript [柱状图 bar]
series: [{
  type: 'bar',
  name: '销售额',
  data: [120, 200, 150, 80, 70, 110],
  barWidth: '60%',
  itemStyle: {
    color: '#5470c6',
    borderRadius: [4, 4, 0, 0]
  }
}]
```

```javascript [饼图 pie]
series: [{
  type: 'pie',
  name: '访问来源',
  radius: ['40%', '70%'],
  avoidLabelOverlap: false,
  itemStyle: {
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2
  },
  label: {
    show: false,
    position: 'center'
  },
  data: [
    {value: 1048, name: '搜索引擎'},
    {value: 735, name: '直接访问'},
    {value: 580, name: '邮件营销'}
  ]
}]
```

```javascript [散点图 scatter]
series: [{
  type: 'scatter',
  name: '分布',
  data: [[10.0, 8.04], [8.0, 6.95], [13.0, 7.58]],
  symbolSize: 20
}]
```

:::


## 🗺️ visualMap 视觉映射

用于地图等图表的数据映射图例。

| 属性           | 类型            | 默认值            | 说明                      |
|--------------|---------------|----------------|-------------------------|
| `type`       | string        | `'continuous'` | 类型：continuous/piecewise |
| `min`        | number        | `0`            | 最小值                     |
| `max`        | number        | `200`          | 最大值                     |
| `left`       | string/number | `'auto'`       | 左侧距离                    |
| `top`        | string/number | `'auto'`       | 顶部距离                    |
| `orient`     | string        | `'vertical'`   | 布局朝向                    |
| `calculable` | boolean       | `true`         | 是否显示拖拽手柄                |
| `inRange`    | object        | -              | 定义范围颜色                  |

::: code-group

```javascript [连续型 continuous]
visualMap: {
  type: 'continuous',
      min
:
  0,
      max
:
  100,
      left
:
  'left',
      top
:
  'bottom',
      text
:
  ['高', '低'],
      calculable
:
  true,
      inRange
:
  {
    color: ['#e0ffff', '#006edd']
  }
}
```

```javascript [分段型 piecewise]
visualMap: {
  type: 'piecewise',
      left
:
  '5%',
      bottom
:
  '5%',
      pieces
:
  [
    {min: 60, label: '优秀', color: '#00CC00'},
    {min: 30, max: 60, label: '良好', color: '#F4FF00'},
    {max: 30, label: '需改进', color: '#FF0000'}
  ]
}
```

:::


## 🔍 dataZoom 区域缩放组件

用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体。

### 基础配置

| 属性           | 类型                 | 默认值        | 说明               |
|--------------|--------------------|------------|------------------|
| `type`       | string             | `'slider'` | 类型：slider/inside |
| `show`       | boolean            | `true`     | 是否显示             |
| `xAxisIndex` | number/array       | -          | 控制X轴索引           |
| `yAxisIndex` | number/array       | -          | 控制Y轴索引           |
| `start`      | number             | `0`        | 数据窗口范围起始百分比      |
| `end`        | number             | `100`      | 数据窗口范围结束百分比      |
| `startValue` | number/string/date | -          | 数据窗口范围起始数值       |
| `endValue`   | number/string/date | -          | 数据窗口范围结束数值       |

::: code-group

```javascript [滑动条型 slider]
dataZoom: [{
  type: 'slider',
  show: true,
  xAxisIndex: [0],
  start: 0,
  end: 100,
  bottom: 10
}]
```

```javascript [内置型 inside]
dataZoom: [{
  type: 'inside',
  xAxisIndex: [0],
  start: 0,
  end: 100,
  zoomOnMouseWheel: true,
  moveOnMouseMove: true
}]
```

:::


## 🎯 完整示例

::: details 点击查看柱状图完整配置

```javascript
option = {
  title: {
    text: '月度销售数据',
    subtext: '2024年上半年',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['销售额', '利润'],
    bottom: 10
  },
  toolbox: {
    feature: {
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      rotate: 30
    }
  },
  yAxis: {
    type: 'value',
    name: '金额（万元）',
    minInterval: 1
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100
  }, {
    start: 0,
    end: 100
  }],
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        color: '#5470c6'
      }
    },
    {
      name: '利润',
      type: 'bar',
      data: [60, 100, 75, 40, 35, 55],
      itemStyle: {
        color: '#91cc75'
      }
    }
  ]
}
```

:::


## 📚 速查表

### 组件列表

| 组件          | 英文名称       | 主要用途 |
|-------------|------------|------|
| `title`     | Title      | 图表标题 |
| `legend`    | Legend     | 图例说明 |
| `tooltip`   | Tooltip    | 提示框  |
| `toolbox`   | Toolbox    | 工具栏  |
| `grid`      | Grid       | 绘图区域 |
| `xAxis`     | X Axis     | X轴配置 |
| `yAxis`     | Y Axis     | Y轴配置 |
| `series`    | Series     | 数据系列 |
| `visualMap` | Visual Map | 视觉映射 |
| `dataZoom`  | Data Zoom  | 区域缩放 |

### 图表类型

| 类型              | 英文             | 说明      |
|-----------------|----------------|---------|
| `line`          | Line Chart     | 折线图     |
| `bar`           | Bar Chart      | 柱状图     |
| `pie`           | Pie Chart      | 饼图      |
| `scatter`       | Scatter Chart  | 散点图     |
| `effectScatter` | Effect Scatter | 涟漪特效散点图 |
| `radar`         | Radar Chart    | 雷达图     |
| `tree`          | Tree Chart     | 树图      |
| `treemap`       | Treemap        | 矩形树图    |
| `sunburst`      | Sunburst       | 旭日图     |
| `gauge`         | Gauge          | 仪表盘     |
| `funnel`        | Funnel         | 漏斗图     |
| `map`           | Map            | 地图      |
| `heatmap`       | Heatmap        | 热力图     |
| `graph`         | Graph          | 关系图     |

> [!TIP]
> 💡 更多配置请参考 [ECharts 官方文档](https://echarts.apache.org/zh/option.html)
