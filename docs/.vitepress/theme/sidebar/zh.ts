import { DefaultTheme } from 'vitepress'
export const zhSidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: '📖 指南',
      items: [
        { text: '快速开始', link: '/guide/start.md' },
        { text: '学习路线', link: '/guide/directory.md' },
        { text: '关于作者', link: '/guide/about.md' },
        { text: '更新日志', link: '/guide/updates.md' },
      ],
    },
    {
      text: '🌐 前端',
      collapsed: false,
      items: [
        { text: 'HTML', link: '/HTML/index.md' },
        { text: 'CSS', link: '/CSS/index.md' },
        { text: 'JavaScript', link: '/fundamentals/javascript.md' },
        { text: '正则表达式', link: '/JavaScript/regex.md' },
        { text: 'DOM 操作', link: '/WebApi/index.md' },
        { text: 'ECharts', link: '/Echarts/index.md' },
      ]
    },
    {
      text: '🗺️ WebGIS',
      collapsed: false,
      items: [
        { text: '概述', link: '/WebGIS/index.md' },
        { text: '百度地图', link: '/WebGIS/baidu.md' },
        { text: '高德地图', link: '/WebGIS/gaode.md' },
        { text: '天地图', link: '/WebGIS/tianditu.md' },
        { text: 'ECharts 地图', link: '/WebGIS/echarts-map.md' },
      ]
    },
    {
      text: '⚡ 前端框架',
      collapsed: false,
      items: [
        { text: 'Vue', link: '/frameworks/vue.md' },
        { text: 'React', link: '/React/index.md' },
        { text: 'TypeScript', link: '/frameworks/typescript.md' },
      ]
    },
    {
      text: '🖥️ 后端开发',
      collapsed: false,
      items: [
        { text: 'Node.js', link: '/Node/index.md' },
        { text: 'MySQL', link: '/MySQL/index.md' },
        { text: 'Python', link: '/Python/index.md' },
      ]
    },
    {
      text: '🔧 开发工具',
      collapsed: false,
      items: [
        { text: 'Git', link: '/Git/gitSetting.md' },
      ]
    },
    {
      text: '🚀 项目实战',
      collapsed: false,
      items: [
        { text: '项目概览', link: '/Projects/index.md' },
        { text: '网易云音乐', link: '/Projects/music-app.md' },
        { text: '后台管理系统', link: '/Projects/admin-system.md' },
      ]
    }
  ],
}