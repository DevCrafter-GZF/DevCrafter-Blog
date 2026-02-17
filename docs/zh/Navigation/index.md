---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
outline: [2, 3, 4]
---

<style src="./nav.css"></style>

<script setup>
import { NAV_DATA } from './data.ts'
</script>

# DevCrafter's 导航

<MNavLinks
  v-for="{ title, items } in NAV_DATA"
  :key="title"
  :title="title"
  :items="items"
/>

::: tip
该导航借鉴了 [前端导航 | 茂茂物语](https://github.com/maomao1996/vitepress-nav-template) 开源项目，在此感谢作者的贡献。
:::
