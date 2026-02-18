import {enNav} from '../nav/index'
import {enSidebar} from '../sidebar/index'
import type {DefaultTheme, LocaleSpecificConfig} from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: 'en-US',
  themeConfig: { // 主题设置
    lastUpdatedText: 'Last update', // 上次更新显示文本
    returnToTopLabel: 'Return to top', // 更改手机端菜单文字显示
    sidebarMenuLabel: 'Menu', // 目录
    outline: {
      level: [2, 4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: 'Current page outline' // 文字显示
    },
    nav: enNav,
    sidebar: enSidebar, // 侧边栏
    // search: {
    //   provider: 'local',
    //   options: {
    //     locales: {
    //       root: {
    //         translations: {
    //           button: {
    //             buttonText: 'Search',
    //             buttonAriaLabel: 'Search',
    //           },
    //           modal: {
    //             displayDetails: 'Display detailed list',
    //             resetButtonTitle: 'Reset search',
    //             backButtonTitle: 'Close search',
    //             noResultsText: 'No results for',
    //             footer: {
    //               selectText: 'to select',
    //               selectKeyAriaLabel: 'enter',
    //               navigateText: 'to navigate',
    //               navigateUpKeyAriaLabel: 'up arrow',
    //               navigateDownKeyAriaLabel: 'down arrow',
    //               closeText: 'to close',
    //               closeKeyAriaLabel: 'escape',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    darkModeSwitchLabel: 'Light dark theme',
    footer: {
      message: 'Released under the MIT License.',
      // 自动更新时间
      copyright: `Copyright © 2024-${new Date().getFullYear()}`,
    },
  },
}
