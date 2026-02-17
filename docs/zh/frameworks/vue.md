# Vue 完全指南 <Badge type="tip" text="Vue 2/3" />

> [!TIP]
> 本指南涵盖 Vue 2 和 Vue 3 的完整知识体系，帮助你从入门到实战掌握 Vue 生态系统。

## 📋 内容导航

| 章节 | 内容 | 适用版本 |
|------|------|----------|
| [Vue 核心概念](#一-vue-核心概念) | 响应式原理、模板语法 | Vue 2/3 |
| [选项式 API](#二-选项式-api-vue-2-3) | data、methods、computed | Vue 2/3 |
| [组合式 API](#三-组合式-api-vue-3) | setup、ref、reactive | Vue 3 |
| [组件系统](#四-组件系统) | 组件通信、插槽、动态组件 | Vue 2/3 |
| [状态管理](#五-状态管理) | Vuex、Pinia | Vue 2/3 |
| [路由系统](#六-路由系统) | Vue Router 配置 | Vue 2/3 |
| [工程化](#七-工程化配置) | Webpack、Vite、CLI | Vue 2/3 |
| [进阶主题](#八-进阶主题) | 性能优化、渲染机制、组合式函数 | Vue 3 |
| [版本对比](#九-vue-2-vs-vue-3-对比) | 差异与迁移指南 | - |


## Vue 核心概念

### 1.1 什么是 Vue

Vue 是一套用于构建用户界面的**渐进式框架**，核心库只关注视图层，易于上手，便于与第三方库或既有项目整合。

### 1.2 响应式原理对比

#### Vue 2.x - Object.defineProperty

```javascript
// 原理：遍历对象属性，转换为 getter/setter
// 缺点：
// 1. 无法检测对象属性的添加/删除
// 2. 无法检测数组索引和长度的变化
// 3. 需要递归遍历，性能开销大

// 解决方案：使用 Vue.set / Vue.delete
Vue.set(obj, 'newProp', value);
Vue.delete(obj, 'prop');
```

#### Vue 3.x - Proxy

```javascript
// 原理：使用 ES6 Proxy 代理整个对象
// 优点：
// 1. 可以检测对象属性的添加/删除
// 2. 可以检测数组索引和长度的变化
// 3. 不需要递归遍历，性能更好
// 4. 支持 Map、Set 等数据结构
```

### 1.3 模板语法

#### 插值表达式

```vue
<template>
  <div>
    <!-- 文本插值 -->
    <span>{{ message }}</span>
    
    <!-- 原始 HTML -->
    <div v-html="rawHtml"></div>
    
    <!-- 属性绑定 -->
    <div v-bind:id="dynamicId"></div>
    <div :id="dynamicId"></div>  <!-- 简写 -->
    
    <!-- JavaScript 表达式 -->
    <span>{{ number + 1 }}</span>
    <span>{{ ok ? 'YES' : 'NO' }}</span>
    <span>{{ message.split('').reverse().join('') }}</span>
  </div>
</template>
```

#### 指令

```vue
<template>
  <div>
    <!-- 条件渲染 -->
    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else>Other</div>
    
    <!-- 显示/隐藏 -->
    <div v-show="isShow">显示内容</div>
    
    <!-- 列表渲染 -->
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index }} - {{ item.name }}
      </li>
    </ul>
    
    <!-- 事件绑定 -->
    <button v-on:click="handleClick">点击</button>
    <button @click="handleClick">点击</button>  <!-- 简写 -->
    
    <!-- 双向绑定 -->
    <input v-model="message">
    <input v-model.lazy="message">      <!-- 懒更新 -->
    <input v-model.number="age">        <!-- 数字类型 -->
    <input v-model.trim="name">          <!-- 去除空格 -->
  </div>
</template>
```


## 选项式 API (Vue 2/3)

### 2.1 基础结构

```vue
<script>
export default {
  // 数据
  data() {
    return {
      message: 'Hello Vue',
      count: 0,
      user: {
        name: '张三',
        age: 18
      }
    }
  },
  
  // 计算属性
  computed: {
    // 只读计算属性
    fullName() {
      return this.user.firstName + ' ' + this.user.lastName;
    },
    
    // 可写计算属性
    fullName: {
      get() {
        return this.user.firstName + ' ' + this.user.lastName;
      },
      set(value) {
        const names = value.split(' ');
        this.user.firstName = names[0];
        this.user.lastName = names[1];
      }
    }
  },
  
  // 侦听器
  watch: {
    // 简单监听
    message(newVal, oldVal) {
      console.log('message changed:', newVal, oldVal);
    },
    
    // 深度监听
    user: {
      deep: true,
      immediate: true,
      handler(newVal) {
        console.log('user changed:', newVal);
      }
    }
  },
  
  // 方法
  methods: {
    handleClick() {
      this.count++;
    },
    
    async fetchData() {
      const res = await fetch('/api/data');
      this.data = await res.json();
    }
  }
}
</script>
```

### 2.2 生命周期钩子

```vue
<script>
export default {
  // 创建阶段
  beforeCreate() {
    // 实例初始化，数据观测和事件配置之前
  },
  created() {
    // 实例创建完成，数据观测完成，但 DOM 未生成
    // 适合：数据初始化、API 请求
  },
  
  // 挂载阶段
  beforeMount() {
    // 挂载开始之前
  },
  mounted() {
    // DOM 挂载完成
    // 适合：DOM 操作、第三方库初始化
  },
  
  // 更新阶段
  beforeUpdate() {
    // 数据更新，DOM 重新渲染之前
  },
  updated() {
    // DOM 重新渲染完成
  },
  
  // 销毁阶段 (Vue 2)
  beforeDestroy() {
    // 实例销毁之前
    // 适合：清理定时器、取消订阅
  },
  destroyed() {
    // 实例销毁完成
  },
  
  // 卸载阶段 (Vue 3)
  beforeUnmount() {
    // 组件卸载之前
  },
  unmounted() {
    // 组件卸载完成
  }
}
</script>
```


## 组合式 API (Vue 3)

### 3.1 setup 函数

```vue
<script>
import { ref, reactive, computed, watch, onMounted } from 'vue';

export default {
  setup() {
    // 响应式数据
    const count = ref(0);                    // 基本类型
    const user = reactive({                  // 对象类型
      name: '张三',
      age: 18
    });
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2);
    
    // 方法
    const increment = () => {
      count.value++;
    };
    
    // 侦听器
    watch(count, (newVal, oldVal) => {
      console.log('count changed:', newVal);
    });
    
    // 生命周期
    onMounted(() => {
      console.log('component mounted');
    });
    
    // 暴露给模板
    return {
      count,
      user,
      doubleCount,
      increment
    };
  }
}
</script>
```

### 3.2 `<script setup>` 语法糖

```vue
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import MyComponent from './MyComponent.vue';

// 响应式数据
const count = ref(0);
const user = reactive({
  name: '张三',
  age: 18
});

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 方法
const increment = () => {
  count.value++;
};

// 侦听器
watch(count, (newVal) => {
  console.log('count changed:', newVal);
});

// 生命周期
onMounted(() => {
  console.log('component mounted');
});

// Props 定义
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

// Emits 定义
const emit = defineEmits(['update', 'delete']);

const handleUpdate = () => {
  emit('update', count.value);
};
</script>
```

### 3.3 ref vs reactive

| 特性 | ref | reactive |
|------|-----|----------|
| 数据类型 | 基本类型 + 对象 | 仅对象 |
| 访问方式 | `.value` | 直接访问 |
| 替换对象 | 可以整个替换 | 会失去响应式 |
| 解构 | 保持响应式 | 失去响应式 |

```vue
<script setup>
import { ref, reactive, toRefs } from 'vue';

// ref - 推荐用于基本类型
const count = ref(0);
console.log(count.value);  // 访问需要 .value

// reactive - 用于复杂对象
const user = reactive({
  name: '张三',
  age: 18
});
console.log(user.name);    // 直接访问

// reactive 解构会失去响应式
const { name, age } = user;  // ❌ 失去响应式

// 解决方案：使用 toRefs
const { name: userName, age: userAge } = toRefs(user);  // ✅ 保持响应式
</script>
```

### 3.4 watch vs watchEffect

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);
const name = ref('张三');

// watch - 显式指定依赖
watch(count, (newVal, oldVal) => {
  console.log('count changed:', newVal, oldVal);
});

// 监听多个源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('changed');
});

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(count.value);  // 自动追踪
  console.log(name.value);   // 自动追踪
});

// watchEffect 清理副作用
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  onCleanup(() => {
    clearInterval(timer);
  });
});
</script>
```


## 组件系统

### 4.1 组件注册

```javascript
// 全局注册 (main.js)
import { createApp } from 'vue';
import App from './App.vue';
import MyComponent from './components/MyComponent.vue';

const app = createApp(App);
app.component('MyComponent', MyComponent);
app.mount('#app');

// 局部注册
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent
  }
}
```

### 4.2 Props 传递

```vue
<!-- 父组件 -->
<template>
  <Child 
    :title="pageTitle" 
    :user="userInfo"
    @update="handleUpdate"
  />
</template>

<!-- 子组件 -->
<script setup>
// 方式一：数组写法
const props = defineProps(['title', 'user']);

// 方式二：对象写法（推荐）
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '默认标题'
  },
  user: {
    type: Object,
    default: () => ({})  // 对象默认值用工厂函数
  },
  count: {
    type: Number,
    validator(value) {
      return value >= 0;
    }
  }
});
</script>
```

### 4.3 组件通信

```vue
<script setup>
import { ref, provide, inject } from 'vue';

// ========== 父传子 ==========
// 父组件
const user = ref({ name: '张三' });

// 子组件
const props = defineProps(['user']);

// ========== 子传父 ==========
// 子组件
const emit = defineEmits(['update', 'delete']);
emit('update', data);

// 父组件
<Child @update="handleUpdate" />

// ========== 依赖注入 ==========
// 祖先组件
const user = ref({ name: '张三' });
provide('user', user);

// 后代组件
const user = inject('user');
const user = inject('user', { name: '默认' });  // 带默认值
</script>
```

### 4.4 插槽

```vue
<!-- 子组件 -->
<template>
  <div class="card">
    <header>
      <slot name="header">默认标题</slot>
    </header>
    <main>
      <slot>默认内容</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Card>
    <template #header>
      <h3>自定义标题</h3>
    </template>
    <p>卡片内容</p>
    <template #footer>
      <button>操作</button>
    </template>
  </Card>
</template>
```


## 状态管理

### 5.1 Vuex (Vue 2/3)

```javascript
// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0,
    user: null
  },
  
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    isLoggedIn(state) {
      return !!state.user;
    }
  },
  
  mutations: {
    INCREMENT(state) {
      state.count++;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('INCREMENT');
      }, 1000);
    },
    
    async login({ commit }, credentials) {
      const user = await api.login(credentials);
      commit('SET_USER', user);
      return user;
    }
  },
  
  modules: {
    cart: cartModule,
    user: userModule
  }
});

// 使用
import { useStore } from 'vuex';

const store = useStore();
store.state.count;
store.getters.doubleCount;
store.commit('INCREMENT');
store.dispatch('incrementAsync');
```

### 5.2 Pinia (Vue 3 推荐)

```javascript
// stores/counter.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 组合式 API 写法
export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0);
  
  // getters
  const doubleCount = computed(() => count.value * 2);
  
  // actions
  function increment() {
    count.value++;
  }
  
  async function incrementAsync() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    count.value++;
  }
  
  return { count, doubleCount, increment, incrementAsync };
});

// 选项式 API 写法
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    age: 18
  }),
  getters: {
    doubleAge: (state) => state.age * 2
  },
  actions: {
    growUp() {
      this.age++;
    }
  }
});

// 使用
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
counter.count++;           // 直接修改
counter.increment();       // 调用 action
console.log(counter.doubleCount);  // 访问 getter
```


## 路由系统

### 6.1 Vue Router 配置

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
    props: true,  // 将路由参数作为 props 传递
    children: [
      {
        path: 'profile',
        component: () => import('@/views/UserProfile.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### 6.2 路由使用

```vue
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();    // 获取当前路由信息
const router = useRouter();  // 获取路由实例

// 获取参数
const userId = route.params.id;
const query = route.query.keyword;

// 导航
router.push('/home');
router.push({ name: 'User', params: { id: 123 } });
router.replace('/home');
router.back();
router.go(-1);
</script>
```

### 6.3 路由守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

// 路由独享守卫
{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from, next) => {
    // 权限检查
    next();
  }
}

// 组件内守卫
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('确定要离开吗？');
  if (!answer) return false;
});
</script>
```


## 工程化配置

### 7.1 Vite + Vue 3

```bash
# 创建项目
npm create vue@latest

# 或
npm create vite@latest my-vue-app -- --template vue
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
```

### 7.2 Vue CLI (Vue 2/3)

```bash
# 安装
npm install -g @vue/cli

# 创建项目
vue create my-project

# 启动
npm run serve

# 构建
npm run build
```

```javascript
// vue.config.js
module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
};
```


## 进阶主题

### 8.1 性能优化

#### 计算属性缓存

```vue
<script setup>
import { ref, computed } from 'vue';

const items = ref([...]);

// ✅ 有缓存，只有 items 变化时才重新计算
const filteredItems = computed(() => {
  return items.value.filter(item => item.active);
});

// ❌ 每次渲染都重新计算
function getFilteredItems() {
  return items.value.filter(item => item.active);
}
</script>
```

#### v-once 和 v-memo

```vue
<template>
  <!-- v-once: 只渲染一次，不再更新 -->
  <div v-once>{{ heavyContent }}</div>
  
  <!-- v-memo: 条件缓存 (Vue 3.2+) -->
  <div v-memo="[valueA, valueB]">
    <!-- 只有 valueA 或 valueB 变化时才重新渲染 -->
    <p>{{ valueA }} - {{ valueB }} - {{ valueC }}</p>
  </div>
</template>
```

#### 虚拟列表

```vue
<script setup>
import { ref, computed } from 'vue';

const items = ref(Array.from({ length: 10000 }, (_, i) => i));
const containerHeight = 400;
const itemHeight = 40;
const visibleCount = Math.ceil(containerHeight / itemHeight);

const scrollTop = ref(0);
const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight));
const endIndex = computed(() => startIndex.value + visibleCount);
const visibleItems = computed(() => 
  items.value.slice(startIndex.value, endIndex.value)
);
const offsetY = computed(() => startIndex.value * itemHeight);

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop;
};
</script>

<template>
  <div class="container" @scroll="handleScroll" :style="{ height: containerHeight + 'px' }">
    <div class="phantom" :style="{ height: items.length * itemHeight + 'px' }"></div>
    <div class="list" :style="{ transform: `translateY(${offsetY}px)` }">
      <div v-for="item in visibleItems" :key="item" :style="{ height: itemHeight + 'px' }">
        Item {{ item }}
      </div>
    </div>
  </div>
</template>
```

### 8.2 渲染机制

#### 虚拟 DOM 与 Diff 算法

```javascript
// Vue 的渲染流程
// 1. 模板编译为渲染函数
// 2. 渲染函数生成虚拟 DOM (VNode)
// 3. Diff 算法比较新旧 VNode
// 4. 更新真实 DOM

// 手动控制渲染
import { h, render } from 'vue';

// 创建 VNode
const vnode = h('div', { class: 'hello' }, 'Hello Vue');

// 渲染到 DOM
render(vnode, document.getElementById('app'));
```

#### 渲染函数 (h 函数)

```vue
<script>
import { h, ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    return () => h('div', { class: 'counter' }, [
      h('p', count.value),
      h('button', { onClick: () => count.value++ }, '+')
    ]);
  }
}
</script>
```

#### JSX 支持

```vue
<script setup lang="jsx">
import { ref } from 'vue';

const count = ref(0);

const renderItem = (item) => (
  <div class="item" key={item.id}>
    <h3>{item.title}</h3>
    <p>{item.content}</p>
  </div>
);
</script>
```

### 8.3 组合式函数 (Composables)

#### 自定义 Hook

```javascript
// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }
  
  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));
  
  return { x, y };
}

// 使用
import { useMouse } from './composables/useMouse';

const { x, y } = useMouse();
```

#### 常用 Composables

```javascript
// useLocalStorage
import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const data = ref(stored ? JSON.parse(stored) : defaultValue);
  
  watch(data, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal));
  }, { deep: true });
  
  return data;
}

// useFetch
import { ref, watchEffect } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  
  const fetchData = async () => {
    loading.value = true;
    try {
      const res = await fetch(url.value);
      data.value = await res.json();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  
  watchEffect(() => {
    fetchData();
  });
  
  return { data, error, loading, refresh: fetchData };
}
```

### 8.4 内置组件

#### Teleport (传送门)

```vue
<template>
  <div class="modal-wrapper">
    <!-- 将内容渲染到 body 下，而不是当前组件位置 -->
    <Teleport to="body">
      <div class="modal" v-if="show">
        <p>模态框内容</p>
        <button @click="show = false">关闭</button>
      </div>
    </Teleport>
  </div>
</template>
```

#### Suspense (异步依赖)

```vue
<template>
  <Suspense>
    <!-- 默认内容：异步组件加载完成显示 -->
    <template #default>
      <AsyncComponent />
    </template>
    
    <!-- 加载中显示 -->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() => 
  import('./components/AsyncComponent.vue')
);
</script>
```

#### KeepAlive (缓存)

```vue
<template>
  <KeepAlive :include="['Home', 'User']" :exclude="['Admin']" :max="10">
    <component :is="currentComponent" />
  </KeepAlive>
</template>

<script setup>
// 组件内控制缓存行为
import { onActivated, onDeactivated } from 'vue';

onActivated(() => {
  console.log('组件被激活');
});

onDeactivated(() => {
  console.log('组件被停用');
});
</script>
```

### 8.5 指令系统

#### 自定义指令

```javascript
// 全局注册
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

// 局部注册
const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value;
  },
  updated(el, binding) {
    el.style.backgroundColor = binding.value;
  }
};

// 使用
<input v-focus />
<p v-highlight="'yellow'">高亮文本</p>
```

#### 指令钩子

```javascript
const myDirective = {
  // 绑定元素挂载前
  beforeMount(el, binding, vnode, prevVnode) {},
  // 绑定元素挂载后
  mounted(el, binding, vnode, prevVnode) {},
  // 更新前
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 更新后
  updated(el, binding, vnode, prevVnode) {},
  // 解绑前
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 解绑后
  unmounted(el, binding, vnode, prevVnode) {}
};
```


## Vue 2 vs Vue 3 对比

### 8.1 核心差异

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| API 风格 | 选项式 API | 选项式 + 组合式 API |
| 响应式原理 | Object.defineProperty | Proxy |
| 性能 | 优秀 | 更优秀（包大小减少 41%） |
| TypeScript | 支持 | 原生支持 |
| 多根节点 | 不支持 | 支持 (Fragment) |
| Teleport | 不支持 | 支持 |
| Suspense | 不支持 | 支持 |
| 全局 API | Vue.xxx | app.xxx |

### 8.2 迁移指南

```javascript
// Vue 2 全局配置
Vue.config.productionTip = false;
Vue.component('MyComponent', MyComponent);

// Vue 3 全局配置
const app = createApp(App);
app.config.productionTip = false;
app.component('MyComponent', MyComponent);
app.mount('#app');
```

### 8.3 生命周期映射

| Vue 2 | Vue 3 (Options) | Vue 3 (Composition) |
|-------|-----------------|---------------------|
| beforeCreate | beforeCreate | setup() |
| created | created | setup() |
| beforeMount | beforeMount | onBeforeMount |
| mounted | mounted | onMounted |
| beforeUpdate | beforeUpdate | onBeforeUpdate |
| updated | updated | onUpdated |
| beforeDestroy | beforeUnmount | onBeforeUnmount |
| destroyed | unmounted | onUnmounted |


## 🔗 相关资源

- [Vue 官方文档](https://cn.vuejs.org/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Pinia](https://pinia.vuejs.org/zh/)
- [Vuex](https://vuex.vuejs.org/zh/)
- [Vite](https://cn.vitejs.dev/)


> [!TIP]
> **学习建议**
> 1. 新项目直接使用 Vue 3 + `<script setup>` + Pinia
> 2. Vue 2 项目将于 2024 年底停止维护，建议迁移到 Vue 3
> 3. 掌握组合式 API 后，可以更好地复用逻辑和构建大型应用
