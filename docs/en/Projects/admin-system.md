# Admin System Project <Badge type="tip" text="Vue 3" />

> [!TIP]
> Enterprise-level admin management system developed based on Vue 3 + Element Plus + TypeScript, including permission management, data visualization and other features.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 3.x | Frontend Framework |
| TypeScript | 5.x | Type System |
| Element Plus | 2.x | UI Component Library |
| Vue Router | 4.x | Route Management |
| Pinia | 2.x | State Management |
| Axios | 1.x | HTTP Requests |
| ECharts | 5.x | Data Visualization |

## Project Setup

### Create Project

```bash
# Create project using create-vue
npm create vue@latest admin-system

# Select TypeScript, Router, Pinia
```

### Install Dependencies

```bash
# UI library
npm install element-plus

# Icons
npm install @element-plus/icons-vue

# HTTP client
npm install axios

# Charts
npm install echarts
```

### Element Plus Auto Import

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

## Project Structure

```
src/
├── api/                 # API interfaces
├── assets/              # Static resources
├── components/          # Common components
├── composables/         # Composition functions
├── layouts/             # Layout components
├── router/              # Route configuration
├── stores/              # Pinia stores
├── utils/               # Utility functions
├── views/               # Page components
├── App.vue
└── main.ts
```

## Core Features

### 1. Route Configuration

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: { public: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'Odometer' }
      },
      {
        path: 'users',
        component: () => import('@/views/User/index.vue'),
        meta: { title: 'User Management', icon: 'User', permission: 'user:view' }
      },
      {
        path: 'roles',
        component: () => import('@/views/Role/index.vue'),
        meta: { title: 'Role Management', icon: 'Key', permission: 'role:view' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (!to.meta.public && !userStore.token) {
    next('/login')
  } else if (to.meta.permission && !userStore.hasPermission(to.meta.permission)) {
    next('/403')
  } else {
    next()
  }
})

export default router
```

### 2. Pinia Store

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref<any>({})
  const permissions = ref<string[]>([])

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const hasPermission = (perm: string) => permissions.value.includes(perm)

  // Actions
  const loginAction = async (credentials: { username: string; password: string }) => {
    const res = await login(credentials)
    token.value = res.token
    localStorage.setItem('token', res.token)
    return res
  }

  const fetchUserInfo = async () => {
    const res = await getUserInfo()
    userInfo.value = res.data
    permissions.value = res.data.permissions || []
  }

  const logout = () => {
    token.value = ''
    userInfo.value = {}
    permissions.value = []
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    permissions,
    isLoggedIn,
    hasPermission,
    loginAction,
    fetchUserInfo,
    logout
  }
})
```

### 3. Login Page

```vue
<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="formRef">
      <h2>Admin System</h2>
      
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="Username">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="Password">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <el-button type="primary" @click="handleLogin" :loading="loading">
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
}

const handleLogin = async () => {
  await formRef.value.validate()
  loading.value = true
  
  try {
    await userStore.loginAction(form)
    await userStore.fetchUserInfo()
    ElMessage.success('Login successful')
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.el-form {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.el-button {
  width: 100%;
}
</style>
```

### 4. Dashboard - Data Visualization

```vue
<template>
  <div class="dashboard">
    <!-- Statistics Cards -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in stats" :key="item.title">
        <el-card>
          <div class="stat-item">
            <div class="icon" :style="{ background: item.color }">
              <el-icon :size="24"><component :is="item.icon" /></el-icon>
            </div>
            <div class="info">
              <p class="value">{{ item.value }}</p>
              <p class="label">{{ item.title }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Charts -->
    <el-row :gutter="20" class="charts">
      <el-col :span="12">
        <el-card title="User Growth Trend">
          <div ref="lineChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card title="User Distribution">
          <div ref="pieChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getStats, getUserGrowth, getUserDistribution } from '@/api/dashboard'

const lineChart = ref<HTMLElement>()
const pieChart = ref<HTMLElement>()

const stats = ref([
  { title: 'Total Users', value: 0, icon: 'User', color: '#409EFF' },
  { title: 'Active Users', value: 0, icon: 'UserFilled', color: '#67C23A' },
  { title: 'Total Orders', value: 0, icon: 'ShoppingCart', color: '#E6A23C' },
  { title: 'Revenue', value: 0, icon: 'Money', color: '#F56C6C' }
])

onMounted(async () => {
  // Load statistics
  const statsRes = await getStats()
  stats.value[0].value = statsRes.totalUsers
  stats.value[1].value = statsRes.activeUsers
  stats.value[2].value = statsRes.totalOrders
  stats.value[3].value = statsRes.revenue

  // Line chart
  const growthRes = await getUserGrowth()
  const line = echarts.init(lineChart.value!)
  line.setOption({
    xAxis: { type: 'category', data: growthRes.dates },
    yAxis: { type: 'value' },
    series: [{
      data: growthRes.values,
      type: 'line',
      smooth: true,
      areaStyle: {}
    }]
  })

  // Pie chart
  const distRes = await getUserDistribution()
  const pie = echarts.init(pieChart.value!)
  pie.setOption({
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: distRes
    }]
  })
})
</script>

<style scoped>
.stat-item {
  display: flex;
  align-items: center;
}

.icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.info {
  margin-left: 15px;
}

.value {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.label {
  color: #999;
  margin: 5px 0 0;
}

.charts {
  margin-top: 20px;
}
</style>
```

### 5. User Management - CRUD

```vue
<template>
  <div class="user-management">
    <!-- Search -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="Username">
        <el-input v-model="searchForm.username" placeholder="Enter username" />
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="searchForm.status" placeholder="Select status">
          <el-option label="Active" :value="1" />
          <el-option label="Inactive" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">Search</el-button>
        <el-button @click="reset">Reset</el-button>
      </el-form-item>
    </el-form>

    <!-- Toolbar -->
    <el-button type="primary" @click="handleAdd">Add User</el-button>

    <!-- Table -->
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="status" label="Status">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'">
            {{ row.status ? 'Active' : 'Inactive' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Create Time" />
      <el-table-column label="Actions" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next"
      @change="loadData"
    />

    <!-- Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { getUserList, addUser, updateUser, deleteUser } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const tableData = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const searchForm = reactive({
  username: '',
  status: undefined
})

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref()
const form = reactive({
  id: undefined,
  username: '',
  email: '',
  phone: '',
  status: true
})

const rules = {
  username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
  email: [{ required: true, message: 'Please enter email', trigger: 'blur' }]
}

const loadData = async () => {
  loading.value = true
  const res = await getUserList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchForm
  })
  tableData.value = res.list
  total.value = res.total
  loading.value = false
}

const reset = () => {
  searchForm.username = ''
  searchForm.status = undefined
  loadData()
}

const handleAdd = () => {
  dialogTitle.value = 'Add User'
  form.id = undefined
  form.username = ''
  form.email = ''
  form.phone = ''
  form.status = true
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = 'Edit User'
  Object.assign(form, row)
  dialogVisible.value = true
}

const submit = async () => {
  await formRef.value.validate()
  if (form.id) {
    await updateUser(form)
    ElMessage.success('Updated successfully')
  } else {
    await addUser(form)
    ElMessage.success('Added successfully')
  }
  dialogVisible.value = false
  loadData()
}

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('Are you sure to delete this user?', 'Warning', {
    type: 'warning'
  })
  await deleteUser(row.id)
  ElMessage.success('Deleted successfully')
  loadData()
}

onMounted(loadData)
</script>
```

## Project Highlights

- **RBAC Permission**: Role-based access control
- **TypeScript**: Full type safety
- **Auto Import**: Simplified component imports
- **Pinia**: Modern state management
- **ECharts**: Rich data visualization
- **Element Plus**: Professional UI components
