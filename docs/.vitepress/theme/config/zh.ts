import { zhNav } from '../nav/index'
import { zhSidebar } from '../sidebar/index'
import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: 'zh-CN',
  themeConfig: { // 主题设置
    lastUpdatedText: '上次更新', // 上次更新显示文本
    returnToTopLabel: '返回顶部', // 更改手机端菜单文字显示
    nav: zhNav,
    sidebarMenuLabel:'目录', 
    sidebar: zhSidebar, // 侧边栏
    outline: { 
      level: [1,6], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },
    docFooter: { // 自定义上下页名
      prev: '上一篇', next: '下一篇'
    },
    darkModeSwitchLabel: '亮暗主题', // 手机端深浅模式文字修改
    footer: { 
      message: 'Released under the MIT License.', 
      // 自动更新时间
      copyright: `Copyright © 2024-${new Date().getFullYear()}&nbsp;<img src="/logo/PoliceBadge.png" alt="" style="height: 1.5em;">备案号：<a href="https://beian.miit.gov.cn/" target="_blank">京****号</a>', `, 
    }, 
  }
}