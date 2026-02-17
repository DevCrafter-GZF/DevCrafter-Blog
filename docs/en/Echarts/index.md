layout: doc
layoutClass: m-nav-layout

<style src="../Navigation/nav.css"></style>

# ECharts Configuration Guide <Badge type="tip" text="v5.0" />

> [!NOTE]
> This document covers common ECharts configuration options to help you quickly build data visualization charts.


## 📝 title Component

Chart title configuration used to describe the chart content.

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display the title |
| `text` | string | `''` | Main title text |
| `subtext` | string | `''` | Subtitle text |
| `left` | string/number | `'auto'` | Distance from left of container |
| `top` | string/number | `'auto'` | Distance from top of container |
| `right` | string/number | `'auto'` | Distance from right of container |
| `bottom` | string/number | `'auto'` | Distance from bottom of container |

### Text Style textStyle

::: code-group

```javascript [Basic Style]
title: {
  text: 'Sales Data',
  textStyle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  }
}
```

```javascript [Full Configuration]
title: {
  text: 'Annual Report',
  subtext: '2024 Data',
  left: 'center',
  textStyle: {
    color: '#1890ff',
    fontSize: 24,
    fontWeight: 700
  },
  subtextStyle: {
    color: '#666',
    fontSize: 14
  }
}
```

:::


## 🎨 legend Component

Displays markers, colors, and names of different series.

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | `'plain'` | Legend type: `plain`/`scroll` |
| `orient` | string | `'horizontal'` | Layout orientation: `horizontal`/`vertical` |
| `left` | string/number | `'auto'` | Distance from left |
| `top` | string/number | `'auto'` | Distance from top |
| `itemGap` | number | `10` | Gap between items |
| `itemWidth` | number | `25` | Marker width |
| `itemHeight` | number | `14` | Marker height |

### Legend Types

::: code-group

```javascript [Plain Legend]
legend: {
  type: 'plain',
  orient: 'horizontal',
  bottom: 10,
  data: ['Sales', 'Profit']
}
```

```javascript [Scroll Legend]
legend: {
  type: 'scroll',
  orient: 'vertical',
  right: 10,
  top: 20,
  bottom: 20,
  pageIconColor: '#2f4554',
  pageTextStyle: {
    color: '#333'
  }
}
```

:::

### Custom Legend Data

```javascript
legend: {
  data: [
    {
      name: 'Series 1',
      icon: 'circle',
      textStyle: {
        color: 'red'
      }
    },
    {
      name: 'Series 2',
      icon: 'rect',
      textStyle: {
        color: 'blue'
      }
    }
  ]
}
```

> [!TIP]
> Available icon types: `circle`, `rect`, `roundRect`, `triangle`, `diamond`, `pin`, `arrow`, `none`


## 💬 tooltip Component

Tooltip displayed on mouse hover.

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display |
| `trigger` | string | `'item'` | Trigger type: `item`/`axis`/`none` |
| `axisPointer` | object | - | Axis pointer configuration |
| `formatter` | string/function | - | Content formatter |
| `position` | string/array/function | - | Position |

### Trigger Types

::: code-group

```javascript [Item Trigger]
tooltip: {
  trigger: 'item',
  formatter: '{a} <br/>{b}: {c} ({d}%)'
}
```

```javascript [Axis Trigger]
tooltip: {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
    crossStyle: {
      color: '#999'
    }
  }
}
```

:::

### Axis Pointer Types

| Type | Description |
|------|-------------|
| `line` | Line pointer |
| `shadow` | Shadow pointer |
| `cross` | Crosshair pointer |
| `none` | No pointer |


## 🧰 toolbox Component

Built-in toolbar with features like export image, data view, dynamic type switching.

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display |
| `orient` | string | `'horizontal'` | Layout orientation |
| `itemSize` | number | `15` | Toolbar icon size |
| `itemGap` | number | `10` | Toolbar icon gap |
| `feature` | object | - | Tool configurations |

### Common Tools

```javascript
toolbox: {
  show: true,
  orient: 'vertical',
  left: 'right',
  top: 'center',
  feature: {
    dataView: { readOnly: false },      // Data view
    restore: {},                        // Restore
    saveAsImage: {},                    // Save as image
    dataZoom: {},                       // Data zoom
    magicType: {                        // Dynamic type switch
      type: ['line', 'bar', 'stack']
    }
  }
}
```


## 📐 grid Component

Drawing area within the Cartesian coordinate system.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `left` | string/number | `'10%'` | Distance from left |
| `top` | string/number | `60` | Distance from top |
| `right` | string/number | `'10%'` | Distance from right |
| `bottom` | string/number | `60` | Distance from bottom |
| `width` | string/number | `'auto'` | Width |
| `height` | string/number | `'auto'` | Height |
| `containLabel` | boolean | `false` | Whether to include axis labels |
| `backgroundColor` | string | `'transparent'` | Background color |
| `borderColor` | string | `'#ccc'` | Border color |
| `borderWidth` | number | `1` | Border width |

```javascript
grid: {
  left: '3%',
  right: '4%',
  bottom: '3%',
  containLabel: true
}
```

> [!TIP]
> Setting `containLabel: true` automatically adjusts grid size to prevent axis labels from being cut off.


## 📊 xAxis Configuration

### Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display |
| `type` | string | `'category'` | Axis type: value/category/time/log |
| `position` | string | `'bottom'` | Position: top/bottom |
| `name` | string | - | Axis name |
| `nameLocation` | string | `'end'` | Name location: start/middle/center/end |
| `boundaryGap` | boolean/array | `true` | Gap strategy on both sides |

### Axis Line axisLine

```javascript
xAxis: {
  axisLine: {
    show: true,
    onZero: true,
    symbol: ['none', 'arrow'],
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid'
    }
  }
}
```

### Axis Tick axisTick

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display |
| `alignWithLabel` | boolean | `false` | Align tick with label |
| `interval` | number/function | `auto` | Display interval |
| `inside` | boolean | `false` | Tick inside |
| `length` | number | `5` | Tick length |

### Axis Label axisLabel

```javascript
xAxis: {
  axisLabel: {
    show: true,
    interval: 0,
    rotate: 45,
    margin: 8,
    color: '#333',
    fontSize: 12,
    align: 'center',
    verticalAlign: 'middle',
    formatter: '{value} kg'
  }
}
```

### Split Line splitLine

```javascript
xAxis: {
  splitLine: {
    show: true,
    lineStyle: {
      color: '#eee',
      width: 1,
      type: 'dashed'
    }
  }
}
```


## 📈 yAxis Configuration

### Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `show` | boolean | `true` | Whether to display |
| `type` | string | `'value'` | Axis type |
| `position` | string | `'left'` | Position: left/right |
| `name` | string | - | Axis name |
| `nameGap` | number | `15` | Distance between name and axis |
| `inverse` | boolean | `false` | Whether to inverse |
| `min` | number/string/function | - | Minimum value |
| `max` | number/string/function | - | Maximum value |
| `splitNumber` | number | `5` | Number of segments |
| `minInterval` | number | `0` | Minimum interval |
| `maxInterval` | number | - | Maximum interval |
| `interval` | number | - | Forced split interval |

### Axis Type Descriptions

::: code-group

```javascript [Value Axis]
yAxis: {
  type: 'value',
  min: 0,
  max: 100,
  interval: 20,
  axisLabel: {
    formatter: '{value} °C'
  }
}
```

```javascript [Category Axis]
yAxis: {
  type: 'category',
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
}
```

```javascript [Time Axis]
yAxis: {
  type: 'time',
  min: '2024-01-01',
  max: '2024-12-31'
}
```

```javascript [Log Axis]
yAxis: {
  type: 'log',
  logBase: 10
}
```

:::

### Name Style nameTextStyle

```javascript
yAxis: {
  name: 'Sales (10k)',
  nameLocation: 'middle',
  nameGap: 30,
  nameTextStyle: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'normal'
  }
}
```


## 📊 series Data Series

A series of data and the graph mapped from them.

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | - | Chart type: line/bar/pie/scatter etc. |
| `name` | string | - | Series name |
| `data` | array | - | Data array |
| `stack` | string | - | Data stack |
| `smooth` | boolean/number | `false` | Smooth curve (line chart) |
| `symbol` | string | `'emptyCircle'` | Mark symbol |
| `symbolSize` | number/array/function | `4` | Symbol size |
| `label` | object | - | Text label on graphic |
| `itemStyle` | object | - | Graphic style |
| `lineStyle` | object | - | Line style |
| `areaStyle` | object | - | Area fill style |

### Chart Types

::: code-group

```javascript [Line Chart]
series: [{
  type: 'line',
  name: 'Sales',
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

```javascript [Bar Chart]
series: [{
  type: 'bar',
  name: 'Sales',
  data: [120, 200, 150, 80, 70, 110],
  barWidth: '60%',
  itemStyle: {
    color: '#5470c6',
    borderRadius: [4, 4, 0, 0]
  }
}]
```

```javascript [Pie Chart]
series: [{
  type: 'pie',
  name: 'Traffic Source',
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
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' }
  ]
}]
```

```javascript [Scatter Chart]
series: [{
  type: 'scatter',
  name: 'Distribution',
  data: [[10.0, 8.04], [8.0, 6.95], [13.0, 7.58]],
  symbolSize: 20
}]
```

:::


## 🗺️ visualMap Component

Visual mapping component for maps and other charts.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | `'continuous'` | Type: continuous/piecewise |
| `min` | number | `0` | Minimum value |
| `max` | number | `200` | Maximum value |
| `left` | string/number | `'auto'` | Distance from left |
| `top` | string/number | `'auto'` | Distance from top |
| `orient` | string | `'vertical'` | Layout orientation |
| `calculable` | boolean | `true` | Whether to show drag handles |
| `inRange` | object | - | Define range colors |

::: code-group

```javascript [Continuous]
visualMap: {
  type: 'continuous',
  min: 0,
  max: 100,
  left: 'left',
  top: 'bottom',
  text: ['High', 'Low'],
  calculable: true,
  inRange: {
    color: ['#e0ffff', '#006edd']
  }
}
```

```javascript [Piecewise]
visualMap: {
  type: 'piecewise',
  left: '5%',
  bottom: '5%',
  pieces: [
    { min: 60, label: 'Excellent', color: '#00CC00' },
    { min: 30, max: 60, label: 'Good', color: '#F4FF00' },
    { max: 30, label: 'Needs Improvement', color: '#FF0000' }
  ]
}
```

:::


## 🔍 dataZoom Component

Used for zooming a specific area, which enables user to investigate data in detail.

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | string | `'slider'` | Type: slider/inside |
| `show` | boolean | `true` | Whether to display |
| `xAxisIndex` | number/array | - | Controlled X axis index |
| `yAxisIndex` | number/array | - | Controlled Y axis index |
| `start` | number | `0` | Start percentage of data window |
| `end` | number | `100` | End percentage of data window |
| `startValue` | number/string/date | - | Start value of data window |
| `endValue` | number/string/date | - | End value of data window |

::: code-group

```javascript [Slider Type]
dataZoom: [{
  type: 'slider',
  show: true,
  xAxisIndex: [0],
  start: 0,
  end: 100,
  bottom: 10
}]
```

```javascript [Inside Type]
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


## 🎯 Complete Example

::: details Click to view bar chart full configuration

```javascript
option = {
  title: {
    text: 'Monthly Sales Data',
    subtext: 'First Half of 2024',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Sales', 'Profit'],
    bottom: 10
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
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
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      rotate: 30
    }
  },
  yAxis: {
    type: 'value',
    name: 'Amount (10k)',
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
      name: 'Sales',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        color: '#5470c6'
      }
    },
    {
      name: 'Profit',
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


## 📚 Quick Reference

### Component List

| Component | Chinese Name | Description |
|-----------|--------------|-------------|
| `title` | 标题 | Chart title |
| `legend` | 图例 | Legend |
| `tooltip` | 提示框 | Tooltip |
| `toolbox` | 工具栏 | Toolbox |
| `grid` | 网格 | Drawing area |
| `xAxis` | X轴 | X axis |
| `yAxis` | Y轴 | Y axis |
| `series` | 数据系列 | Data series |
| `visualMap` | 视觉映射 | Visual map |
| `dataZoom` | 区域缩放 | Data zoom |

### Chart Types

| Type | Chinese | Description |
|------|---------|-------------|
| `line` | 折线图 | Line chart |
| `bar` | 柱状图 | Bar chart |
| `pie` | 饼图 | Pie chart |
| `scatter` | 散点图 | Scatter chart |
| `effectScatter` | 涟漪散点图 | Effect scatter |
| `radar` | 雷达图 | Radar chart |
| `tree` | 树图 | Tree chart |
| `treemap` | 矩形树图 | Treemap |
| `sunburst` | 旭日图 | Sunburst |
| `gauge` | 仪表盘 | Gauge |
| `funnel` | 漏斗图 | Funnel |
| `map` | 地图 | Map |
| `heatmap` | 热力图 | Heatmap |
| `graph` | 关系图 | Graph |

> [!TIP]
> 💡 For more configurations, please refer to [ECharts Official Documentation](https://echarts.apache.org/en/option.html)
