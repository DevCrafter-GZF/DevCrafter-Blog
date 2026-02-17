import {DefaultTheme} from 'vitepress'
// @ts-ignore
import {devDependencies} from "../../../../package.json"

export const zhNav: DefaultTheme.NavItem[] = [
  {text: '🏠 首页', link: '/index.md'},
  {
    text: '📖 指南',
    items: [
      {text: '快速开始', link: '/guide/start.md'},
      {text: '学习路线', link: '/guide/directory.md'},
      {text: '关于作者', link: '/guide/about.md'},
      {text: '更新日志', link: '/guide/updates.md'},
    ]
  },
  {
    text: '📚 文档',
    items: [
      {
        text: '📝 写作指南',
        items: [
          {text: 'Markdown 教程', link: '/default/markdown-examples.md'},
        ]
      },
      {
        text: '🌐 前端',
        items: [
          {text: 'HTML', link: '/HTML/index.md'},
          {text: 'CSS', link: '/CSS/index.md'},
          {text: 'JavaScript', link: '/fundamentals/javascript.md'},
          {text: '正则表达式', link: '/JavaScript/regex.md'},
          {text: 'DOM 操作', link: '/WebApi/index.md'},
          {text: 'ECharts', link: '/Echarts/index.md'},
        ]
      },
      {
        text: '🗺️ WebGIS',
        items: [
          {text: '概述', link: '/WebGIS/index.md'},
          {text: '百度地图', link: '/WebGIS/baidu.md'},
          {text: '高德地图', link: '/WebGIS/gaode.md'},
          {text: '天地图', link: '/WebGIS/tianditu.md'},
          {text: 'ECharts 地图', link: '/WebGIS/echarts-map.md'},
        ]
      },
      {
        text: '⚡ 框架',
        items: [
          {text: 'Vue', link: '/frameworks/vue.md'},
          {text: 'React', link: '/React/index.md'},
          {text: 'TypeScript', link: '/frameworks/typescript.md'},
        ]
      },
    ]
  },
  {text: '🧭 导航', link: '/Navigation/index.md', activeMatch: '/Navigation/index.md'},
  {text: `VitePress ${devDependencies.vitepress.replace('^', '')}`, link: 'https://vitepress.dev/'},
  {text: '📅 日志', link: '/log/changelog.md', activeMatch: '/log/changelog.md'}
]
