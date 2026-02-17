<template>
  <div>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div v-for="item in items" :key="item.types">
      <h4>{{ item.types }}</h4>
      <div class="m-nav-links">
        <div v-for="date in item.dates" :key="date.title">
          <navbar :noIcon="noIcon" v-bind="date" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { slugify } from '@mdit-vue/shared';
import { computed } from 'vue';
import { withBase } from 'vitepress';
import navbar from './navbar.vue';

interface NavDate {
  title: string;
  icon: string | {svg: string}
  badge?: string | { text?: string; type?: 'info' | 'tip' | 'warning' | 'danger' |'success' | 'caution' | 'note' | 'default' | 'important'}
  desc?: string;
  link: string;
}

interface NavTypes {
  types: string;
  icon: string | {svg: string}
  dates: NavDate[];
}

const props = defineProps<{
  title: string;
  icon: string | {svg: string}
  noIcon?: boolean;
  items: NavTypes[];
}>();

const formatTitle = computed(() => {
  return slugify(props.title);
});

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

</script>

<style scoped>
.m-nav-links {
  --m-nav-gap: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@media (min-width: 500px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (min-width: 640px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
}

@media (min-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1440px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
