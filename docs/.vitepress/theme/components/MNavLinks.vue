<template>
  <div>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div v-for="(item,index) in items" :key="index">
      <h4 :style="{ 'text-align': 'left', display: 'block', 'margin': '0 auto', color: item.TextColor }"
        v-if="item.types" :id="formatType[index]" tabindex="-1">
        {{ item.types }}
        <a class="header-anchor" :href="`#${formatType[index]}`" aria-hidden="true"></a>
      </h4>
      <div class="m-nav-links">
        <div v-for="date in item.dates" :key="date.title">
          <MNavLink :noIcon="noIcon" v-bind="date" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { slugify } from '@mdit-vue/shared';
import { computed} from 'vue';
import { withBase } from 'vitepress';
import MNavLink from './MNavLink.vue';

interface NavDate {
  title: string;
  icon: string | {svg: string}
  badge?: string | { text?: string; type?: 'info' | 'tip' | 'warning' | 'danger' |'success' | 'caution' | 'note' | 'default' | 'important'}
  desc?: string;
  link: string;
}

interface NavTypes {
  types: string;
  TextColor?: string;
  dates: NavDate[];
}

const props = defineProps<{
  title: string;
  noIcon?: boolean;
  items: NavTypes[];
}>();

const formatTitle = computed(() => {
  return slugify(props.title);
});

const formatType = computed(() => {
  const types = props.items.map(item => slugify(item.types));
  console.log(types,'types');
  
  // 确保 formatType 数组的长度与 items 数组的长度相同
  return Array.from({ length: props.items.length }, (_, i) => types[i] || '');
});

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
  margin-bottom: var(--m-nav-gap);
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
