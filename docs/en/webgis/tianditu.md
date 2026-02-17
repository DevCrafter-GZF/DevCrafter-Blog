# 天地图 <Badge type="tip" text="Tianditu" />

> [!TIP]
> 天地图是国家测绘地理信息局建设的地理信息公共服务平台，提供权威、标准的地理信息服务。

## 📋 内容导航

| 章节 | 内容 | 难度 |
|------|------|------|
| [快速开始](#快速开始) | 申请密钥、基础用法 | ⭐ |
| [地图控件](#地图控件) | 缩放、比例尺、鹰眼 | ⭐⭐ |
| [覆盖物](#覆盖物) | 标记、折线、多边形 | ⭐⭐ |
| [信息窗口](#信息窗口) | 信息弹窗 | ⭐⭐ |
| [图层服务](#图层服务) | 矢量、影像、地形 | ⭐⭐ |
| [投影坐标](#投影坐标) | 坐标系转换 | ⭐⭐⭐ |

---

## 快速开始

### 申请密钥

1. 访问 [天地图官网](https://www.tianditu.gov.cn/)
2. 注册开发者账号
3. 创建应用获取 Key

### 基础用法

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
  </script>
</body>
</html>
```

---

## 地图控件

### 缩放控件

```javascript
// 添加缩放控件
var zoomControl = new T.Control.Zoom({
  position: T_ANCHOR_TOP_LEFT
});
map.addControl(zoomControl);
```

### 比例尺

```javascript
// 添加比例尺控件
var scaleControl = new T.Control.Scale();
map.addControl(scaleControl);
```

### 鹰眼（缩略图）

```javascript
// 添加鹰眼控件
var overviewControl = new T.Control.OverviewMap({
  isOpen: true  // 默认展开
});
map.addControl(overviewControl);
```

### 地图类型

```javascript
// 添加地图类型切换控件
var mapTypeControl = new T.Control.MapType([
  {
    title: '地图',
    icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png',
    layer: TMAP_NORMAL_MAP
  },
  {
    title: '卫星',
    icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png',
    layer: TMAP_SATELLITE_MAP
  },
  {
    title: '地形',
    icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png',
    layer: TMAP_TERRAIN_MAP
  }
]);
map.addControl(mapTypeControl);
```

---

## 覆盖物

### 标记点

```javascript
// 创建标记点
var marker = new T.Marker(new T.LngLat(116.40769, 39.89945));

// 添加到地图
map.addOverLay(marker);

// 点击事件
marker.addEventListener('click', function() {
  alert('点击了标记点！');
});

// 可拖拽
marker.enableDragging();
```

### 自定义图标

```javascript
// 自定义图标
var icon = new T.Icon({
  iconUrl: 'marker.png',
  iconSize: new T.Point(32, 32),
  iconAnchor: new T.Point(16, 32)
});

var marker = new T.Marker(new T.LngLat(116.40769, 39.89945), { icon: icon });
map.addOverLay(marker);
```

### 折线

```javascript
// 创建折线
var points = [
  new T.LngLat(116.38, 39.90),
  new T.LngLat(116.40, 39.91),
  new T.LngLat(116.42, 39.90)
];

var polyline = new T.Polyline(points, {
  color: 'blue',
  weight: 3,
  opacity: 0.8
});

map.addOverLay(polyline);
```

### 多边形

```javascript
// 创建多边形
var points = [
  new T.LngLat(116.38, 39.90),
  new T.LngLat(116.40, 39.92),
  new T.LngLat(116.42, 39.90),
  new T.LngLat(116.40, 39.88)
];

var polygon = new T.Polygon(points, {
  color: 'red',
  weight: 2,
  opacity: 0.8,
  fillColor: 'pink',
  fillOpacity: 0.3
});

map.addOverLay(polygon);
```

### 圆

```javascript
// 创建圆
var circle = new T.Circle(new T.LngLat(116.40769, 39.89945), 1000, {
  color: 'green',
  weight: 2,
  opacity: 0.8,
  fillColor: 'lightgreen',
  fillOpacity: 0.3
});

map.addOverLay(circle);
```

---

## 信息窗口

```javascript
// 创建信息窗口
var infoWindow = new T.InfoWindow({
  content: '<h3>天安门</h3><p>北京市中心</p>',
  minWidth: 200
});

// 点击标记打开信息窗口
marker.addEventListener('click', function() {
  marker.openInfoWindow(infoWindow);
});
```

---

## 图层服务

### 矢量地图

```javascript
// 默认加载矢量地图
var map = new T.Map('map', {
  layers: [TMAP_NORMAL_MAP]
});
```

### 卫星影像

```javascript
// 加载卫星影像
var map = new T.Map('map', {
  layers: [TMAP_SATELLITE_MAP]
});
```

### 地形图

```javascript
// 加载地形图
var map = new T.Map('map', {
  layers: [TMAP_TERRAIN_MAP]
});
```

### 叠加标注

```javascript
// 卫星影像 + 标注
var map = new T.Map('map');
map.addLayer(TMAP_SATELLITE_MAP);
map.addLayer(TMAP_ANNOTATION_MAP);  // 标注图层
```

---

## 投影坐标

### 坐标系说明

天地图使用 **CGCS2000** 国家大地坐标系，与 WGS84 坐标系略有差异。

### 坐标转换

```javascript
// 天地图坐标转 WGS84（简化公式）
function gcj02towgs84(lng, lat) {
  var PI = 3.14159265358979324;
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  
  var dlat = transformlat(lng - 105.0, lat - 35.0);
  var dlng = transformlng(lng - 105.0, lat - 35.0);
  
  var radlat = lat / 180.0 * PI;
  var magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
  
  var mglat = lat + dlat;
  var mglng = lng + dlng;
  
  return [lng * 2 - mglng, lat * 2 - mglat];
}
```

---

## 🔗 相关资源

- [天地图官网](https://www.tianditu.gov.cn/)
- [开发文档](https://lbs.tianditu.gov.cn/api/js4.0/guide.html)
