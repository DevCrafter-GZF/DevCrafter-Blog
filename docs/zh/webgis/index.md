# WebGIS 开发指南 <Badge type="tip" text="WebGIS" />

> [!TIP]
> WebGIS（网络地理信息系统）是将 GIS 技术与 Web 技术结合的产物，本指南涵盖主流地图服务商的开发实践。

## 📋 内容导航

| 章节 | 内容 | 难度 |
|------|------|------|
| [百度地图](/WebGIS/baidu) | 百度地图 JavaScript API | ⭐⭐ |
| [高德地图](/WebGIS/gaode) | 高德地图 JS API | ⭐⭐ |
| [天地图](/WebGIS/tianditu) | 国家地理信息公共服务平台 | ⭐⭐ |
| [ECharts 地图](/WebGIS/echarts-map) | 数据可视化地图 | ⭐⭐ |

---

## 百度地图

### 1.1 简介

百度地图 JavaScript API 是一套由 JavaScript 语言编写的应用程序接口，可帮助您在网站中构建功能丰富、交互性强的地图应用。

### 1.2 申请密钥

```javascript
// 1. 访问 https://lbsyun.baidu.com/
// 2. 注册百度账号并登录
// 3. 创建应用获取 AK（Access Key）
```

### 1.3 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>百度地图示例</title>
  <style>
    #map { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://api.map.baidu.com/api?v=3.0&ak=YOUR_AK"></script>
  <script>
    // 创建地图实例
    var map = new BMap.Map("map");
    
    // 设置中心点坐标（北京天安门）
    var point = new BMap.Point(116.404, 39.915);
    
    // 初始化地图，设置中心点和缩放级别
    map.centerAndZoom(point, 15);
    
    // 启用滚轮缩放
    map.enableScrollWheelZoom(true);
  </script>
</body>
</html>
```

### 1.4 添加标记点

```javascript
// 创建标记点
var marker = new BMap.Marker(point);

// 将标记添加到地图
map.addOverlay(marker);

// 添加点击事件
marker.addEventListener("click", function() {
  alert("您点击了标记点！");
});
```

### 1.5 信息窗口

```javascript
// 创建信息窗口
var infoWindow = new BMap.InfoWindow(
  "<h3>天安门</h3><p>北京市中心</p>",
  { width: 200, height: 100 }
);

// 打开信息窗口
marker.addEventListener("click", function() {
  map.openInfoWindow(infoWindow, point);
});
```

### 1.6 路线规划

```javascript
// 创建路线规划实例
var driving = new BMap.DrivingRoute(map, {
  renderOptions: { map: map, autoViewport: true }
});

// 搜索路线
driving.search("天安门", "颐和园");
```

---

## 高德地图

### 2.1 简介

高德地图 JS API 是由高德开放平台提供的 JavaScript 地图开发接口，具有定位精准、覆盖范围广、更新及时等特点。

### 2.2 申请密钥

```javascript
// 1. 访问 https://lbs.amap.com/
// 2. 注册开发者账号
// 3. 创建应用获取 Key
```

### 2.3 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>高德地图示例</title>
  <style>
    #map { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://webapi.amap.com/maps?v=2.0&key=YOUR_KEY"></script>
  <script>
    // 创建地图实例
    var map = new AMap.Map('map', {
      zoom: 13,
      center: [116.397428, 39.90923] // 北京天安门
    });
    
    // 添加工具条
    AMap.plugin(['AMap.ToolBar'], function() {
      map.addControl(new AMap.ToolBar());
    });
  </script>
</body>
</html>
```

### 2.4 添加标记点

```javascript
// 创建标记点
var marker = new AMap.Marker({
  position: [116.397428, 39.90923],
  title: '天安门'
});

// 将标记添加到地图
map.add(marker);

// 添加点击事件
marker.on('click', function() {
  alert('您点击了标记点！');
});
```

### 2.5 信息窗口

```javascript
// 创建信息窗口
var infoWindow = new AMap.InfoWindow({
  content: '<h3>天安门</h3><p>北京市中心</p>',
  offset: new AMap.Pixel(0, -30)
});

// 打开信息窗口
marker.on('click', function() {
  infoWindow.open(map, marker.getPosition());
});
```

### 2.6 路线规划

```javascript
// 加载路线规划插件
AMap.plugin(['AMap.Driving'], function() {
  var driving = new AMap.Driving({
    map: map,
    panel: 'panel' // 结果列表的 HTML 容器 id
  });
  
  // 搜索路线
  driving.search(
    new AMap.LngLat(116.397428, 39.90923),
    new AMap.LngLat(116.397428, 39.90923)
  );
});
```

---

## 天地图

### 3.1 简介

天地图是国家测绘地理信息局建设的地理信息公共服务平台，提供权威、统一的地理信息服务。

### 3.2 申请密钥

```javascript
// 1. 访问 https://www.tianditu.gov.cn/
// 2. 注册开发者账号
// 3. 创建应用获取 Key
```

### 3.3 基础用法

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>天地图示例</title>
  <style>
    #map { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://api.tianditu.gov.cn/api?v=4.0&tk=YOUR_KEY"></script>
  <script>
    // 创建地图实例
    var map = new T.Map('map');
    
    // 设置中心点和缩放级别
    map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12);
    
    // 添加缩放控件
    var ctrl = new T.Control.Zoom();
    map.addControl(ctrl);
  </script>
</body>
</html>
```

### 3.4 添加标记点

```javascript
// 创建标记点
var marker = new T.Marker(new T.LngLat(116.40769, 39.89945));

// 将标记添加到地图
map.addOverLay(marker);

// 添加点击事件
marker.addEventListener('click', function() {
  alert('您点击了标记点！');
});
```

### 3.5 信息窗口

```javascript
// 创建信息窗口
var infoWindow = new T.InfoWindow({
  content: '<h3>天安门</h3><p>北京市中心</p>',
  minWidth: 200
});

// 打开信息窗口
marker.addEventListener('click', function() {
  marker.openInfoWindow(infoWindow);
});
```

---

## 对比总结

| 特性 | 百度地图 | 高德地图 | 天地图 |
|------|----------|----------|--------|
| 数据覆盖 | 国内详细 | 国内详细 | 全国权威 |
| 定位精度 | 高 | 高 | 官方标准 |
| 商业使用 | 需授权 | 需授权 | 免费 |
| 国际数据 | 较少 | 较少 | 无 |
| 特色功能 | 街景 | 实时路况 | 标准底图 |

---

## 🔗 相关资源

- [百度地图开放平台](https://lbsyun.baidu.com/)
- [高德地图开放平台](https://lbs.amap.com/)
- [天地图](https://www.tianditu.gov.cn/)
