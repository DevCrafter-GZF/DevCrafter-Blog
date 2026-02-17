# 后台管理系统项目 <Badge type="tip" text="Vue 3" />

> [!TIP]
> 基于 Vue 3 + Element Plus 开发的企业级后台管理系统，包含权限管理、数据可视化等核心功能。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.x | 前端框架 |
| TypeScript | 5.x | 类型系统 |
| Element Plus | 2.x | UI 组件库 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 2.x | 状态管理 |
| Axios | 1.x | HTTP 请求 |
| ECharts | 5.x | 数据可视化 |

## 项目搭建

```bash
# 使用 create-vue 创建项目
npm create vue@latest admin-system

# 选择 TypeScript、Router、Pinia
```

### 安装依赖

```bash
npm install element-plus
npm install @element-plus/icons-vue
npm install echarts
npm install axios
npm install js-cookie
npm install nprogress
npm install -D @types/js-cookie
```

## 项目结构

```
src/
├── api/                 # API 接口
│   ├── user.ts
│   ├── role.ts
│   └── menu.ts
├── assets/              # 静态资源
│   └── styles/
├── components/          # 公共组件
│   ├── SvgIcon/
│   ├── Breadcrumb/
│   └── Hamburger/
├── composables/         # 组合式函数
│   └── usePermission.ts
├── directives/          # 自定义指令
│   └── permission.ts
├── layout/              # 布局组件
│   ├── index.vue
│   ├── components/
│   └── Sidebar/
├── router/              # 路由配置
│   └── index.ts
├── stores/              # Pinia 状态
│   ├── user.ts
│   ├── app.ts
│   └── permission.ts
├── utils/               # 工具函数
│   ├── request.ts
│   ├── auth.ts
│   └── validate.ts
├── views/               # 页面组件
│   ├── login/
│   ├── dashboard/
│   ├── system/
│   └── error/
├── App.vue
└── main.ts
```

## 核心功能实现

### 1. 路由配置

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePermissionStore } from '@/stores/permission';

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        hidden: true
    }
];

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/system',
        component: () => import('@/layout/index.vue'),
        redirect: '/system/user',
        meta: { title: '系统管理', icon: 'system' },
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/system/user.vue'),
                meta: { title: '用户管理', icon: 'user' }
            },
            {
                path: 'role',
                name: 'Role',
                component: () => import('@/views/system/role.vue'),
                meta: { title: '角色管理', icon: 'peoples' }
            },
            {
                path: 'menu',
                name: 'Menu',
                component: () => import('@/views/system/menu.vue'),
                meta: { title: '菜单管理', icon: 'tree' }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes,
    scrollBehavior: () => ({ left: 0, top: 0 })
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    
    // 设置页面标题
    document.title = to.meta.title ? `${to.meta.title} - 后台管理` : '后台管理';
    
    const hasToken = userStore.token;
    
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            const hasRoles = userStore.roles && userStore.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    // 获取用户信息
                    const { roles } = await userStore.getInfo();
                    // 生成可访问路由
                    const accessRoutes = await permissionStore.generateRoutes(roles);
                    accessRoutes.forEach(route => {
                        router.addRoute(route);
                    });
                    next({ ...to, replace: true });
                } catch (error) {
                    await userStore.resetToken();
                    next(`/login?redirect=${to.path}`);
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
});

export default router;
```

### 2. Pinia 状态管理

```typescript
// stores/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import type { LoginData, UserInfo } from '@/api/types';

export const useUserStore = defineStore('user', () => {
    // State
    const token = ref<string>(getToken() || '');
    const name = ref<string>('');
    const avatar = ref<string>('');
    const roles = ref<string[]>([]);
    const permissions = ref<string[]>([]);
    
    // Getters
    const isLoggedIn = computed(() => !!token.value);
    
    // Actions
    const loginAction = async (loginData: LoginData) => {
        const { data } = await login(loginData);
        token.value = data.token;
        setToken(data.token);
        return data;
    };
    
    const getInfo = async () => {
        const { data } = await getInfo();
        name.value = data.name;
        avatar.value = data.avatar;
        roles.value = data.roles;
        permissions.value = data.permissions;
        return data;
    };
    
    const logout = async () => {
        token.value = '';
        roles.value = [];
        permissions.value = [];
        removeToken();
    };
    
    const resetToken = () => {
        token.value = '';
        removeToken();
    };
    
    return {
        token,
        name,
        avatar,
        roles,
        permissions,
        isLoggedIn,
        loginAction,
        getInfo,
        logout,
        resetToken
    };
});
```

```typescript
// stores/permission.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { asyncRoutes, constantRoutes } from '@/router';
import type { RouteRecordRaw } from 'vue-router';

export const usePermissionStore = defineStore('permission', () => {
    // State
    const routes = ref<RouteRecordRaw[]>([]);
    const addRoutes = ref<RouteRecordRaw[]>([]);
    
    // Actions
    const generateRoutes = (roles: string[]): RouteRecordRaw[] => {
        let accessedRoutes: RouteRecordRaw[];
        
        if (roles.includes('admin')) {
            accessedRoutes = asyncRoutes || [];
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        
        addRoutes.value = accessedRoutes;
        routes.value = constantRoutes.concat(accessedRoutes);
        
        return accessedRoutes;
    };
    
    return {
        routes,
        addRoutes,
        generateRoutes
    };
});

// 过滤路由
function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = [];
    
    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });
    
    return res;
}

function hasPermission(roles: string[], route: RouteRecordRaw): boolean {
    if (route.meta && route.meta.roles) {
        return roles.some(role => (route.meta!.roles as string[]).includes(role));
    }
    return true;
}
```

### 3. 权限指令

```typescript
// directives/permission.ts
import { useUserStore } from '@/stores/user';
import type { Directive } from 'vue';

const permission: Directive = {
    mounted(el, binding) {
        const { value } = binding;
        const userStore = useUserStore();
        const permissions = userStore.permissions;
        
        if (value && value instanceof Array) {
            if (value.length > 0) {
                const hasPermission = permissions.some(permission => {
                    return value.includes(permission);
                });
                
                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el);
                }
            }
        } else {
            throw new Error(`need permissions! Like v-permission="['admin','editor']"`);
        }
    }
};

export default permission;
```

### 4. 数据可视化

```vue
<!-- views/dashboard/index.vue -->
<template>
  <div class="dashboard-container">
    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" v-for="item in statistics" :key="item.title">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon" :style="{ background: item.color }">
            <el-icon :size="40" color="#fff">
              <component :is="item.icon" />
            </el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-title">{{ item.title }}</div>
            <div class="stat-value">{{ item.value }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :xs="24" :lg="16">
        <el-card>
          <template #header>
            <span>访问趋势</span>
          </template>
          <div ref="lineChart" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card>
          <template #header>
            <span>用户分布</span>
          </template>
          <div ref="pieChart" class="chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { User, Goods, Order, View } from '@element-plus/icons-vue';

const statistics = ref([
    { title: '用户总数', value: 1024, icon: User, color: '#409EFF' },
    { title: '商品总数', value: 256, icon: Goods, color: '#67C23A' },
    { title: '订单总数', value: 168, icon: Order, color: '#E6A23C' },
    { title: '访问量', value: 8888, icon: View, color: '#F56C6C' }
]);

const lineChart = ref<HTMLElement>();
const pieChart = ref<HTMLElement>();
let lineChartInstance: echarts.ECharts | null = null;
let pieChartInstance: echarts.ECharts | null = null;

onMounted(() => {
    initLineChart();
    initPieChart();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    lineChartInstance?.dispose();
    pieChartInstance?.dispose();
});

const initLineChart = () => {
    if (!lineChart.value) return;
    
    lineChartInstance = echarts.init(lineChart.value);
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
                    { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
                ])
            }
        }]
    };
    lineChartInstance.setOption(option);
};

const initPieChart = () => {
    if (!pieChart.value) return;
    
    pieChartInstance = echarts.init(pieChart.value);
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false
            },
            data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' }
            ]
        }]
    };
    pieChartInstance.setOption(option);
};

const handleResize = () => {
    lineChartInstance?.resize();
    pieChartInstance?.resize();
};
</script>

<style scoped>
.dashboard-container {
    padding: 20px;
}
.stat-card {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.stat-icon {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
}
.stat-info {
    flex: 1;
}
.stat-title {
    color: #909399;
    font-size: 14px;
    margin-bottom: 10px;
}
.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
}
.chart-row {
    margin-top: 20px;
}
.chart {
    height: 350px;
}
</style>
```

## 学习要点

1. **TypeScript 类型安全** - 使用接口定义 API 返回数据类型
2. **组合式 API** - 使用 setup 语法糖编写组件
3. **权限控制** - 基于角色的动态路由和指令权限
4. **状态管理** - 使用 Pinia 替代 Vuex，更好的 TypeScript 支持
5. **数据可视化** - 使用 ECharts 展示统计数据

## 🔗 相关文档

- [Vue 完全指南](../frameworks/vue.md) - Vue 3 组合式 API
- [TypeScript 完全指南](../frameworks/typescript.md) - TypeScript 基础
- [Element Plus](https://element-plus.org/) - 官方文档
- [Pinia](https://pinia.vuejs.org/) - 状态管理文档
