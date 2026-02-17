import { defineConfig } from 'vitepress'
// @ts-ignore
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import timeline from "vitepress-markdown-timeline"; 
import vitepressProtectPlugin from "vitepress-protect-plugin"

export const sharedConfig = defineConfig({
  rewrites: { // 很重要，
    'zh/:rest*': ':rest*'
  },
  // base: '/',
  cleanUrls: true,
  metaChunk: true,
  // lang: 'zh-CN', // 语言
  title: "DevCrafter Blog",
  // titleTemplate: "Hi，终于等到你", // 网页标题
  description: "Love life and love the world",
  // appearance: true, // 主题模式，默认浅色且开启切换
  lastUpdated: true, // 上次更新
  markdown: {
    lineNumbers: true, // 显示行号
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha'
    },
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    config(md) { 
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
          return htmlResult
      };
      // let fence = md.renderer.rules.fence!
      // md.renderer.rules.fence = function (tokens, idx, options, env, self) {
      //   const { localeIndex = 'root' } = env
      //   const codeCopyButtonTitle = (() => {
      //     switch (localeIndex) {
      //       case 'en':
      //         return 'Copy Code'
      //       default:
      //         return '复制代码'
      //     }
      //   })()
      //   return fence(tokens, idx, options, env, self).replace(
      //     '<button title="Copy Code" class="copy"></button>',
      //     `<button title="${codeCopyButtonTitle}" class="copy"></button>`
      //   )  
      // }
      md.use(groupIconMdPlugin) //代码组图标
      md.use(timeline) //时间轴
    },
  },
  vite: { 
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: 'logos:typescript', //使用在线ts图标
          md: 'logos:markdown', //使用在线markdown图标
          css: 'logos:css-3', //使用在线css图标
          js: 'logos:javascript', //js图标
        },
      }), //代码组图标
      // 保护插件 - 暂时不用
      // vitepressProtectPlugin({
      //   disableF12: true, // 禁用F12开发者模式
      //   disableCopy: true, // 禁用文本复制
      //   disableSelect: true, // 禁用文本选择
      // }),
    ],
  },
  themeConfig: { // 主题设置
    // 在所有页面底部添加自定义 HTML 内容 `在GitHub编辑本页`
    // editLink: { 
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path', // 改成自己的仓库
    //   text: '在GitHub编辑本页'
    // },
  socialLinks: [ // 右上角的社交链接
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }, 
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: 'https://wx.qq.com/',
        ariaLabel: 'weChat'
      } 
  ], 
  search: {
    provider: 'local',
    options: {
      locales: {
        // 中文
        root: {
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索',
            },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '重制搜索',
              backButtonTitle: '关闭搜索',
              noResultsText: '没有找到相关结果',
              footer: {
                selectText: '选择',
                selectKeyAriaLabel: 'enter',
                navigateText: '切换',
                navigateUpKeyAriaLabel: '上方向键',
                navigateDownKeyAriaLabel: '下方向键',
                closeText: '关闭',
                closeKeyAriaLabel: 'esc',
              },
            },
          },
        },
        // 英文
        en:{
          translations: {
            button: {
              buttonText: 'Search',
              buttonAriaLabel: 'Search',
            },
            modal: {
              displayDetails: 'Display detailed list',
              resetButtonTitle: 'Reset search',
              backButtonTitle: 'Close search',
              noResultsText: 'No results for',
              footer: {
                selectText: 'to select',
                selectKeyAriaLabel: 'enter',
                navigateText: 'to navigate',
                navigateUpKeyAriaLabel: 'up arrow',
                navigateDownKeyAriaLabel: 'down arrow',
                closeText: 'to close',
                closeKeyAriaLabel: 'escape',
              },
            },
          },
        }
      },
    },
  },
  logo:{light:'/logo/剪纸龙舞.svg',dark:'/logo/剪影魅凤.svg',alt:'DevCrafter Blog'}, // 导航栏logo
  },
  head: [
      ['link',{ rel: 'icon', href: '/logo/龙凤呈祥.jpeg'}],
      [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=TAG_ID' }
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'TAG_ID');`
      ]
  ],
})

// Giscus 评论组件配置
export const giscusConfig = {
  repo: 'DevCrafter-GZF/BlogComments',
  repoId: '', // 需要从 GitHub 获取
  category: 'Announcements',
  categoryId: '', // 需要从 GitHub 获取
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy'
}
