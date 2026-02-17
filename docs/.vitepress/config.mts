import { defineConfig } from 'vitepress'
// import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
// import { devDependencies } from '../../package.json'

import { sharedConfig } from '../.vitepress/theme/config/share'
import { zhConfig } from '../.vitepress/theme/config/zh'
import { enConfig } from '../.vitepress/theme/config/en'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...sharedConfig,
  locales: {
    root: {
      label: '简体中文',
      lang: 'Zh_CN',
      ...zhConfig
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      ...enConfig
    },
  },
})
