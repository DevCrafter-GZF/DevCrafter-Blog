# 百度地图 <Badge type="tip" text="Baidu Map" />

> [!TIP]
> 百度地图 JavaScript API 是一套功能丰富的地图开发接口，适用于国内地图应用开发。

## 📋 内容导航

| 章节 | 内容 | 难度 |
|------|------|------|
| [快速开始](#快速开始) | 申请密钥、基础用法 | ⭐ |
| [地图控件](#地图控件) | 缩放、比例尺、缩略图 | ⭐⭐ |
| [覆盖物](#覆盖物) | 标记、折线、多边形、圆 | ⭐⭐ |
| [信息窗口](#信息窗口) | 信息弹窗、自定义内容 | ⭐⭐ |
| [路线规划](#路线规划) | 驾车、公交、步行导航 | ⭐⭐⭐ |
| [定位服务](#定位服务) | 浏览器定位、IP定位 | ⭐⭐ |
| [个性化地图](#个性化地图) | 自定义样式、主题 | ⭐⭐⭐ |

---

## 快速开始

### 申请密钥

1. 访问 [百度地图开放平台](https://lbsyun.baidu.com/)
2. 注册百度账号并登录
3. 进入控制台 → 创建应用
4. 获取 AK（Access Key）

### 基础用法

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

---

## 地图控件

### 缩放控件

```javascript
// 添加缩放控件
var zoomCtrl = new BMap.ZoomControl({
  anchor: BMAP_ANCHOR_TOP_LEFT,  // 位置：左上角
  offset: new BMap.Size(10, 10)   // 偏移量
});
map.addControl(zoomCtrl);
```

### 比例尺控件

```javascript
// 添加比例尺控件
var scaleCtrl = new BMap.ScaleControl({
  anchor: BMAP_ANCHOR_BOTTOM_LEFT
});
map.addControl(scaleCtrl);
```

### 地图类型控件

```javascript
// 添加地图类型切换控件
var mapTypeCtrl = new BMap.MapTypeControl({
  mapTypes: [
    BMAP_NORMAL_MAP,    // 普通地图
    BMAP_SATELLITE_MAP, // 卫星地图
    BMAP_HYBRID_MAP     // 混合地图
  ]
});
map.addControl(mapTypeCtrl);
```

### 缩略图控件

```javascript
// 添加缩略图控件
var overviewCtrl = new BMap.OverviewMapControl({
  isOpen: true,  // 默认展开
  anchor: BMAP_ANCHOR_BOTTOM_RIGHT
});
map.addControl(overviewCtrl);
```

---

## 覆盖物

### 标记点 Marker

```javascript
// 创建标记点
var marker = new BMap.Marker(point);

// 设置标记动画
marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动动画
// marker.setAnimation(BMAP_ANIMATION_DROP); // 坠落动画

// 添加点击事件
marker.addEventListener("click", function() {
  alert("您点击了标记点！");
});

// 将标记添加到地图
map.addOverlay(marker);

// 可拖拽标记
marker.enableDragging();
```

### 自定义标记图标

```javascript
// 自定义图标
var myIcon = new BMap.Icon(
  "http://lbsyun.baidu.com/jsdemo/img/fox.gif",
  new BMap.Size(300, 157)
);

// 创建带自定义图标的标记
var marker = new BMap.Marker(point, { icon: myIcon });
map.addOverlay(marker);
```

### 折线 Polyline

```javascript
// 创建折线
var polyline = new BMap.Polyline([
  new BMap.Point(116.399, 39.910),
  new BMap.Point(116.405, 39.920),
  new BMap.Point(116.425, 39.900)
], {
  strokeColor: "blue",
  strokeWeight: 3,
  strokeOpacity: 0.7
});

map.addOverlay(polyline);
```

### 多边形 Polygon

```javascript
// 创建多边形
var polygon = new BMap.Polygon([
  new BMap.Point(116.387112, 39.920977),
  new BMap.Point(116.385243, 39.913063),
  new BMap.Point(116.394226, 39.917988),
  new BMap.Point(116.401772, 39.921364),
  new BMap.Point(116.41248, 39.927893)
], {
  strokeColor: "red",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "pink",
  fillOpacity: 0.3
});

map.addOverlay(polygon);
```

### 圆 Circle

```javascript
// 创建圆
var circle = new BMap.Circle(point, 1000, {
  strokeColor: "green",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "lightgreen",
  fillOpacity: 0.3
});

map.addOverlay(circle);
```

---

## 信息窗口

### 基础信息窗口

```javascript
// 创建信息窗口
var infoWindow = new BMap.InfoWindow(
  "<h3>天安门</h3><p>北京市中心，故宫的正门</p>",
  {
    width: 250,
    height: 100,
    title: "景点介绍",
    enableMessage: true  // 允许发送短信
  }
);

// 点击标记打开信息窗口
marker.addEventListener("click", function() {
  map.openInfoWindow(infoWindow, point);
});
```

### 自定义信息窗口

```javascript
// 自定义 HTML 内容
var content = `
  <div style="padding: 10px;">
    <h4 style="margin: 0 0 10px; color: #333;">天安门广场</h4>
    <img src="tiananmen.jpg" style="width: 200px; height: 120px; object-fit: cover;">
    <p style="margin: 10px 0 0; color: #666; font-size: 12px;">
      世界上最大的城市广场之一
    </p>
    <a href="javascript:void(0)" onclick="alert('导航功能')">导航到这里</a>
  </div>
`;

var infoWindow = new BMap.InfoWindow(content, {
  width: 240,
  enableCloseOnClick: true
});
```

---

## 路线规划

### 驾车导航

```javascript
// 创建驾车导航实例
var driving = new BMap.DrivingRoute(map, {
  renderOptions: {
    map: map,
    autoViewport: true,  // 自动调整视野
    panel: "results"       // 结果列表容器 ID
  },
  policy: BMAP_DRIVING_POLICY_LEAST_TIME  // 最少时间策略
});

// 搜索路线
driving.search("天安门", "颐和园");

// 策略选项：
// BMAP_DRIVING_POLICY_LEAST_TIME      // 最少时间
// BMAP_DRIVING_POLICY_LEAST_DISTANCE  // 最短距离
// BMAP_DRIVING_POLICY_AVOID_HIGHWAYS  // 避开高速
```

### 公交导航

```javascript
// 创建公交导航实例
var transit = new BMap.TransitRoute(map, {
  renderOptions: {
    map: map,
    panel: "results"
  },
  policy: BMAP_TRANSIT_POLICY_LEAST_TIME  // 最少时间
});

// 搜索公交路线
transit.search("天安门", "颐和园");

// 策略选项：
// BMAP_TRANSIT_POLICY_LEAST_TIME       // 最少时间
// BMAP_TRANSIT_POLICY_LEAST_TRANSFER   // 最少换乘
// BMAP_TRANSIT_POLICY_LEAST_WALKING    // 最少步行
// BMAP_TRANSIT_POLICY_AVOID_SUBWAY     // 不乘地铁
```

### 步行导航

```javascript
// 创建步行导航实例
var walking = new BMap.WalkingRoute(map, {
  renderOptions: {
    map: map,
    panel: "results"
  }
});

// 搜索步行路线
walking.search("天安门", "王府井");
```

---

## 定位服务

### 浏览器定位

```javascript
// 创建定位控件
var geolocation = new BMap.Geolocation();

// 获取当前位置
geolocation.getCurrentPosition(function(r) {
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    var mk = new BMap.Marker(r.point);
    map.addOverlay(mk);
    map.panTo(r.point);
    
    alert('您的位置：' + r.point.lng + ',' + r.point.lat);
  } else {
    alert('定位失败：' + this.getStatus());
  }
}, {
  enableHighAccuracy: true,  // 高精度定位
  timeout: 5000,             // 超时时间
  maximumAge: 0              // 缓存时间
});
```

### IP 定位

```javascript
// IP 定位（无需用户授权）
var myCity = new BMap.LocalCity();
myCity.get(function(result) {
  var cityName = result.name;
  map.setCenter(cityName);
  alert("当前定位城市：" + cityName);
});
```

---

## 个性化地图

### 使用官方主题

```javascript
// 设置地图样式（官方主题）
map.setMapStyle({
  style: "midnight"  // 午夜蓝主题
});

// 可选主题：
// normal      // 默认
// light       // 清新蓝
// dark        // 黑夜
// midnight    // 午夜蓝
// grayscale   // 高端灰
// hardedge    // 强边界
// redalert    // 红色警戒
// googlelite  // 精简
```

### 自定义地图样式

```javascript
// 自定义地图样式 JSON
var styleJson = [
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": {
      "color": "#044161"
    }
  },
  {
    "featureType": "land",
    "elementType": "all",
    "stylers": {
      "color": "#091934"
    }
  },
  {
    "featureType": "highway",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  }
];

map.setMapStyle({ styleJson: styleJson });
```

---

## 实用示例

### 批量添加标记点

```javascript
// 数据点数组
var data = [
  { lng: 116.404, lat: 39.915, title: "天安门" },
  { lng: 116.397, lat: 39.917, title: "故宫" },
  { lng: 116.391, lat: 39.906, title: "人民大会堂" }
];

// 批量添加标记
data.forEach(function(item) {
  var point = new BMap.Point(item.lng, item.lat);
  var marker = new BMap.Marker(point);
  
  // 添加标签
  var label = new BMap.Label(item.title, {
    offset: new BMap.Size(20, -10)
  });
  marker.setLabel(label);
  
  map.addOverlay(marker);
});
```

### 地图事件监听

```javascript
// 点击地图事件
map.addEventListener("click", function(e) {
  console.log("点击位置：" + e.point.lng + "," + e.point.lat);
});

// 拖拽结束事件
map.addEventListener("dragend", function() {
  var center = map.getCenter();
  console.log("地图中心：" + center.lng + "," + center.lat);
});

// 缩放级别变化事件
map.addEventListener("zoomend", function() {
  console.log("当前缩放级别：" + map.getZoom());
});
```

---

## 🔗 相关资源

- [百度地图开放平台](https://lbsyun.baidu.com/)
- [JavaScript API 文档](https://lbsyun.baidu.com/index.php?title=jspopularGL)
- [示例中心](https://lbsyun.baidu.com/jsdemo.htm)
