# 高德地图 <Badge type="tip" text="AMap" />

> [!TIP]
> 高德地图 JS API 是国内领先的地图服务，提供精准的定位和丰富的地图功能。

## 📋 内容导航

| 章节 | 内容 | 难度 |
|------|------|------|
| [快速开始](#快速开始) | 申请密钥、基础用法 | ⭐ |
| [地图控件](#地图控件) | 工具条、比例尺、鹰眼 | ⭐⭐ |
| [覆盖物](#覆盖物) | 标记、折线、多边形、圆 | ⭐⭐ |
| [信息窗口](#信息窗口) | 信息弹窗、自定义内容 | ⭐⭐ |
| [路线规划](#路线规划) | 驾车、公交、步行、骑行 | ⭐⭐⭐ |
| [搜索服务](#搜索服务) | POI搜索、地理编码 | ⭐⭐⭐ |
| [定位服务](#定位服务) | 浏览器定位、精准定位 | ⭐⭐ |

---

## 快速开始

### 申请密钥

1. 访问 [高德地图开放平台](https://lbs.amap.com/)
2. 注册开发者账号
3. 创建应用获取 Key
4. 添加安全密钥（SecurityConfig）

### 基础用法

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
      center: [116.397428, 39.90923], // 北京天安门
      viewMode: '2D'  // 2D/3D 模式
    });
  </script>
</body>
</html>
```

### 安全密钥配置（推荐）

```html
<script type="text/javascript">
  window._AMapSecurityConfig = {
    securityJsCode: 'YOUR_SECURITY_CODE', // 安全密钥
  }
</script>
<script src="https://webapi.amap.com/maps?v=2.0&key=YOUR_KEY"></script>
```

---

## 地图控件

### 工具条

```javascript
// 加载工具条插件
AMap.plugin(['AMap.ToolBar'], function() {
  var toolbar = new AMap.ToolBar({
    position: 'LB',  // 左下角
    offset: [10, 10]
  });
  map.addControl(toolbar);
});
```

### 比例尺

```javascript
AMap.plugin(['AMap.Scale'], function() {
  var scale = new AMap.Scale({
    position: 'LB'
  });
  map.addControl(scale);
});
```

### 鹰眼（缩略图）

```javascript
AMap.plugin(['AMap.HawkEye'], function() {
  var hawkeye = new AMap.HawkEye({
    isOpen: true,  // 默认展开
    position: 'RT' // 右上角
  });
  map.addControl(hawkeye);
});
```

### 地图类型切换

```javascript
AMap.plugin(['AMap.MapType'], function() {
  var mapType = new AMap.MapType({
    defaultType: 0  // 0: 普通地图, 1: 卫星地图
  });
  map.addControl(mapType);
});
```

### 定位按钮

```javascript
AMap.plugin(['AMap.Geolocation'], function() {
  var geolocation = new AMap.Geolocation({
    position: 'LB',
    offset: [10, 40],
    zoomToAccuracy: true  // 定位成功后自动调整视野
  });
  map.addControl(geolocation);
});
```

---

## 覆盖物

### 标记点 Marker

```javascript
// 创建标记点
var marker = new AMap.Marker({
  position: [116.397428, 39.90923],
  title: '天安门',
  animation: 'AMAP_ANIMATION_BOUNCE'  // 动画效果
});

// 添加到地图
map.add(marker);

// 点击事件
marker.on('click', function() {
  alert('点击了标记点！');
});

// 设置可拖拽
marker.setDraggable(true);
```

### 自定义图标

```javascript
// 自定义图标
var icon = new AMap.Icon({
  size: new AMap.Size(40, 50),      // 图标尺寸
  image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
  imageSize: new AMap.Size(40, 50), // 图片尺寸
  imageOffset: new AMap.Pixel(0, 0) // 图片偏移
});

var marker = new AMap.Marker({
  position: [116.397428, 39.90923],
  icon: icon,
  offset: new AMap.Pixel(-20, -50)  // 偏移量
});

map.add(marker);
```

### 折线 Polyline

```javascript
var path = [
  [116.368904, 39.913423],
  [116.382122, 39.901176],
  [116.387271, 39.912501],
  [116.398258, 39.904600]
];

var polyline = new AMap.Polyline({
  path: path,
  strokeColor: "#3366FF",
  strokeWeight: 5,
  strokeOpacity: 0.8,
  strokeStyle: "solid",  // solid/dashed
  lineJoin: 'round',     // 折线拐点的绘制样式
  showDir: true          // 显示方向箭头
});

map.add(polyline);

// 自动调整视野
map.setFitView([polyline]);
```

### 多边形 Polygon

```javascript
var path = [
  [116.368904, 39.913423],
  [116.382122, 39.901176],
  [116.387271, 39.912501],
  [116.398258, 39.904600],
  [116.368904, 39.913423]  // 闭合
];

var polygon = new AMap.Polygon({
  path: path,
  strokeColor: "#FF33FF",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "#1791fc",
  fillOpacity: 0.35
});

map.add(polygon);
```

### 圆 Circle

```javascript
var circle = new AMap.Circle({
  center: [116.397428, 39.90923],
  radius: 1000,  // 半径（米）
  strokeColor: "#F33",
  strokeWeight: 2,
  strokeOpacity: 0.8,
  fillColor: "#ee2200",
  fillOpacity: 0.3
});

map.add(circle);
```

### 文本标记 Text

```javascript
var text = new AMap.Text({
  text: '天安门广场',
  position: [116.397428, 39.90923],
  offset: new AMap.Pixel(-20, -30),
  style: {
    'background-color': 'rgba(255,255,255,0.8)',
    'border': '1px solid #ccc',
    'padding': '5px 10px',
    'border-radius': '4px'
  }
});

map.add(text);
```

---

## 信息窗口

### 基础信息窗口

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

### 自定义信息窗口

```javascript
// 自定义内容
var content = `
  <div class="custom-info">
    <h4>天安门广场</h4>
    <img src="tiananmen.jpg" width="200">
    <p>世界上最大的城市广场之一</p>
    <button onclick="closeInfo()">关闭</button>
  </div>
`;

var infoWindow = new AMap.InfoWindow({
  content: content,
  isCustom: true,  // 使用自定义窗体
  offset: new AMap.Pixel(0, -35)
});

// 打开
infoWindow.open(map, [116.397428, 39.90923]);

// 关闭函数
function closeInfo() {
  infoWindow.close();
}
```

---

## 路线规划

### 驾车导航

```javascript
// 加载驾车规划插件
AMap.plugin(['AMap.Driving'], function() {
  var driving = new AMap.Driving({
    map: map,
    panel: 'panel',  // 结果列表容器
    policy: AMap.DrivingPolicy.LEAST_TIME  // 策略
  });
  
  // 搜索路线
  driving.search(
    new AMap.LngLat(116.368904, 39.913423),
    new AMap.LngLat(116.397428, 39.90923),
    function(status, result) {
      if (status === 'complete') {
        console.log('路线规划成功');
      } else {
        console.log('路线规划失败');
      }
    }
  );
});

// 策略选项：
// AMap.DrivingPolicy.LEAST_TIME      // 最快
// AMap.DrivingPolicy.LEAST_FEE       // 最经济
// AMap.DrivingPolicy.LEAST_DISTANCE  // 最短距离
// AMap.DrivingPolicy.REAL_TRAFFIC    // 考虑实时路况
```

### 公交导航

```javascript
AMap.plugin(['AMap.Transfer'], function() {
  var transfer = new AMap.Transfer({
    map: map,
    panel: 'panel',
    policy: AMap.TransferPolicy.LEAST_TIME
  });
  
  transfer.search([
    { keyword: '天安门', city: '北京' },
    { keyword: '颐和园', city: '北京' }
  ], function(status, result) {
    // 回调处理
  });
});
```

### 步行导航

```javascript
AMap.plugin(['AMap.Walking'], function() {
  var walking = new AMap.Walking({
    map: map,
    panel: 'panel'
  });
  
  walking.search(
    [116.368904, 39.913423],
    [116.397428, 39.90923]
  );
});
```

### 骑行导航

```javascript
AMap.plugin(['AMap.Riding'], function() {
  var riding = new AMap.Riding({
    map: map,
    panel: 'panel'
  });
  
  riding.search(
    [116.368904, 39.913423],
    [116.397428, 39.90923]
  );
});
```

---

## 搜索服务

### POI 搜索

```javascript
AMap.plugin(['AMap.PlaceSearch'], function() {
  var placeSearch = new AMap.PlaceSearch({
    pageSize: 10,
    pageIndex: 1,
    city: '北京'
  });
  
  // 关键字搜索
  placeSearch.search('餐厅', function(status, result) {
    if (status === 'complete') {
      var pois = result.poiList.pois;
      pois.forEach(function(poi) {
        console.log(poi.name, poi.location);
      });
    }
  });
  
  // 周边搜索
  placeSearch.searchNearBy('酒店', [116.397428, 39.90923], 1000);
  
  // 多边形搜索
  placeSearch.searchInBounds('银行', [[116.36, 39.90], [116.40, 39.92]]);
});
```

### 地理编码

```javascript
AMap.plugin(['AMap.Geocoder'], function() {
  var geocoder = new AMap.Geocoder({
    city: '北京'
  });
  
  // 地址转坐标（正向编码）
  geocoder.getLocation('北京市朝阳区望京', function(status, result) {
    if (status === 'complete' && result.geocodes.length) {
      var lnglat = result.geocodes[0].location;
      console.log('坐标：', lnglat.lng, lnglat.lat);
    }
  });
  
  // 坐标转地址（逆向编码）
  geocoder.getAddress([116.397428, 39.90923], function(status, result) {
    if (status === 'complete' && result.regeocode) {
      console.log('地址：', result.regeocode.formattedAddress);
    }
  });
});
```

---

## 定位服务

### 浏览器定位

```javascript
AMap.plugin(['AMap.Geolocation'], function() {
  var geolocation = new AMap.Geolocation({
    enableHighAccuracy: true,  // 高精度
    timeout: 10000,            // 超时时间
    buttonPosition: 'LB',      // 定位按钮位置
    buttonOffset: new AMap.Pixel(10, 20),
    zoomToAccuracy: true,      // 自动调整视野
    showCircle: true,          // 显示定位精度圆
    showMarker: true,          // 显示定位点
    panToLocation: true        // 自动平移到定位点
  });
  
  map.addControl(geolocation);
  
  // 获取当前位置
  geolocation.getCurrentPosition(function(status, result) {
    if (status === 'complete') {
      console.log('定位成功：', result.position);
    } else {
      console.log('定位失败：', result.message);
    }
  });
});
```

### 城市查询

```javascript
// 获取用户所在城市
AMap.plugin(['AMap.CitySearch'], function() {
  var citySearch = new AMap.CitySearch();
  
  citySearch.getLocalCity(function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      console.log('当前城市：', result.city);
      // 将地图中心设为当前城市
      map.setCity(result.city);
    }
  });
});
```

---

## 实用示例

### 批量添加标记点

```javascript
var markers = [];
var data = [
  { name: '天安门', position: [116.397428, 39.90923] },
  { name: '故宫', position: [116.397026, 39.918058] },
  { name: '王府井', position: [116.410886, 39.911046] }
];

data.forEach(function(item) {
  var marker = new AMap.Marker({
    position: item.position,
    title: item.name
  });
  
  // 添加信息窗口
  var infoWindow = new AMap.InfoWindow({
    content: '<h4>' + item.name + '</h4>',
    offset: new AMap.Pixel(0, -30)
  });
  
  marker.on('click', function() {
    infoWindow.open(map, marker.getPosition());
  });
  
  markers.push(marker);
});

// 批量添加到地图
map.add(markers);

// 自动调整视野
map.setFitView();
```

### 地图事件

```javascript
// 点击事件
map.on('click', function(e) {
  console.log('点击位置：', e.lnglat.lng, e.lnglat.lat);
});

// 拖拽事件
map.on('dragend', function() {
  var center = map.getCenter();
  console.log('地图中心：', center.lng, center.lat);
});

// 缩放事件
map.on('zoomend', function() {
  console.log('当前缩放级别：', map.getZoom());
});

// 地图加载完成
map.on('complete', function() {
  console.log('地图加载完成');
});
```

---

## 🔗 相关资源

- [高德地图开放平台](https://lbs.amap.com/)
- [JS API 文档](https://lbs.amap.com/api/javascript-api-v2/summary)
- [示例中心](https://lbs.amap.com/demo-center/js-api-v2)
