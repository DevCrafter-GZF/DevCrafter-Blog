<!--
 * @Author: GZF
 * @Date: 2025-01-19 09:43:59
 * @Description: 卡片链接
-->

<script lang="ts" setup>
interface Props {
  url: string
  title: string
  description: string
  logo: string
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  title: '',
  description: '',
  logo: '',
})
</script>


<template>
  <div class="linkCard">
    <a :href="props.url" target="_blank">
      <p class="description">{{ props.title }}<br><span>{{ props.description }}</span></p>
      <div class="logo">
        <img :src="props.logo" alt="logo" height="70px" width="70px" />
      </div>
    </a>
  </div>
</template>

<style>
/* 卡片背景 */
.linkCard {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
  transition: color 0.5s, background-color 0.5s;
  margin-top: 15px;
}

/* 卡片鼠标悬停 */
.linkCard:hover {
  background-color: var(--vp-c-yellow-soft);
}

/* 链接样式 */
.linkCard a {
  display: flex;
  align-items: center;
}

/* 描述链接文字 */
.linkCard .description {
  flex: 1;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: var(--vp-c-text-1);
  margin: 0 0 0 16px;
  transition: color 0.5s;
}

/* 描述链接文字2 */
.linkCard .description span {
  font-size: 14px;
}

/* logo图片 */
.linkCard .logo img {
  width: 80px;
  object-fit: contain;
}

/* 链接下划线去除 */
.vp-doc a {
  text-decoration: none;
}
</style>
