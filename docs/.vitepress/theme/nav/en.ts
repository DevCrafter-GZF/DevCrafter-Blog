import { DefaultTheme } from 'vitepress'
import { devDependencies } from '../../../../package.json'
export const enNav: DefaultTheme.NavItem[] = [
    {text: '🏠 Home', link: '/en/', activeMatch: '/en/'},
    {
      text: '📖 Guide',
      items: [
        {text: 'Quick Start', link: '/en/guide/start.md'},
        {text: 'Learning Path', link: '/en/guide/directory.md'},
        {text: 'About Author', link: '/en/guide/about.md'},
        {text: 'Updates', link: '/en/guide/updates.md'},
      ]
    },
    {
      text: '📚 Docs',
      items: [
        {
          text: '🌐 Frontend',
          items: [
            {text: 'HTML', link: '/en/HTML/index.md'},
            {text: 'CSS', link: '/en/CSS/index.md'},
            {text: 'JavaScript', link: '/en/fundamentals/javascript.md'},
            {text: 'RegExp', link: '/en/JavaScript/regex.md'},
            {text: 'DOM', link: '/en/WebApi/index.md'},
            {text: 'ECharts', link: '/en/Echarts/index.md'},
          ]
        },
        {
          text: '🗺️ WebGIS',
          items: [
            {text: 'Overview', link: '/en/WebGIS/index.md'},
            {text: 'Baidu Map', link: '/en/WebGIS/baidu.md'},
            {text: 'AMap', link: '/en/WebGIS/gaode.md'},
            {text: 'Tianditu', link: '/en/WebGIS/tianditu.md'},
            {text: 'ECharts Map', link: '/en/WebGIS/echarts-map.md'},
          ]
        },
        {
          text: '⚡ Frameworks',
          items: [
            {text: 'Vue', link: '/en/frameworks/vue.md'},
            {text: 'React', link: '/en/React/index.md'},
            {text: 'TypeScript', link: '/en/frameworks/typescript.md'},
          ]
        },
      ]
    },
    {text: '🧭 Navigation', link: '/en/Navigation/index.md', activeMatch: '/en/Navigation/index.md'},
    {text: `VitePress ${devDependencies.vitepress.replace('^', '')}`, link: 'https://vitepress.dev/'},
    {text: '📅 Changelog', link: '/en/log/changelog.md', activeMatch: '/en/log/changelog.md'}
]