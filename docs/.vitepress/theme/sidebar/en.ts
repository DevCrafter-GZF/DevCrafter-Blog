import {DefaultTheme} from 'vitepress'

export const enSidebar: DefaultTheme.Sidebar = {
  '/en/': [
    {
      text: '📖 Guide',
      items: [
        {text: 'Quick Start', link: '/en/guide/start.md'},
        {text: 'Learning Path', link: '/en/guide/directory.md'},
        {text: 'About Author', link: '/en/guide/about.md'},
        {text: 'Updates', link: '/en/guide/updates.md'},
      ],
    },
    {
      text: '🌐 Frontend Basics',
      collapsed: false,
      items: [
        {text: 'HTML', link: '/en/HTML/index.md'},
        {text: 'CSS', link: '/en/CSS/index.md'},
        {text: 'JavaScript', link: '/en/fundamentals/javascript.md'},
        {text: 'Regular Expressions', link: '/en/JavaScript/regex.md'},
        {text: 'DOM Manipulation', link: '/en/WebApi/index.md'},
        {text: 'ECharts', link: '/en/Echarts/index.md'},
      ]
    },
    {
      text: '🗺️ WebGIS',
      collapsed: false,
      items: [
        {text: 'Overview', link: '/en/WebGIS/index.md'},
        {text: 'Baidu Map', link: '/en/WebGIS/baidu.md'},
        {text: 'AMap', link: '/en/WebGIS/gaode.md'},
        {text: 'Tianditu', link: '/en/WebGIS/tianditu.md'},
        {text: 'ECharts Map', link: '/en/WebGIS/echarts-map.md'},
      ]
    },
    {
      text: '⚡ Frontend Frameworks',
      collapsed: false,
      items: [
        {text: 'Vue', link: '/en/frameworks/vue.md'},
        {text: 'React', link: '/en/React/index.md'},
        {text: 'TypeScript', link: '/en/frameworks/typescript.md'},
      ]
    },
    {
      text: '🖥️ Backend Development',
      collapsed: false,
      items: [
        {text: 'Node.js', link: '/en/Node/index.md'},
        {text: 'MySQL', link: '/en/MySQL/index.md'},
        {text: 'Python', link: '/en/Python/index.md'},
      ]
    },
    {
      text: '🔧 DevTools',
      collapsed: false,
      items: [
        {text: 'Git', link: '/en/Git/gitSetting.md'},
      ]
    },
    {
      text: '🚀 Projects',
      collapsed: false,
      items: [
        {text: 'Overview', link: '/en/Projects/index.md'},
      ]
    }
  ],
}
