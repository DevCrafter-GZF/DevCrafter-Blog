import { NavData } from "../../.vitepress/theme/utils/navigationType"

export const NAV_DATA: NavData[] = [
  {
    title: 'IDE与编辑器',
    items: [
      {
        types: 'JetBrains全家桶',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'IntelliJ IDEA',
            desc: 'Java和Kotlin开发的首选IDE',
            link: 'https://www.jetbrains.com/idea/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M11.2 603.2l248 195.2L488 512 134.4 374.4 11.2 603.2z" fill="#FC801D"/><path d="M544 208l168 433.6 312-368L705.6 16 544 208z" fill="#535ADD"/><path d="M1024 273.6l-19.2 592L611.2 1024l-236.8-153.6L720 512l304-238.4z" fill="#2B50AA"/><path d="M785.6 400l-552 83.2L0 404.8 148.8 0l320 38.4L785.6 400z" fill="#9A37C5"/><path d="M192 832h640V192H192v640z"/><path d="M256 752h240v-40H256v40zm161.44-244.16l38.56-43.04a68.96 68.96 0 0 0 51.04 28c23.04 0 41.76-14.08 41.76-46.24V272H608v177.28a101.92 101.92 0 0 1-26.56 74.56 100 100 0 0 1-72.64 25.76 114.24 114.24 0 0 1-91.36-41.76M384 321.12V272h-128v49.12h35.84v172H256V544h128v-50.88h-35.84V321.12H384z" fill="#FFFFFF"/></svg>'},
            badge: { type: 'warning', text: '最流行' }
          },
          {
            title: 'WebStorm',
            desc: '强大的JavaScript IDE',
            link: 'https://www.jetbrains.com/webstorm/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M0 107.2l137.6 817.6L704 1024 878.4 137.6 568 17.6l-150.4 80L256 1.6 0 107.2z" fill="#07C3F2"/><path d="M878.4 137.6L704 1024 137.6 924.8 878.4 137.6z" fill="#C793F3"/><path d="M192 832h640V192H192v640z"/><path d="M566.88 504.48l35.2-42.24a123.84 123.84 0 0 0 80.96 32.8c24.32 0 39.04-9.6 39.04-25.44v-0.8c0-15.04-9.28-22.88-54.56-34.4-54.56-13.92-89.92-29.12-89.92-82.88 0-49.12 39.52-81.76 94.88-81.76a158.08 158.08 0 0 1 100.8 34.24l-31.04 44.96A128 128 0 0 0 672 321.6c-22.88 0-34.88 10.4-34.88 23.68v0.8c0 17.76 11.52 23.68 58.4 35.52 55.04 14.4 85.92 34.08 85.92 81.44 0 53.92-40.96 84-99.52 84a172.48 172.48 0 0 1-114.88-43.2M516.32 272l-39.52 154.88L431.52 272h-44.96l-45.28 154.88L301.92 272H240l75.84 272h49.76l43.52-153.6 42.88 153.6h50.4l75.68-272h-61.76zM256 752h240v-40H256V752z" fill="#FFFFFF"/></svg>'}
          },
          {
            title: 'PyCharm',
            desc: 'Python专业开发IDE',
            link: 'https://www.jetbrains.com/pycharm/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M572.8 579.2h156.8l179.2 49.6 108.8-219.2-299.2-248-145.6 417.6z" fill="#07C3F2"/><path d="M438.4 0l-376 156.8L0 819.2l206.4-22.4 147.2-62.4 4.8-105.6L416 323.2 668.8 152z" fill="#21D789"/><path d="M192 832h640V192H192z"/><path d="M256 752h240v-40H256v40zm103.68-342.85A41.15 41.15 0 0 0 405.44 368c0-26.88-17.92-41.15-46.85-41.15h-44.8v83.07l45.89-.83zM256 272h107.39C426.11 272 464 310.4 464 366.08v.83c0 62.85-47.17 96-106.24 96h-44.03V544H256V272zm227.07 136.96A134.72 134.72 0 0 1 621.44 271.81c39.04-1.92 77.12 12.99 104.45 40.96l-37.12 42.88a97.92 97.92 0 0 0-67.84-29.89A78.59 78.59 0 0 0 544 407.49a78.53 78.53 0 0 0 76.8 83.39 96 96 0 0 0 69.76-31.04l37.12 37.63a135.87 135.87 0 0 1-108.8 48 134.08 134.08 0 0 1-136-136.51" fill="#FFFFFF"/></svg>'}
          },
          {
            title: 'GoLand',
            desc: 'Go语言专用IDE',
            link: 'https://www.jetbrains.com/go/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v1024h1024V0zm288.6 128a232.45 232.45 0 0 1 166.06 57.86L396.12 256.51A155.82 155.82 0 0 0 285.7 213.33c-68.27 0-121.34 59.73-121.34 131.41v1.2c0 77.31 53.08 133.97 128 133.97a147.97 147.97 0 0 0 87.38-25.43V393.73H286.21v-80.21H469.33v183.3a274.26 274.26 0 0 1-180.39 67.07c-131.24 0-221.7-92.33-221.7-217.26v-1.2A216.75 216.75 0 0 1 288.6 128zm445.1 0c130.22 0 223.74 97.11 223.74 217.09v1.2a218.28 218.28 0 0 1-224.94 218.45c-130.39-.85-223.91-97.96-223.91-218.11v-1.2A218.28 218.28 0 0 1 733.7 128zm-1.2 85.33A126.29 126.29 0 0 0 605.87 344.23v1.2a128.34 128.34 0 0 0 128 132.78 126.29 126.29 0 0 0 126.46-131.58v-1.2A128.17 128.17 0 0 0 732.5 213.33zM96.09 832h384v64H96.09z" fill="#00ADD8"/></svg>'}
          },
          {
            title: 'CLion',
            desc: 'C/C++跨平台IDE',
            link: 'https://www.jetbrains.com/clion/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v1024h1024V0H0zm832 832H192V192h640v640z" fill="#21D789"/><path d="M256 752h240v-40H256v40zm79.36-411.2V272h-70.4v68.8h70.4zm0 88v200h-70.4v-200h70.4zm186.24-88c-54.4 0-93.6 38.4-93.6 94.4 0 56 39.2 93.6 96 93.6 30.4 0 55.2-10.4 73.6-29.6l-28-40c-12.8 12-26.4 17.6-42.4 17.6-22.4 0-38.4-12-43.2-32h118.4c.8-4.8 1.6-12 1.6-20 0-53.6-33.6-84-82.4-84zm-40.8 72c2.4-20 16-32 38.4-32 20 0 32.8 11.2 35.2 32h-73.6z" fill="#FFFFFF"/></svg>'}
          },
          {
            title: 'Rider',
            desc: '.NET和Unity游戏开发IDE',
            link: 'https://www.jetbrains.com/rider/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'DataGrip',
            desc: '数据库管理IDE，支持多种数据库',
            link: 'https://www.jetbrains.com/datagrip/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'PhpStorm',
            desc: 'PHP开发专用IDE',
            link: 'https://www.jetbrains.com/phpstorm/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'RubyMine',
            desc: 'Ruby和Rails开发IDE',
            link: 'https://www.jetbrains.com/rubymine/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'RustRover',
            desc: 'Rust语言专用IDE',
            link: 'https://www.jetbrains.com/rust/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'Fleet',
            desc: 'JetBrains轻量级代码编辑器',
            link: 'https://www.jetbrains.com/fleet/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          }
        ]
      },
      {
        types: 'VS Code及其衍生',
        TextColor: '#007ACC',
        dates: [
          {
            title: 'VS Code',
            desc: '微软推出的轻量级代码编辑器，拥有丰富的插件生态',
            link: 'https://code.visualstudio.com/',
            icon: 'https://code.visualstudio.com/assets/favicon.ico',
            badge: { type: 'warning', text: '最流行' }
          },
          {
            title: 'Cursor',
            desc: '基于AI的代码编辑器，内置GPT-4',
            link: 'https://www.cursor.com/',
            icon: 'https://www.cursor.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-dark.c2eae9ea.png&w=768&q=100',
            badge: { type: 'important', text: 'AI驱动' }
          },
          {
            title: 'Trae',
            desc: '字节跳动AI编程IDE，免费使用Claude模型',
            link: 'https://www.trae.ai/',
            icon: 'https://www.trae.ai/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: 'Windsurf',
            desc: 'Codeium推出的AI代码编辑器，支持多模型',
            link: 'https://codeium.com/windsurf',
            icon: 'https://codeium.com/favicon.ico'
          },
          {
            title: 'VSCodium',
            desc: 'VS Code的开源版本，无微软遥测',
            link: 'https://vscodium.com/',
            icon: 'https://vscodium.com/img/codium_cnl.svg'
          }
        ]
      },
      {
        types: '传统编辑器',
        TextColor: '#0e932e',
        dates: [
          {
            title: 'Sublime Text',
            desc: '轻量级、快速的文本编辑器，启动速度极快',
            link: 'https://www.sublimetext.com/',
            icon: 'https://www.sublimetext.com/favicon.ico'
          },
          {
            title: 'Vim',
            desc: '强大的命令行文本编辑器，高效键盘操作',
            link: 'https://www.vim.org/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1024 511.4h-1.15L838.61 327.17l183.6-188.33V62.34l-27.69-27.65h-349.78l-28.16 25.81v44.59L512.64 1.15V0L512 .6l-.6-.6v1.15l-55.04 55.08-22.95-23H86.83l-27.22 29.53v80.43l26.28 26.28h30.72v226.56L1.15 511.45H0l.6.55-.6.55h1.15l115.46 115.46v275.93l38.7 22.31h99.07l79.23-81.24 177.75 177.75V1024l.64-.6.6.6v-1.2l107.09-107.05h20.7a11.18 11.18 0 0 0 10.67-7.64l6.23-18.18a11.18 11.18 0 0 0-1.58-10.2l62.38-62.38-26.11 83.71a11.31 11.31 0 0 0 10.88 14.68h77.82a11.35 11.35 0 0 0 10.37-6.95l7.04-16.81a11.52 11.52 0 0 0-10.54-15.57h-3.2l35.84-112.81h52.57l-43.35 137.43a11.35 11.35 0 0 0 10.88 14.68h85.42a11.35 11.35 0 0 0 10.58-7.25l7-18.26a11.35 11.35 0 0 0-10.62-15.28h-6.19l48.26-156.71a11.22 11.22 0 0 0-1.66-10.24l-16-21.5a11.39 11.39 0 0 0-8.92-4.35h-61.27a11.35 11.35 0 0 0-8.11 3.46l-17.07 18.73h-26.62l-1.79-1.96 189.65-189.65H1024l-.6.55.6-.55zM238.51 888.7H165.42l-11.18-6.4V131.88H101.5l-4.27-4.27V77.44l6.1-6.57h314.5l9.09 9.13v47.27l-6.06 7.38H374.83v370.69l375.76-370.69h-89l-7.47-8.02V77.01l5.16-4.74h319.57l5.63 5.67v45.65L553.77 565.33h-15.91l-1.79.05-.85.12a11.05 11.05 0 0 0-5.08 2.56l-14.63 12.59-.17.13a11.65 11.65 0 0 0-3.12 4.73l-12.63 35.42-261.08 267.78z" fill="#0e932e"/></svg>'}
          },
          {
            title: 'Neovim',
            desc: 'Vim的现代化重构版本，更好的插件生态',
            link: 'https://neovim.io/',
            icon: 'https://neovim.io/favicon.ico'
          },
          {
            title: 'Emacs',
            desc: '可扩展的文本编辑器，被称为伪装成编辑器的操作系统',
            link: 'https://www.gnu.org/software/emacs/',
            icon: 'https://www.gnu.org/software/emacs/favicon.ico'
          },
          {
            title: 'Notepad++',
            desc: 'Windows平台轻量级代码编辑器',
            link: 'https://notepad-plus-plus.org/',
            icon: 'https://notepad-plus-plus.org/favicon.ico'
          },
          {
            title: 'Zed',
            desc: '高性能协作代码编辑器，支持多人实时编辑',
            link: 'https://zed.dev/',
            icon: 'https://zed.dev/favicon.ico'
          }
        ]
      },
      {
        types: '平台专用IDE',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'Xcode',
            desc: 'Apple官方IDE，用于开发iOS/macOS应用',
            link: 'https://developer.apple.com/xcode/',
            icon: 'https://developer.apple.com/assets/elements/icons/xcode-12/xcode-12-96x96_2x.png'
          },
          {
            title: 'Android Studio',
            desc: 'Google官方Android开发IDE',
            link: 'https://developer.android.com/studio',
            icon: 'https://developer.android.com/static/studio/images/new-studio-logo-1.png'
          },
          {
            title: 'DevEco Studio',
            desc: '华为鸿蒙HarmonyOS应用开发IDE',
            link: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V14/ide-tools-overview-V14',
            icon: 'https://developer.harmonyos.com/assets/image/favicon.ico'
          },
          {
            title: 'HBuilderX',
            desc: 'DCloud出品的轻量级前端开发IDE',
            link: 'https://www.dcloud.io/hbuilderx.html',
            icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/hx.png'
          }
        ]
      }
    ]
  },
  {
    title: '编程语言',
    items: [
      {
        types: '主流语言',
        TextColor: '#F7DF1E',
        dates: [
          {
            title: 'JavaScript',
            desc: 'Web开发的核心语言，全栈通用',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
            icon: 'https://developer.mozilla.org/favicon-48x48.png'
          },
          {
            title: 'TypeScript',
            desc: 'JavaScript的超集，添加静态类型系统',
            link: 'https://www.typescriptlang.org/',
            icon: 'https://www.typescriptlang.org/favicon-32x32.png',
            badge: { type: 'warning', text: '推荐' }
          },
          {
            title: 'Python',
            desc: '简洁优雅的多用途编程语言，AI首选',
            link: 'https://www.python.org/',
            icon: 'https://www.python.org/static/favicon.ico'
          },
          {
            title: 'Java',
            desc: '跨平台企业级编程语言',
            link: 'https://www.java.com/',
            icon: 'https://www.java.com/favicon.ico'
          },
          {
            title: 'Go',
            desc: 'Google开发的高性能编程语言',
            link: 'https://go.dev/',
            icon: 'https://go.dev/favicon.ico'
          },
          {
            title: 'Rust',
            desc: '安全、并发、实用的系统编程语言',
            link: 'https://www.rust-lang.org/',
            icon: 'https://www.rust-lang.org/static/images/favicon.svg'
          },
          {
            title: 'C++',
            desc: '高性能系统级编程语言',
            link: 'https://isocpp.org/',
            icon: 'https://isocpp.org/favicon.ico'
          },
          {
            title: 'C#',
            desc: '微软开发的现代面向对象语言',
            link: 'https://dotnet.microsoft.com/languages/csharp',
            icon: 'https://dotnet.microsoft.com/favicon.ico'
          }
        ]
      },
      {
        types: '函数式与脚本',
        TextColor: '#7F52FF',
        dates: [
          {
            title: 'Kotlin',
            desc: 'JetBrains开发的现代JVM语言',
            link: 'https://kotlinlang.org/',
            icon: 'https://kotlinlang.org/favicon.ico'
          },
          {
            title: 'Swift',
            desc: 'Apple开发的iOS/macOS开发语言',
            link: 'https://swift.org/',
            icon: 'https://swift.org/favicon.ico'
          },
          {
            title: 'Ruby',
            desc: '简洁优雅的动态脚本语言',
            link: 'https://www.ruby-lang.org/',
            icon: 'https://www.ruby-lang.org/favicon.ico'
          },
          {
            title: 'PHP',
            desc: 'Web开发服务端脚本语言',
            link: 'https://www.php.net/',
            icon: 'https://www.php.net/favicon.ico'
          },
          {
            title: 'Lua',
            desc: '轻量级嵌入式脚本语言',
            link: 'https://www.lua.org/',
            icon: 'https://www.lua.org/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: '前端框架与生态',
    items: [
      {
        types: 'Vue生态',
        TextColor: '#42B883',
        dates: [
          {
            title: 'Vue 3',
            desc: '渐进式JavaScript框架，易学易用',
            link: 'https://cn.vuejs.org/',
            icon: 'https://cn.vuejs.org/logo.svg',
            badge: { type: 'warning', text: '推荐' }
          },
          {
            title: 'Vue 2',
            desc: '渐进式JavaScript框架，经典版本',
            link: 'https://v2.cn.vuejs.org/',
            icon: 'https://v2.cn.vuejs.org/images/logo.svg'
          },
          {
            title: 'Vue Router',
            desc: 'Vue.js官方路由管理器',
            link: 'https://router.vuejs.org/zh/',
            icon: 'https://router.vuejs.org/logo.svg'
          },
          {
            title: 'Pinia',
            desc: 'Vue官方推荐的状态管理库',
            link: 'https://pinia.vuejs.org/zh/',
            icon: 'https://pinia.vuejs.org/logo.svg'
          },
          {
            title: 'Nuxt',
            desc: '基于Vue的SSR框架，服务端渲染',
            link: 'https://nuxt.com/',
            icon: 'https://nuxt.com/icon.png'
          },
          {
            title: 'VueUse',
            desc: 'Vue Composition API的常用工具集',
            link: 'https://vueuse.org/',
            icon: 'https://vueuse.org/favicon.svg'
          },
          {
            title: 'Element Plus',
            desc: '基于Vue 3的组件库',
            link: 'https://element-plus.org/zh-CN/',
            icon: 'https://element-plus.org/images/element-plus-logo-small.svg'
          },
          {
            title: 'Ant Design Vue',
            desc: '企业级UI组件库',
            link: 'https://www.antdv.com/',
            icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg'
          },
          {
            title: 'Vant',
            desc: '轻量、可定制的移动端Vue组件库',
            link: 'https://vant-ui.github.io/vant/',
            icon: 'https://vant-ui.github.io/vant/logo.svg'
          },
          {
            title: 'Cube UI',
            desc: '基于Vue.js实现的精致移动端组件库',
            link: 'https://didi.github.io/cube-ui/',
            icon: 'https://didi.github.io/cube-ui/favicon.ico'
          },
          {
            title: 'NutUI',
            desc: '京东风格的轻量级移动端组件库',
            link: 'https://nutui.jd.com/',
            icon: 'https://nutui.jd.com/logo.png'
          },
          {
            title: 'Vuetify',
            desc: 'Material Design Vue组件库',
            link: 'https://vuetifyjs.com/',
            icon: 'https://vuetifyjs.com/favicon.ico'
          }
        ]
      },
      {
        types: 'React生态',
        TextColor: '#61DAFB',
        dates: [
          {
            title: 'React',
            desc: '用于构建用户界面的JavaScript库',
            link: 'https://zh-hans.react.dev/',
            icon: 'https://zh-hans.react.dev/favicon.ico'
          },
          {
            title: 'React Router',
            desc: 'React的声明式路由',
            link: 'https://reactrouter.com/',
            icon: 'https://reactrouter.com/favicon.ico'
          },
          {
            title: 'Next.js',
            desc: 'React全栈框架，支持SSR和SSG',
            link: 'https://nextjs.org/',
            icon: 'https://nextjs.org/favicon.ico'
          },
          {
            title: 'UmiJS',
            desc: '插件化的企业级前端应用框架',
            link: 'https://umijs.org/',
            icon: 'https://umijs.org/favicon.ico'
          },
          {
            title: 'Ant Design',
            desc: '企业级React UI组件库',
            link: 'https://ant.design/',
            icon: 'https://ant.design/favicon.ico'
          },
          {
            title: 'Ant Design Mobile',
            desc: '构建移动Web应用程序的React组件库',
            link: 'https://mobile.ant.design/',
            icon: 'https://mobile.ant.design/favicon.ico'
          },
          {
            title: 'Zustand',
            desc: '轻量级状态管理解决方案',
            link: 'https://docs.pmnd.rs/zustand/',
            icon: 'https://docs.pmnd.rs/favicon.ico'
          },
          {
            title: 'Valtio',
            desc: 'React和Vanilla的代理状态管理',
            link: 'https://valtio.pmnd.rs/',
            icon: 'https://valtio.pmnd.rs/favicon.ico'
          },
          {
            title: 'Jotai',
            desc: 'React的原始灵活状态管理',
            link: 'https://jotai.org/',
            icon: 'https://jotai.org/favicon.ico'
          },
          {
            title: 'Redux',
            desc: 'JavaScript应用的状态容器',
            link: 'https://redux.js.org/',
            icon: 'https://redux.js.org/img/redux.svg'
          },
          {
            title: 'MobX',
            desc: '简单、可扩展的状态管理',
            link: 'https://mobx.js.org/',
            icon: 'https://mobx.js.org/assets/mobx.png'
          },
          {
            title: 'ahooks',
            desc: '高质量可靠的React Hooks库',
            link: 'https://ahooks.js.org/',
            icon: 'https://ahooks.js.org/logo.svg'
          },
          {
            title: 'MUI',
            desc: 'Material Design React组件库',
            link: 'https://mui.com/',
            icon: 'https://mui.com/static/favicon.ico'
          },
          {
            title: 'Chakra UI',
            desc: '模块化React组件库',
            link: 'https://chakra-ui.com/',
            icon: 'https://chakra-ui.com/favicon.ico'
          }
        ]
      },
      {
        types: '其他框架',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'Svelte',
            desc: '编译时优化的前端框架',
            link: 'https://svelte.dev/',
            icon: 'https://svelte.dev/favicon.png'
          },
          {
            title: 'SolidJS',
            desc: '高性能响应式JavaScript框架',
            link: 'https://www.solidjs.com/',
            icon: 'https://www.solidjs.com/img/favicons/favicon-32x32.png'
          },
          {
            title: 'Angular',
            desc: 'Google开发的企业级前端框架',
            link: 'https://angular.io/',
            icon: 'https://angular.io/assets/images/favicons/favicon.ico'
          },
          {
            title: 'Qwik',
            desc: '即时加载的Web框架',
            link: 'https://qwik.dev/',
            icon: 'https://qwik.dev/favicons/favicon.svg'
          },
          {
            title: 'Alpine.js',
            desc: '轻量级JavaScript框架',
            link: 'https://alpinejs.dev/',
            icon: 'https://alpinejs.dev/favicon.ico'
          },
          {
            title: 'Preact',
            desc: 'React的轻量级替代方案',
            link: 'https://preactjs.com/',
            icon: 'https://preactjs.com/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'CSS与样式',
    items: [
      {
        types: 'CSS框架',
        TextColor: '#38B2AC',
        dates: [
          {
            title: 'Tailwind CSS',
            desc: '实用优先的CSS框架',
            link: 'https://tailwindcss.com/',
            icon: 'https://tailwindcss.com/favicons/favicon.ico',
            badge: { type: 'warning', text: '推荐' }
          },
          {
            title: 'UnoCSS',
            desc: '即时原子化CSS引擎',
            link: 'https://unocss.dev/',
            icon: 'https://unocss.dev/favicon.svg'
          },
          {
            title: 'Bootstrap',
            desc: '流行的响应式前端框架',
            link: 'https://getbootstrap.com/',
            icon: 'https://getbootstrap.com/docs/5.3/assets/img/favicons/favicon.ico'
          },
          {
            title: 'Bulma',
            desc: '现代CSS框架，基于Flexbox',
            link: 'https://bulma.io/',
            icon: 'https://bulma.io/favicon.ico'
          }
        ]
      },
      {
        types: 'CSS预处理器',
        TextColor: '#CC6699',
        dates: [
          {
            title: 'Sass',
            desc: 'CSS扩展语言，功能最强大的预处理器',
            link: 'https://sass-lang.com/',
            icon: 'https://sass-lang.com/favicon.ico'
          },
          {
            title: 'Less',
            desc: '向后兼容的CSS扩展',
            link: 'https://lesscss.org/',
            icon: 'https://lesscss.org/public/img/less_logo.png'
          },
          {
            title: 'Stylus',
            desc: '富有表现力的CSS预处理器',
            link: 'https://stylus-lang.com/',
            icon: 'https://stylus-lang.com/favicon.ico'
          },
          {
            title: 'PostCSS',
            desc: '用JavaScript转换CSS的工具',
            link: 'https://postcss.org/',
            icon: 'https://postcss.org/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: '构建与工具链',
    items: [
      {
        types: '构建工具',
        TextColor: '#646CFF',
        dates: [
          {
            title: 'Vite',
            desc: '下一代前端构建工具，极速冷启动',
            link: 'https://cn.vitejs.dev/',
            icon: 'https://cn.vitejs.dev/logo.svg',
            badge: { type: 'warning', text: '推荐' }
          },
          {
            title: 'Webpack',
            desc: '强大的静态模块打包器',
            link: 'https://webpack.js.org/',
            icon: 'https://webpack.js.org/favicon.a3dd58d3.ico'
          },
          {
            title: 'Rollup',
            desc: 'JavaScript模块打包器',
            link: 'https://rollupjs.org/',
            icon: 'https://rollupjs.org/favicon.png'
          },
          {
            title: 'esbuild',
            desc: '极速JavaScript打包器',
            link: 'https://esbuild.github.io/',
            icon: 'https://esbuild.github.io/favicon.svg'
          },
          {
            title: 'Turbopack',
            desc: '基于Rust的增量打包工具',
            link: 'https://turbo.build/pack',
            icon: 'https://turbo.build/images/favicon-dark.png'
          },
          {
            title: 'Parcel',
            desc: '零配置的Web应用打包器',
            link: 'https://parceljs.org/',
            icon: 'https://parceljs.org/favicon.ico'
          }
        ]
      },
      {
        types: '包管理器',
        TextColor: '#CB3837',
        dates: [
          {
            title: 'npm',
            desc: 'Node.js默认包管理器',
            link: 'https://www.npmjs.com/',
            icon: 'https://static.npmjs.com/favicons/favicon.ico'
          },
          {
            title: 'pnpm',
            desc: '快速、节省磁盘空间的包管理器',
            link: 'https://pnpm.io/zh/',
            icon: 'https://pnpm.io/img/favicon.png'
          },
          {
            title: 'Yarn',
            desc: '快速、可靠、安全的依赖管理',
            link: 'https://yarnpkg.com/',
            icon: 'https://yarnpkg.com/favicon.ico'
          },
          {
            title: 'Bun',
            desc: '快速的JavaScript运行时和包管理器',
            link: 'https://bun.sh/',
            icon: 'https://bun.sh/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'UI设计与原型',
    items: [
      {
        types: '设计工具',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'Figma',
            desc: '协作式界面设计工具，业界标准',
            link: 'https://www.figma.com/',
            icon: 'https://static.figma.com/app/icon/1/favicon.png',
            badge: { type: 'warning', text: '推荐' }
          },
          {
            title: 'Sketch',
            desc: 'macOS平台专业UI设计工具',
            link: 'https://www.sketch.com/',
            icon: 'https://www.sketch.com/favicon.ico'
          },
          {
            title: 'Adobe XD',
            desc: 'Adobe UX/UI设计和原型工具',
            link: 'https://www.adobe.com/products/xd.html',
            icon: 'https://www.adobe.com/favicon.ico'
          },
          {
            title: 'Axure RP',
            desc: '专业原型设计和线框图工具',
            link: 'https://www.axure.com/',
            icon: 'https://www.axure.com/wp-content/uploads/2019/04/favicon.ico'
          }
        ]
      },
      {
        types: '设计协作',
        TextColor: '#1890FF',
        dates: [
          {
            title: '蓝湖',
            desc: '产品设计协作平台，自动标注切图',
            link: 'https://lanhuapp.com/',
            icon: 'https://lanhuapp.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '墨刀',
            desc: '在线原型设计与协作工具',
            link: 'https://modao.cc/',
            icon: 'https://modao.cc/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: 'MasterGo',
            desc: '国产在线设计协作工具',
            link: 'https://mastergo.com/',
            icon: 'https://mastergo.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '即时设计',
            desc: '国产在线UI设计工具',
            link: 'https://js.design/',
            icon: 'https://js.design/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          }
        ]
      },
      {
        types: '图标与素材',
        TextColor: '#722ED1',
        dates: [
          {
            title: 'Iconfont',
            desc: '阿里巴巴矢量图标库',
            link: 'https://www.iconfont.cn/',
            icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg'
          },
          {
            title: 'Font Awesome',
            desc: '最流行的图标库和工具包',
            link: 'https://fontawesome.com/',
            icon: 'https://fontawesome.com/favicon.ico'
          },
          {
            title: 'Heroicons',
            desc: '精美的SVG图标集',
            link: 'https://heroicons.com/',
            icon: 'https://heroicons.com/favicon.ico'
          },
          {
            title: 'Lucide',
            desc: '美观一致的图标库',
            link: 'https://lucide.dev/',
            icon: 'https://lucide.dev/favicon.ico'
          },
          {
            title: 'Unsplash',
            desc: '免费高质量图片素材',
            link: 'https://unsplash.com/',
            icon: 'https://unsplash.com/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: '开发工具',
    items: [
      {
        types: '版本控制',
        TextColor: '#F05032',
        dates: [
          {
            title: 'Git',
            desc: '分布式版本控制系统',
            link: 'https://git-scm.com/',
            icon: 'https://git-scm.com/favicon.ico'
          },
          {
            title: 'GitHub Desktop',
            desc: 'GitHub官方桌面客户端',
            link: 'https://desktop.github.com/',
            icon: 'https://desktop.github.com/favicon.ico'
          },
          {
            title: 'Sourcetree',
            desc: '免费的Git图形化客户端',
            link: 'https://www.sourcetreeapp.com/',
            icon: 'https://www.sourcetreeapp.com/favicon.ico'
          },
          {
            title: 'Fork',
            desc: '简洁美观的Git客户端',
            link: 'https://git-fork.com/',
            icon: 'https://git-fork.com/favicon.ico'
          },
          {
            title: 'GitKraken',
            desc: '强大的Git GUI工具',
            link: 'https://www.gitkraken.com/',
            icon: 'https://www.gitkraken.com/favicon.ico'
          },
          {
            title: 'Lazygit',
            desc: '终端下的Git TUI工具',
            link: 'https://github.com/jesseduffield/lazygit',
            icon: 'https://github.com/favicon.ico'
          }
        ]
      },
      {
        types: 'API工具',
        TextColor: '#FF6C37',
        dates: [
          {
            title: 'Postman',
            desc: 'API开发协作平台',
            link: 'https://www.postman.com/',
            icon: 'https://www.postman.com/favicon.ico'
          },
          {
            title: 'Insomnia',
            desc: '开源的API调试工具',
            link: 'https://insomnia.rest/',
            icon: 'https://insomnia.rest/images/favicon.ico'
          },
          {
            title: 'Hoppscotch',
            desc: '开源API开发生态系统',
            link: 'https://hoppscotch.io/',
            icon: 'https://hoppscotch.io/favicon.ico'
          },
          {
            title: 'Apifox',
            desc: 'API文档、调试、Mock一体化平台',
            link: 'https://www.apifox.cn/',
            icon: 'https://www.apifox.cn/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: 'Bruno',
            desc: '开源API测试工具，Git友好',
            link: 'https://www.usebruno.com/',
            icon: 'https://www.usebruno.com/favicon.ico'
          }
        ]
      },
      {
        types: '数据库工具',
        TextColor: '#336791',
        dates: [
          {
            title: 'Navicat',
            desc: '多数据库管理工具',
            link: 'https://www.navicat.com/',
            icon: 'https://www.navicat.com/favicon.ico'
          },
          {
            title: 'DBeaver',
            desc: '免费开源的数据库管理工具',
            link: 'https://dbeaver.io/',
            icon: 'https://dbeaver.io/favicon.ico'
          },
          {
            title: 'TablePlus',
            desc: '现代化的数据库管理工具',
            link: 'https://tableplus.com/',
            icon: 'https://tableplus.com/favicon.ico'
          },
          {
            title: 'MongoDB Compass',
            desc: 'MongoDB官方GUI工具',
            link: 'https://www.mongodb.com/products/compass',
            icon: 'https://www.mongodb.com/favicon.ico'
          },
          {
            title: 'RedisInsight',
            desc: 'Redis官方可视化工具',
            link: 'https://redis.io/insight/',
            icon: 'https://redis.io/favicon.ico'
          }
        ]
      },
      {
        types: '终端与容器',
        TextColor: '#2496ED',
        dates: [
          {
            title: 'Docker Desktop',
            desc: 'Docker桌面应用',
            link: 'https://www.docker.com/products/docker-desktop/',
            icon: 'https://www.docker.com/favicon.ico'
          },
          {
            title: 'Rancher Desktop',
            desc: 'Kubernetes和容器管理',
            link: 'https://rancherdesktop.io/',
            icon: 'https://rancherdesktop.io/favicon.ico'
          },
          {
            title: 'Podman Desktop',
            desc: '开源容器管理工具',
            link: 'https://podman-desktop.io/',
            icon: 'https://podman-desktop.io/favicon.ico'
          },
          {
            title: 'Warp',
            desc: 'AI驱动的现代化终端',
            link: 'https://www.warp.dev/',
            icon: 'https://www.warp.dev/favicon.ico'
          },
          {
            title: 'Tabby',
            desc: '现代化的跨平台终端',
            link: 'https://tabby.sh/',
            icon: 'https://tabby.sh/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: '小程序与跨端',
    items: [
      {
        types: '小程序开发',
        TextColor: '#07C160',
        dates: [
          {
            title: '微信开发者工具',
            desc: '微信小程序、公众号开发专用工具',
            link: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html',
            icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico'
          },
          {
            title: '支付宝小程序IDE',
            desc: '支付宝小程序开发工具',
            link: 'https://opendocs.alipay.com/mini/ide',
            icon: 'https://gw.alipayobjects.com/mdn/rms_edf6e7/afts/img/A*GzMgSYlSJtIAAAAAAAAAAAAAARQnAQ'
          },
          {
            title: '百度开发者工具',
            desc: '百度智能小程序开发工具',
            link: 'https://smartprogram.baidu.com/docs/develop/devtools/history/',
            icon: 'https://smartprogram.baidu.com/docs/img/favicon.ico'
          },
          {
            title: '字节跳动开发者工具',
            desc: '抖音/头条小程序开发工具',
            link: 'https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/developer-instrument/overview',
            icon: 'https://lf-cdn-tos.bytescm.com/obj/static/byte-developer-portal/1.1.12/favicon.ico'
          },
          {
            title: '快手开发者工具',
            desc: '快手小程序开发工具',
            link: 'https://developer.kuaishou.com/',
            icon: 'https://developer.kuaishou.com/favicon.ico'
          },
          {
            title: 'FinClip Studio',
            desc: '凡泰极客小程序开发工具，支持多端',
            link: 'https://www.finclip.com/',
            icon: 'https://www.finclip.com/favicon.ico'
          }
        ]
      },
      {
        types: '跨端框架',
        TextColor: '#2C3E50',
        dates: [
          {
            title: 'Flutter',
            desc: 'Google的UI工具包，构建跨平台应用',
            link: 'https://flutter.dev/',
            icon: 'https://flutter.dev/favicon.ico'
          },
          {
            title: 'React Native',
            desc: '使用React构建原生应用',
            link: 'https://reactnative.dev/',
            icon: 'https://reactnative.dev/favicon.ico'
          },
          {
            title: 'uni-app',
            desc: 'DCloud跨平台应用开发框架',
            link: 'https://uniapp.dcloud.net.cn/',
            icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni.png'
          },
          {
            title: 'Taro',
            desc: '京东多端统一开发解决方案',
            link: 'https://taro.zone/',
            icon: 'https://taro.zone/favicon.ico'
          },
          {
            title: 'Electron',
            desc: '使用Web技术构建桌面应用',
            link: 'https://www.electronjs.org/',
            icon: 'https://www.electronjs.org/favicon.ico'
          },
          {
            title: 'Tauri',
            desc: '使用Web技术构建安全桌面应用',
            link: 'https://tauri.app/',
            icon: 'https://tauri.app/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'AI工具',
    items: [
      {
        types: 'AI对话助手',
        TextColor: '#10A37F',
        dates: [
          {
            title: 'ChatGPT',
            desc: 'OpenAI开发的AI对话助手',
            link: 'https://chat.openai.com/',
            icon: 'https://chat.openai.com/favicon.ico',
            badge: { type: 'warning', text: '热门' }
          },
          {
            title: 'Claude',
            desc: 'Anthropic开发的AI助手，擅长长文本处理',
            link: 'https://claude.ai/',
            icon: 'https://claude.ai/favicon.ico'
          },
          {
            title: 'Gemini',
            desc: 'Google开发的AI对话助手',
            link: 'https://gemini.google.com/',
            icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'
          },
          {
            title: 'DeepSeek',
            desc: '深度求索开发的AI助手，国产大模型',
            link: 'https://chat.deepseek.com/',
            icon: 'https://chat.deepseek.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: 'Kimi',
            desc: '月之暗面开发的AI助手，支持超长上下文',
            link: 'https://kimi.moonshot.cn/',
            icon: 'https://kimi.moonshot.cn/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '文心一言',
            desc: '百度开发的AI对话助手',
            link: 'https://yiyan.baidu.com/',
            icon: 'https://yiyan.baidu.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '通义千问',
            desc: '阿里巴巴开发的AI助手',
            link: 'https://tongyi.aliyun.com/',
            icon: 'https://tongyi.aliyun.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '豆包',
            desc: '字节跳动开发的AI助手',
            link: 'https://www.doubao.com/',
            icon: 'https://www.doubao.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '智谱清言',
            desc: '智谱AI开发的GLM大模型助手',
            link: 'https://chatglm.cn/',
            icon: 'https://chatglm.cn/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: 'Perplexity',
            desc: 'AI搜索引擎，提供带引用来源的答案',
            link: 'https://www.perplexity.ai/',
            icon: 'https://www.perplexity.ai/favicon.ico'
          }
        ]
      },
      {
        types: 'AI写作与润色',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'Grammarly',
            desc: 'AI驱动的英文写作润色工具',
            link: 'https://www.grammarly.com/',
            icon: 'https://www.grammarly.com/favicon.ico'
          },
          {
            title: 'QuillBot',
            desc: 'AI改写和润色工具，支持多种模式',
            link: 'https://quillbot.com/',
            icon: 'https://quillbot.com/favicon.ico'
          },
          {
            title: 'DeepL Write',
            desc: 'DeepL推出的AI写作助手',
            link: 'https://www.deepl.com/write',
            icon: 'https://www.deepl.com/favicon.ico'
          },
          {
            title: 'Notion AI',
            desc: 'Notion内置的AI写作助手',
            link: 'https://www.notion.so/product/ai',
            icon: 'https://www.notion.so/images/favicon.ico'
          },
          {
            title: '秘塔写作猫',
            desc: '中文AI写作辅助工具',
            link: 'https://xiezuocat.com/',
            icon: 'https://xiezuocat.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          }
        ]
      },
      {
        types: 'AI编程助手',
        TextColor: '#722ED1',
        dates: [
          {
            title: 'GitHub Copilot',
            desc: 'GitHub推出的AI编程助手',
            link: 'https://github.com/features/copilot',
            icon: 'https://github.com/favicon.ico'
          },
          {
            title: 'Cursor',
            desc: '基于AI的代码编辑器，内置GPT-4',
            link: 'https://www.cursor.com/',
            icon: 'https://www.cursor.com/favicon.ico'
          },
          {
            title: 'Trae',
            desc: '字节跳动AI编程IDE，免费使用Claude模型',
            link: 'https://www.trae.ai/',
            icon: 'https://www.trae.ai/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: 'Windsurf',
            desc: 'Codeium推出的AI代码编辑器',
            link: 'https://codeium.com/windsurf',
            icon: 'https://codeium.com/favicon.ico'
          },
          {
            title: 'Codeium',
            desc: '免费的AI编程助手',
            link: 'https://codeium.com/',
            icon: 'https://codeium.com/favicon.ico'
          },
          {
            title: 'Tabnine',
            desc: 'AI代码补全工具',
            link: 'https://www.tabnine.com/',
            icon: 'https://www.tabnine.com/favicon.ico'
          },
          {
            title: 'CodeGeeX',
            desc: '智谱AI开发的编程助手',
            link: 'https://codegeex.cn/',
            icon: 'https://codegeex.cn/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '通义灵码',
            desc: '阿里巴巴推出的AI编程助手',
            link: 'https://tongyi.aliyun.com/lingma',
            icon: 'https://tongyi.aliyun.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          }
        ]
      },
      {
        types: 'AI图像生成',
        TextColor: '#FA8C16',
        dates: [
          {
            title: 'Midjourney',
            desc: '顶级AI图像生成工具',
            link: 'https://www.midjourney.com/',
            icon: 'https://www.midjourney.com/favicon.ico'
          },
          {
            title: 'DALL·E 3',
            desc: 'OpenAI的AI图像生成工具',
            link: 'https://openai.com/dall-e-3',
            icon: 'https://openai.com/favicon.ico'
          },
          {
            title: 'Stable Diffusion',
            desc: '开源AI图像生成模型',
            link: 'https://stability.ai/',
            icon: 'https://stability.ai/favicon.ico'
          },
          {
            title: 'Leonardo.ai',
            desc: '游戏资产和创意图像生成',
            link: 'https://leonardo.ai/',
            icon: 'https://leonardo.ai/favicon.ico'
          },
          {
            title: '文心一格',
            desc: '百度AI艺术和创意辅助平台',
            link: 'https://yige.baidu.com/',
            icon: 'https://yige.baidu.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '通义万相',
            desc: '阿里巴巴AI图像生成工具',
            link: 'https://tongyi.aliyun.com/wanxiang',
            icon: 'https://tongyi.aliyun.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '即梦',
            desc: '字节跳动AI创作平台',
            link: 'https://jimeng.jianying.com/',
            icon: 'https://jimeng.jianying.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          }
        ]
      },
      {
        types: 'AI视频生成',
        TextColor: '#EB2F96',
        dates: [
          {
            title: 'Sora',
            desc: 'OpenAI的AI视频生成模型',
            link: 'https://openai.com/sora',
            icon: 'https://openai.com/favicon.ico'
          },
          {
            title: 'Runway',
            desc: 'AI视频编辑和生成平台',
            link: 'https://runwayml.com/',
            icon: 'https://runwayml.com/favicon.ico'
          },
          {
            title: 'Pika',
            desc: 'AI视频生成工具',
            link: 'https://pika.art/',
            icon: 'https://pika.art/favicon.ico'
          },
          {
            title: 'HeyGen',
            desc: 'AI数字人视频生成平台',
            link: 'https://www.heygen.com/',
            icon: 'https://www.heygen.com/favicon.ico'
          },
          {
            title: '可灵',
            desc: '快手AI视频生成工具',
            link: 'https://klingai.kuaishou.com/',
            icon: 'https://klingai.kuaishou.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '即梦视频',
            desc: '字节跳动AI视频生成平台',
            link: 'https://jimeng.jianying.com/',
            icon: 'https://jimeng.jianying.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          }
        ]
      },
      {
        types: 'AI办公效率',
        TextColor: '#52C41A',
        dates: [
          {
            title: 'Notion',
            desc: '集成AI的笔记和协作工具',
            link: 'https://www.notion.so/',
            icon: 'https://www.notion.so/images/favicon.ico'
          },
          {
            title: 'Gamma',
            desc: 'AI驱动的演示文稿生成工具',
            link: 'https://gamma.app/',
            icon: 'https://gamma.app/favicon.ico'
          },
          {
            title: 'Tome',
            desc: 'AI演示文稿生成平台',
            link: 'https://tome.app/',
            icon: 'https://tome.app/favicon.ico'
          },
          {
            title: '讯飞听见',
            desc: '科大讯飞语音转文字工具',
            link: 'https://www.iflyrec.com/',
            icon: 'https://www.iflyrec.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          },
          {
            title: '通义听悟',
            desc: '阿里AI会议记录和转写工具',
            link: 'https://tingwu.aliyun.com/',
            icon: 'https://tingwu.aliyun.com/favicon.ico',
            badge: { type: 'tip', text: '国产' }
          }
        ]
      }
    ]
  },
  {
    title: '学习资源',
    items: [
      {
        types: '技术社区',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'GitHub',
            desc: '全球最大的代码托管平台',
            link: 'https://github.com/',
            icon: 'https://github.com/favicon.ico'
          },
          {
            title: 'Stack Overflow',
            desc: '程序员问答社区',
            link: 'https://stackoverflow.com/',
            icon: 'https://stackoverflow.com/favicon.ico'
          },
          {
            title: '掘金',
            desc: '中文技术社区',
            link: 'https://juejin.cn/',
            icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png'
          },
          {
            title: 'CSDN',
            desc: '中文IT技术社区',
            link: 'https://www.csdn.net/',
            icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico'
          },
          {
            title: '知乎',
            desc: '中文问答社区，技术话题丰富',
            link: 'https://www.zhihu.com/',
            icon: 'https://www.zhihu.com/favicon.ico'
          },
          {
            title: 'SegmentFault',
            desc: '中文开发者社区',
            link: 'https://segmentfault.com/',
            icon: 'https://segmentfault.com/favicon.ico'
          }
        ]
      },
      {
        types: '文档教程',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'MDN Web Docs',
            desc: 'Web开发权威文档',
            link: 'https://developer.mozilla.org/zh-CN/',
            icon: 'https://developer.mozilla.org/favicon-48x48.png'
          },
          {
            title: '菜鸟教程',
            desc: '编程基础教程网站',
            link: 'https://www.runoob.com/',
            icon: 'https://www.runoob.com/favicon.ico'
          },
          {
            title: 'W3Cschool',
            desc: '编程学习平台',
            link: 'https://www.w3cschool.cn/',
            icon: 'https://www.w3cschool.cn/statics/images/favicon.ico'
          },
          {
            title: 'freeCodeCamp',
            desc: '免费编程课程平台',
            link: 'https://www.freecodecamp.org/',
            icon: 'https://www.freecodecamp.org/favicon.ico'
          }
        ]
      },
      {
        types: '在线工具',
        TextColor: '#722ED1',
        dates: [
          {
            title: 'Can I Use',
            desc: '浏览器兼容性查询',
            link: 'https://caniuse.com/',
            icon: 'https://caniuse.com/img/favicon-128.png'
          },
          {
            title: 'RegExr',
            desc: '正则表达式测试工具',
            link: 'https://regexr.com/',
            icon: 'https://regexr.com/assets/favicon.ico'
          },
          {
            title: 'CodePen',
            desc: '在线代码编辑器',
            link: 'https://codepen.io/',
            icon: 'https://cpwebassets.codepen.io/assets/favicon/favicon-touch-de50acbf5d634ec6791894eba4ba9cf490f709b3d742599c6fc461424e0d1d1c.png'
          },
          {
            title: 'JSFiddle',
            desc: '在线JavaScript代码编辑器',
            link: 'https://jsfiddle.net/',
            icon: 'https://jsfiddle.net/favicon.ico'
          },
          {
            title: 'StackBlitz',
            desc: '在线IDE，支持多种框架',
            link: 'https://stackblitz.com/',
            icon: 'https://stackblitz.com/favicon.ico'
          }
        ]
      }
    ]
  }
]
