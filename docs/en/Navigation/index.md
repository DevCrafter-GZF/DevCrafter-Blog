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

# DevCrafter's Navigation

<MNavLinks
  v-for="{ title, items } in NAV_DATA"
  :key="title"
  :title="title"
  :items="items"
/>

::: tip
This navigation is inspired by
the [Front-end Navigation | Maomao Story](https://github.com/maomao1996/vitepress-nav-template) open source project.
Thanks to the author for their contribution.
:::
