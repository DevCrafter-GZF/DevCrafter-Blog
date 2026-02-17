# ECharts 地图 <Badge type="tip" text="ECharts Map" />

> [!TIP]
> ECharts 是一个开源可视化库，提供丰富的地图可视化能力，支持多种地图数据格式。

## 📋 内容导航

| 章节 | 内容 | 难度 |
|------|------|------|
| [快速开始](#快速开始) | 引入 ECharts、基础用法 | ⭐ |
| [中国地图](#中国地图) | 省级、市级地图 | ⭐⭐ |
| [世界地图](#世界地图) | 世界地图展示 | ⭐⭐ |
| [散点图](#散点图) | 地图散点、气泡图 | ⭐⭐ |
| [热力图](#热力图) | 热力分布 | ⭐⭐ |
| [迁徙图](#迁徙图) | 迁徙路线、飞线图 | ⭐⭐⭐ |
| [区域填充](#区域填充) | 区域颜色、渐变 | ⭐⭐ |

---

## 快速开始

### 安装引入

```html
<!-- 方式一：CDN -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>

<!-- 方式二：npm -->
npm install echarts
```

### 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ECharts 地图</title>
  <style>
    #map { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
  <script>
    // 初始化图表
    var chart = echarts.init(document.getElementById('map'));
    
    // 配置项
    var option = {
      series: [{
        type: 'map',
        map: 'china'
      }]
    };
    
    // 加载中国地图数据
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(res => res.json())
      .then(geoJson => {
        echarts.registerMap('china', geoJson);
        chart.setOption(option);
      });
  </script>
</body>
</html>
```

---

## 中国地图

### 基础中国地图

```javascript
var option = {
  title: {
    text: '中国地图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>{c}'
  },
  series: [{
    type: 'map',
    map: 'china',
    roam: true,  // 允许缩放和平移
    label: {
      show: true,
      fontSize: 10
    },
    emphasis: {
      label: {
        show: true
      },
      itemStyle: {
        areaColor: '#ffd700'
      }
    }
  }]
};
```

### 省级数据填充

```javascript
var data = [
  { name: '北京', value: 100 },
  { name: '上海', value: 200 },
  { name: '广东', value: 300 },
  { name: '浙江', value: 150 }
];

var option = {
  visualMap: {
    min: 0,
    max: 500,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    inRange: {
      color: ['#e0ffff', '#006edd']
    }
  },
  series: [{
    type: 'map',
    map: 'china',
    data: data,
    label: {
      show: true
    }
  }]
};
```

### 市级地图

```javascript
// 加载北京市地图数据
fetch('https://geo.datav.aliyun.com/areas_v3/bound/110000_full.json')
  .then(res => res.json())
  .then(geoJson => {
    echarts.registerMap('beijing', geoJson);
    
    var option = {
      series: [{
        type: 'map',
        map: 'beijing',
        roam: true
      }]
    };
    
    chart.setOption(option);
  });
```

---

## 世界地图

```javascript
// 加载世界地图数据
fetch('https://geo.datav.aliyun.com/areas_v3/bound/world.json')
  .then(res => res.json())
  .then(geoJson => {
    echarts.registerMap('world', geoJson);
    
    var option = {
      series: [{
        type: 'map',
        map: 'world',
        roam: true,
        label: {
          show: false
        },
        itemStyle: {
          areaColor: '#f3f3f3',
          borderColor: '#999'
        },
        emphasis: {
          itemStyle: {
            areaColor: '#ffd700'
          }
        }
      }]
    };
    
    chart.setOption(option);
  });
```

---

## 散点图

### 基础散点

```javascript
var data = [
  { name: '北京', value: [116.407526, 39.90403, 100] },
  { name: '上海', value: [121.473701, 31.230416, 200] },
  { name: '广州', value: [113.264434, 23.129162, 150] }
];

var option = {
  geo: {
    map: 'china',
    roam: true
  },
  series: [{
    type: 'scatter',
    coordinateSystem: 'geo',
    data: data,
    symbolSize: function(val) {
      return val[2] / 10;
    },
    label: {
      show: true,
      formatter: '{b}',
      position: 'right'
    },
    itemStyle: {
      color: '#f00'
    }
  }]
};
```

### 气泡图

```javascript
var option = {
  geo: {
    map: 'china',
    roam: true
  },
  series: [{
    type: 'effectScatter',  // 涟漪效果
    coordinateSystem: 'geo',
    data: data,
    symbolSize: function(val) {
      return val[2] / 10;
    },
    rippleEffect: {
      brushType: 'stroke',
      scale: 3
    },
    itemStyle: {
      color: '#f4e925',
      shadowBlur: 10,
      shadowColor: '#333'
    }
  }]
};
```

---

## 热力图

```javascript
// 生成热力数据
var heatData = [];
for (var i = 0; i < 500; i++) {
  heatData.push([
    100 + Math.random() * 20,  // 经度
    30 + Math.random() * 10,   // 纬度
    Math.random() * 100        // 热度值
  ]);
}

var option = {
  visualMap: {
    min: 0,
    max: 100,
    calculable: true,
    inRange: {
      color: ['blue', 'cyan', 'lime', 'yellow', 'red']
    }
  },
  geo: {
    map: 'china',
    roam: true
  },
  series: [{
    type: 'heatmap',
    coordinateSystem: 'geo',
    data: heatData,
    pointSize: 10,
    blurSize: 15
  }]
};
```

---

## 迁徙图

### 飞线图

```javascript
var data = [
  { fromName: '北京', toName: '上海', coords: [[116.407526, 39.90403], [121.473701, 31.230416]] },
  { fromName: '北京', toName: '广州', coords: [[116.407526, 39.90403], [113.264434, 23.129162]] },
  { fromName: '北京', toName: '深圳', coords: [[116.407526, 39.90403], [114.057868, 22.543099]] }
];

var option = {
  geo: {
    map: 'china',
    roam: true
  },
  series: [
    {
      type: 'lines',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
      },
      lineStyle: {
        color: '#a6c84c',
        width: 0,
        curveness: 0.2
      },
      data: data
    },
    {
      type: 'lines',
      zlevel: 2,
      symbol: ['none', 'arrow'],
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: 'arrow',
        symbolSize: 5
      },
      lineStyle: {
        color: '#a6c84c',
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      data: data
    }
  ]
};
```

---

## 区域填充

### 渐变填充

```javascript
var option = {
  series: [{
    type: 'map',
    map: 'china',
    itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#83bff6'
        }, {
          offset: 0.5, color: '#188df0'
        }, {
          offset: 1, color: '#188df0'
        }]
      }
    },
    emphasis: {
      itemStyle: {
        areaColor: '#ffd700'
      }
    }
  }]
};
```

---

## 完整示例

### 疫情地图

```javascript
var data = [
  { name: '湖北', value: 67802 },
  { name: '广东', value: 1456 },
  { name: '河南', value: 1276 },
  // ...
];

var option = {
  title: {
    text: '全国疫情分布',
    subtext: '数据来源：国家卫健委',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>确诊：{c}人'
  },
  visualMap: {
    min: 0,
    max: 70000,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    calculable: true,
    inRange: {
      color: ['#fff', '#ff0000']
    }
  },
  series: [{
    name: '确诊病例',
    type: 'map',
    map: 'china',
    roam: true,
    data: data,
    label: {
      show: true,
      fontSize: 10
    },
    emphasis: {
      label: {
        show: true
      }
    }
  }]
};
```

---

## 🔗 相关资源

- [ECharts 官网](https://echarts.apache.org/)
- [地图数据下载](https://datav.aliyun.com/portal/school/atlas/area_selector)
- [ECharts 地图示例](https://echarts.apache.org/examples/zh/index.html#chart-type-map)
