import { NavData } from "../../.vitepress/theme/utils/navigationType"

export const NAV_DATA: NavData[] = [
  {
    title: 'IDEs & Editors',
    items: [
      {
        types: 'JetBrains Suite',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'IntelliJ IDEA',
            desc: 'The leading IDE for Java and Kotlin development',
            link: 'https://www.jetbrains.com/idea/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M11.2 603.2l248 195.2L488 512 134.4 374.4 11.2 603.2z" fill="#FC801D"/><path d="M544 208l168 433.6 312-368L705.6 16 544 208z" fill="#535ADD"/><path d="M1024 273.6l-19.2 592L611.2 1024l-236.8-153.6L720 512l304-238.4z" fill="#2B50AA"/><path d="M785.6 400l-552 83.2L0 404.8 148.8 0l320 38.4L785.6 400z" fill="#9A37C5"/><path d="M192 832h640V192H192v640z"/><path d="M256 752h240v-40H256v40zm161.44-244.16l38.56-43.04a68.96 68.96 0 0 0 51.04 28c23.04 0 41.76-14.08 41.76-46.24V272H608v177.28a101.92 101.92 0 0 1-26.56 74.56 100 100 0 0 1-72.64 25.76 114.24 114.24 0 0 1-91.36-41.76M384 321.12V272h-128v49.12h35.84v172H256V544h128v-50.88h-35.84V321.12H384z" fill="#FFFFFF"/></svg>'},
            badge: { type: 'warning', text: 'Popular' }
          },
          {
            title: 'WebStorm',
            desc: 'Powerful JavaScript IDE',
            link: 'https://www.jetbrains.com/webstorm/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M0 107.2l137.6 817.6L704 1024 878.4 137.6 568 17.6l-150.4 80L256 1.6 0 107.2z" fill="#07C3F2"/><path d="M878.4 137.6L704 1024 137.6 924.8 878.4 137.6z" fill="#C793F3"/><path d="M192 832h640V192H192v640z"/><path d="M566.88 504.48l35.2-42.24a123.84 123.84 0 0 0 80.96 32.8c24.32 0 39.04-9.6 39.04-25.44v-0.8c0-15.04-9.28-22.88-54.56-34.4-54.56-13.92-89.92-29.12-89.92-82.88 0-49.12 39.52-81.76 94.88-81.76a158.08 158.08 0 0 1 100.8 34.24l-31.04 44.96A128 128 0 0 0 672 321.6c-22.88 0-34.88 10.4-34.88 23.68v0.8c0 17.76 11.52 23.68 58.4 35.52 55.04 14.4 85.92 34.08 85.92 81.44 0 53.92-40.96 84-99.52 84a172.48 172.48 0 0 1-114.88-43.2M516.32 272l-39.52 154.88L431.52 272h-44.96l-45.28 154.88L301.92 272H240l75.84 272h49.76l43.52-153.6 42.88 153.6h50.4l75.68-272h-61.76zM256 752h240v-40H256V752z" fill="#FFFFFF"/></svg>'}
          },
          {
            title: 'PyCharm',
            desc: 'Professional Python IDE',
            link: 'https://www.jetbrains.com/pycharm/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M572.8 579.2h156.8l179.2 49.6 108.8-219.2-299.2-248-145.6 417.6z" fill="#07C3F2"/><path d="M438.4 0l-376 156.8L0 819.2l206.4-22.4 147.2-62.4 4.8-105.6L416 323.2 668.8 152z" fill="#21D789"/><path d="M192 832h640V192H192z"/><path d="M256 752h240v-40H256v40zm103.68-342.85A41.15 41.15 0 0 0 405.44 368c0-26.88-17.92-41.15-46.85-41.15h-44.8v83.07l45.89-.83zM256 272h107.39C426.11 272 464 310.4 464 366.08v.83c0 62.85-47.17 96-106.24 96h-44.03V544H256V272zm227.07 136.96A134.72 134.72 0 0 1 621.44 271.81c39.04-1.92 77.12 12.99 104.45 40.96l-37.12 42.88a97.92 97.92 0 0 0-67.84-29.89A78.59 78.59 0 0 0 544 407.49a78.53 78.53 0 0 0 76.8 83.39 96 96 0 0 0 69.76-31.04l37.12 37.63a135.87 135.87 0 0 1-108.8 48 134.08 134.08 0 0 1-136-136.51" fill="#FFFFFF"/></svg>'}
          },
          {
            title: 'GoLand',
            desc: 'Dedicated IDE for Go language',
            link: 'https://www.jetbrains.com/go/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v1024h1024V0zm288.6 128a232.45 232.45 0 0 1 166.06 57.86L396.12 256.51A155.82 155.82 0 0 0 285.7 213.33c-68.27 0-121.34 59.73-121.34 131.41v1.2c0 77.31 53.08 133.97 128 133.97a147.97 147.97 0 0 0 87.38-25.43V393.73H286.21v-80.21H469.33v183.3a274.26 274.26 0 0 1-180.39 67.07c-131.24 0-221.7-92.33-221.7-217.26v-1.2A216.75 216.75 0 0 1 288.6 128zm445.1 0c130.22 0 223.74 97.11 223.74 217.09v1.2a218.28 218.28 0 0 1-224.94 218.45c-130.39-.85-223.91-97.96-223.91-218.11v-1.2A218.28 218.28 0 0 1 733.7 128zm-1.2 85.33A126.29 126.29 0 0 0 605.87 344.23v1.2a128.34 128.34 0 0 0 128 132.78 126.29 126.29 0 0 0 126.46-131.58v-1.2A128.17 128.17 0 0 0 732.5 213.33zM96.09 832h384v64H96.09z" fill="#00ADD8"/></svg>'}
          },
          {
            title: 'CLion',
            desc: 'Cross-platform IDE for C/C++',
            link: 'https://www.jetbrains.com/clion/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v1024h1024V0H0zm832 832H192V192h640v640z" fill="#21D789"/><path d="M256 752h240v-40H256v40zm79.36-411.2V272h-70.4v68.8h70.4zm0 88v200h-70.4v-200h70.4zm186.24-88c-54.4 0-93.6 38.4-93.6 94.4 0 56 39.2 93.6 96 93.6 30.4 0 55.2-10.4 73.6-29.6l-28-40c-12.8 12-26.4 17.6-42.4 17.6-22.4 0-38.4-12-43.2-32h118.4c.8-4.8 1.6-12 1.6-20 0-53.6-33.6-84-82.4-84zm-40.8 72c2.4-20 16-32 38.4-32 20 0 32.8 11.2 35.2 32h-73.6z" fill="#FFFFFF"/></svg>'}
          },
          {
            title: 'Rider',
            desc: '.NET and Unity game development IDE',
            link: 'https://www.jetbrains.com/rider/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'DataGrip',
            desc: 'Database IDE supporting multiple databases',
            link: 'https://www.jetbrains.com/datagrip/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'PhpStorm',
            desc: 'Dedicated IDE for PHP development',
            link: 'https://www.jetbrains.com/phpstorm/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'RubyMine',
            desc: 'Ruby and Rails development IDE',
            link: 'https://www.jetbrains.com/rubymine/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'RustRover',
            desc: 'Dedicated IDE for Rust language',
            link: 'https://www.jetbrains.com/rust/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          },
          {
            title: 'Fleet',
            desc: 'Lightweight code editor by JetBrains',
            link: 'https://www.jetbrains.com/fleet/',
            icon: 'https://www.jetbrains.com/favicon.ico'
          }
        ]
      },
      {
        types: 'VS Code & Derivatives',
        TextColor: '#007ACC',
        dates: [
          {
            title: 'VS Code',
            desc: 'Lightweight code editor by Microsoft with rich plugin ecosystem',
            link: 'https://code.visualstudio.com/',
            icon: 'https://code.visualstudio.com/assets/favicon.ico',
            badge: { type: 'warning', text: 'Most Popular' }
          },
          {
            title: 'Cursor',
            desc: 'AI-powered code editor with built-in GPT-4',
            link: 'https://www.cursor.com/',
            icon: 'https://www.cursor.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-dark.c2eae9ea.png&w=768&q=100',
            badge: { type: 'important', text: 'AI Powered' }
          },
          {
            title: 'Trae',
            desc: 'ByteDance AI programming IDE with free Claude models',
            link: 'https://www.trae.ai/',
            icon: 'https://www.trae.ai/favicon.ico'
          },
          {
            title: 'Windsurf',
            desc: 'Codeium AI code editor with multi-model support',
            link: 'https://codeium.com/windsurf',
            icon: 'https://codeium.com/favicon.ico'
          },
          {
            title: 'VSCodium',
            desc: 'Open source version of VS Code without Microsoft telemetry',
            link: 'https://vscodium.com/',
            icon: 'https://vscodium.com/img/codium_cnl.svg'
          }
        ]
      },
      {
        types: 'Classic Editors',
        TextColor: '#0e932e',
        dates: [
          {
            title: 'Sublime Text',
            desc: 'Lightweight, fast text editor with extremely quick startup',
            link: 'https://www.sublimetext.com/',
            icon: 'https://www.sublimetext.com/favicon.ico'
          },
          {
            title: 'Vim',
            desc: 'Powerful command-line text editor with efficient keyboard operations',
            link: 'https://www.vim.org/',
            icon: {svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1024 511.4h-1.15L838.61 327.17l183.6-188.33V62.34l-27.69-27.65h-349.78l-28.16 25.81v44.59L512.64 1.15V0L512 .6l-.6-.6v1.15l-55.04 55.08-22.95-23H86.83l-27.22 29.53v80.43l26.28 26.28h30.72v226.56L1.15 511.45H0l.6.55-.6.55h1.15l115.46 115.46v275.93l38.7 22.31h99.07l79.23-81.24 177.75 177.75V1024l.64-.6.6.6v-1.2l107.09-107.05h20.7a11.18 11.18 0 0 0 10.67-7.64l6.23-18.18a11.18 11.18 0 0 0-1.58-10.2l62.38-62.38-26.11 83.71a11.31 11.31 0 0 0 10.88 14.68h77.82a11.35 11.35 0 0 0 10.37-6.95l7.04-16.81a11.52 11.52 0 0 0-10.54-15.57h-3.2l35.84-112.81h52.57l-43.35 137.43a11.35 11.35 0 0 0 10.88 14.68h85.42a11.35 11.35 0 0 0 10.58-7.25l7-18.26a11.35 11.35 0 0 0-10.62-15.28h-6.19l48.26-156.71a11.22 11.22 0 0 0-1.66-10.24l-16-21.5a11.39 11.39 0 0 0-8.92-4.35h-61.27a11.35 11.35 0 0 0-8.11 3.46l-17.07 18.73h-26.62l-1.79-1.96 189.65-189.65H1024l-.6.55.6-.55zM238.51 888.7H165.42l-11.18-6.4V131.88H101.5l-4.27-4.27V77.44l6.1-6.57h314.5l9.09 9.13v47.27l-6.06 7.38H374.83v370.69l375.76-370.69h-89l-7.47-8.02V77.01l5.16-4.74h319.57l5.63 5.67v45.65L553.77 565.33h-15.91l-1.79.05-.85.12a11.05 11.05 0 0 0-5.08 2.56l-14.63 12.59-.17.13a11.65 11.65 0 0 0-3.12 4.73l-12.63 35.42-261.08 267.78z" fill="#0e932e"/></svg>'}
          },
          {
            title: 'Neovim',
            desc: 'Modernized Vim fork with better plugin ecosystem',
            link: 'https://neovim.io/',
            icon: 'https://neovim.io/favicon.ico'
          },
          {
            title: 'Emacs',
            desc: 'Extensible text editor, known as OS disguised as editor',
            link: 'https://www.gnu.org/software/emacs/',
            icon: 'https://www.gnu.org/software/emacs/favicon.ico'
          },
          {
            title: 'Notepad++',
            desc: 'Lightweight code editor for Windows',
            link: 'https://notepad-plus-plus.org/',
            icon: 'https://notepad-plus-plus.org/favicon.ico'
          },
          {
            title: 'Zed',
            desc: 'High-performance collaborative code editor with real-time editing',
            link: 'https://zed.dev/',
            icon: 'https://zed.dev/favicon.ico'
          }
        ]
      },
      {
        types: 'Platform IDEs',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'Xcode',
            desc: 'Apple official IDE for iOS/macOS development',
            link: 'https://developer.apple.com/xcode/',
            icon: 'https://developer.apple.com/assets/elements/icons/xcode-12/xcode-12-96x96_2x.png'
          },
          {
            title: 'Android Studio',
            desc: 'Google official Android development IDE',
            link: 'https://developer.android.com/studio',
            icon: 'https://developer.android.com/static/studio/images/new-studio-logo-1.png'
          },
          {
            title: 'DevEco Studio',
            desc: 'Huawei HarmonyOS app development IDE',
            link: 'https://developer.huawei.com/consumer/en/doc/harmonyos-guides-V14/ide-tools-overview-V14',
            icon: 'https://developer.harmonyos.com/assets/image/favicon.ico'
          },
          {
            title: 'HBuilderX',
            desc: 'Lightweight frontend IDE by DCloud',
            link: 'https://www.dcloud.io/hbuilderx.html',
            icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/hx.png'
          }
        ]
      }
    ]
  },
  {
    title: 'Programming Languages',
    items: [
      {
        types: 'Mainstream',
        TextColor: '#F7DF1E',
        dates: [
          {
            title: 'JavaScript',
            desc: 'Core language for Web development, full-stack capable',
            link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            icon: 'https://developer.mozilla.org/favicon-48x48.png'
          },
          {
            title: 'TypeScript',
            desc: 'JavaScript superset with static type system',
            link: 'https://www.typescriptlang.org/',
            icon: 'https://www.typescriptlang.org/favicon-32x32.png',
            badge: { type: 'warning', text: 'Recommended' }
          },
          {
            title: 'Python',
            desc: 'Simple and elegant multi-purpose language, AI-first choice',
            link: 'https://www.python.org/',
            icon: 'https://www.python.org/static/favicon.ico'
          },
          {
            title: 'Java',
            desc: 'Cross-platform enterprise programming language',
            link: 'https://www.java.com/',
            icon: 'https://www.java.com/favicon.ico'
          },
          {
            title: 'Go',
            desc: 'High-performance programming language by Google',
            link: 'https://go.dev/',
            icon: 'https://go.dev/favicon.ico'
          },
          {
            title: 'Rust',
            desc: 'Safe, concurrent, practical systems programming language',
            link: 'https://www.rust-lang.org/',
            icon: 'https://www.rust-lang.org/static/images/favicon.svg'
          },
          {
            title: 'C++',
            desc: 'High-performance systems programming language',
            link: 'https://isocpp.org/',
            icon: 'https://isocpp.org/favicon.ico'
          },
          {
            title: 'C#',
            desc: 'Modern object-oriented language by Microsoft',
            link: 'https://dotnet.microsoft.com/languages/csharp',
            icon: 'https://dotnet.microsoft.com/favicon.ico'
          }
        ]
      },
      {
        types: 'Functional & Scripting',
        TextColor: '#7F52FF',
        dates: [
          {
            title: 'Kotlin',
            desc: 'Modern JVM language by JetBrains',
            link: 'https://kotlinlang.org/',
            icon: 'https://kotlinlang.org/favicon.ico'
          },
          {
            title: 'Swift',
            desc: 'Language for iOS/macOS development by Apple',
            link: 'https://swift.org/',
            icon: 'https://swift.org/favicon.ico'
          },
          {
            title: 'Ruby',
            desc: 'Simple and elegant dynamic scripting language',
            link: 'https://www.ruby-lang.org/',
            icon: 'https://www.ruby-lang.org/favicon.ico'
          },
          {
            title: 'PHP',
            desc: 'Server-side scripting language for Web development',
            link: 'https://www.php.net/',
            icon: 'https://www.php.net/favicon.ico'
          },
          {
            title: 'Lua',
            desc: 'Lightweight embedded scripting language',
            link: 'https://www.lua.org/',
            icon: 'https://www.lua.org/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'Frontend Frameworks',
    items: [
      {
        types: 'Vue Ecosystem',
        TextColor: '#42B883',
        dates: [
          {
            title: 'Vue 3',
            desc: 'Progressive JavaScript framework, easy to learn',
            link: 'https://vuejs.org/',
            icon: 'https://vuejs.org/logo.svg',
            badge: { type: 'warning', text: 'Recommended' }
          },
          {
            title: 'Vue 2',
            desc: 'Progressive JavaScript framework, classic version',
            link: 'https://v2.vuejs.org/',
            icon: 'https://v2.vuejs.org/images/logo.svg'
          },
          {
            title: 'Vue Router',
            desc: 'Official Vue.js routing manager',
            link: 'https://router.vuejs.org/',
            icon: 'https://router.vuejs.org/logo.svg'
          },
          {
            title: 'Pinia',
            desc: 'Vue official recommended state management library',
            link: 'https://pinia.vuejs.org/',
            icon: 'https://pinia.vuejs.org/logo.svg'
          },
          {
            title: 'Nuxt',
            desc: 'Vue-based SSR framework with server-side rendering',
            link: 'https://nuxt.com/',
            icon: 'https://nuxt.com/icon.png'
          },
          {
            title: 'VueUse',
            desc: 'Collection of essential Vue Composition Utilities',
            link: 'https://vueuse.org/',
            icon: 'https://vueuse.org/favicon.svg'
          },
          {
            title: 'Element Plus',
            desc: 'Vue 3 based component library',
            link: 'https://element-plus.org/en-US/',
            icon: 'https://element-plus.org/images/element-plus-logo-small.svg'
          },
          {
            title: 'Ant Design Vue',
            desc: 'Enterprise-class UI component library',
            link: 'https://www.antdv.com/',
            icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg'
          },
          {
            title: 'Vant',
            desc: 'Lightweight Mobile Vue Component Library',
            link: 'https://vant-ui.github.io/vant/',
            icon: 'https://vant-ui.github.io/vant/logo.svg'
          },
          {
            title: 'Cube UI',
            desc: 'Exquisite mobile component library based on Vue.js',
            link: 'https://didi.github.io/cube-ui/',
            icon: 'https://didi.github.io/cube-ui/favicon.ico'
          },
          {
            title: 'NutUI',
            desc: 'JD-style lightweight mobile component library',
            link: 'https://nutui.jd.com/',
            icon: 'https://nutui.jd.com/logo.png'
          },
          {
            title: 'Vuetify',
            desc: 'Material Design Vue component library',
            link: 'https://vuetifyjs.com/',
            icon: 'https://vuetifyjs.com/favicon.ico'
          }
        ]
      },
      {
        types: 'React Ecosystem',
        TextColor: '#61DAFB',
        dates: [
          {
            title: 'React',
            desc: 'JavaScript library for building user interfaces',
            link: 'https://react.dev/',
            icon: 'https://react.dev/favicon.ico'
          },
          {
            title: 'React Router',
            desc: 'Declarative routing for React',
            link: 'https://reactrouter.com/',
            icon: 'https://reactrouter.com/favicon.ico'
          },
          {
            title: 'Next.js',
            desc: 'React full-stack framework with SSR and SSG support',
            link: 'https://nextjs.org/',
            icon: 'https://nextjs.org/favicon.ico'
          },
          {
            title: 'UmiJS',
            desc: 'Pluggable enterprise-level front-end application framework',
            link: 'https://umijs.org/',
            icon: 'https://umijs.org/favicon.ico'
          },
          {
            title: 'Ant Design',
            desc: 'Enterprise-class React UI component library',
            link: 'https://ant.design/',
            icon: 'https://ant.design/favicon.ico'
          },
          {
            title: 'Ant Design Mobile',
            desc: 'React component library for building mobile web apps',
            link: 'https://mobile.ant.design/',
            icon: 'https://mobile.ant.design/favicon.ico'
          },
          {
            title: 'Zustand',
            desc: 'Lightweight state management solution',
            link: 'https://docs.pmnd.rs/zustand/',
            icon: 'https://docs.pmnd.rs/favicon.ico'
          },
          {
            title: 'Valtio',
            desc: 'Proxy-state made simple for React and Vanilla',
            link: 'https://valtio.pmnd.rs/',
            icon: 'https://valtio.pmnd.rs/favicon.ico'
          },
          {
            title: 'Jotai',
            desc: 'Primitive and flexible state management for React',
            link: 'https://jotai.org/',
            icon: 'https://jotai.org/favicon.ico'
          },
          {
            title: 'Redux',
            desc: 'State container for JavaScript applications',
            link: 'https://redux.js.org/',
            icon: 'https://redux.js.org/img/redux.svg'
          },
          {
            title: 'MobX',
            desc: 'Simple, scalable state management',
            link: 'https://mobx.js.org/',
            icon: 'https://mobx.js.org/assets/mobx.png'
          },
          {
            title: 'ahooks',
            desc: 'High-quality and reliable React Hooks library',
            link: 'https://ahooks.js.org/',
            icon: 'https://ahooks.js.org/logo.svg'
          },
          {
            title: 'MUI',
            desc: 'Material Design React component library',
            link: 'https://mui.com/',
            icon: 'https://mui.com/static/favicon.ico'
          },
          {
            title: 'Chakra UI',
            desc: 'Modular React component library',
            link: 'https://chakra-ui.com/',
            icon: 'https://chakra-ui.com/favicon.ico'
          }
        ]
      },
      {
        types: 'Other Frameworks',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'Svelte',
            desc: 'Compile-time optimized frontend framework',
            link: 'https://svelte.dev/',
            icon: 'https://svelte.dev/favicon.png'
          },
          {
            title: 'SolidJS',
            desc: 'High-performance reactive JavaScript framework',
            link: 'https://www.solidjs.com/',
            icon: 'https://www.solidjs.com/img/favicons/favicon-32x32.png'
          },
          {
            title: 'Angular',
            desc: 'Enterprise frontend framework by Google',
            link: 'https://angular.io/',
            icon: 'https://angular.io/assets/images/favicons/favicon.ico'
          },
          {
            title: 'Qwik',
            desc: 'Instantly loading web framework',
            link: 'https://qwik.dev/',
            icon: 'https://qwik.dev/favicons/favicon.svg'
          },
          {
            title: 'Alpine.js',
            desc: 'Lightweight JavaScript framework',
            link: 'https://alpinejs.dev/',
            icon: 'https://alpinejs.dev/favicon.ico'
          },
          {
            title: 'Preact',
            desc: 'Lightweight alternative to React',
            link: 'https://preactjs.com/',
            icon: 'https://preactjs.com/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'CSS & Styling',
    items: [
      {
        types: 'CSS Frameworks',
        TextColor: '#38B2AC',
        dates: [
          {
            title: 'Tailwind CSS',
            desc: 'Utility-first CSS framework',
            link: 'https://tailwindcss.com/',
            icon: 'https://tailwindcss.com/favicons/favicon.ico',
            badge: { type: 'warning', text: 'Recommended' }
          },
          {
            title: 'UnoCSS',
            desc: 'Instant atomic CSS engine',
            link: 'https://unocss.dev/',
            icon: 'https://unocss.dev/favicon.svg'
          },
          {
            title: 'Bootstrap',
            desc: 'Popular responsive frontend framework',
            link: 'https://getbootstrap.com/',
            icon: 'https://getbootstrap.com/docs/5.3/assets/img/favicons/favicon.ico'
          },
          {
            title: 'Bulma',
            desc: 'Modern CSS framework based on Flexbox',
            link: 'https://bulma.io/',
            icon: 'https://bulma.io/favicon.ico'
          }
        ]
      },
      {
        types: 'CSS Preprocessors',
        TextColor: '#CC6699',
        dates: [
          {
            title: 'Sass',
            desc: 'CSS extension language, most powerful preprocessor',
            link: 'https://sass-lang.com/',
            icon: 'https://sass-lang.com/favicon.ico'
          },
          {
            title: 'Less',
            desc: 'Backwards compatible CSS extension',
            link: 'https://lesscss.org/',
            icon: 'https://lesscss.org/public/img/less_logo.png'
          },
          {
            title: 'Stylus',
            desc: 'Expressive CSS preprocessor',
            link: 'https://stylus-lang.com/',
            icon: 'https://stylus-lang.com/favicon.ico'
          },
          {
            title: 'PostCSS',
            desc: 'Tool for transforming CSS with JavaScript',
            link: 'https://postcss.org/',
            icon: 'https://postcss.org/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'Build Tools',
    items: [
      {
        types: 'Bundlers',
        TextColor: '#646CFF',
        dates: [
          {
            title: 'Vite',
            desc: 'Next-generation frontend build tool with instant cold start',
            link: 'https://vitejs.dev/',
            icon: 'https://vitejs.dev/logo.svg',
            badge: { type: 'warning', text: 'Recommended' }
          },
          {
            title: 'Webpack',
            desc: 'Powerful static module bundler',
            link: 'https://webpack.js.org/',
            icon: 'https://webpack.js.org/favicon.a3dd58d3.ico'
          },
          {
            title: 'Rollup',
            desc: 'JavaScript module bundler',
            link: 'https://rollupjs.org/',
            icon: 'https://rollupjs.org/favicon.png'
          },
          {
            title: 'esbuild',
            desc: 'Extremely fast JavaScript bundler',
            link: 'https://esbuild.github.io/',
            icon: 'https://esbuild.github.io/favicon.svg'
          },
          {
            title: 'Turbopack',
            desc: 'Rust-based incremental bundler',
            link: 'https://turbo.build/pack',
            icon: 'https://turbo.build/images/favicon-dark.png'
          },
          {
            title: 'Parcel',
            desc: 'Zero-config web application bundler',
            link: 'https://parceljs.org/',
            icon: 'https://parceljs.org/favicon.ico'
          }
        ]
      },
      {
        types: 'Package Managers',
        TextColor: '#CB3837',
        dates: [
          {
            title: 'npm',
            desc: 'Node.js default package manager',
            link: 'https://www.npmjs.com/',
            icon: 'https://static.npmjs.com/favicons/favicon.ico'
          },
          {
            title: 'pnpm',
            desc: 'Fast, disk space efficient package manager',
            link: 'https://pnpm.io/',
            icon: 'https://pnpm.io/img/favicon.png'
          },
          {
            title: 'Yarn',
            desc: 'Fast, reliable, secure dependency management',
            link: 'https://yarnpkg.com/',
            icon: 'https://yarnpkg.com/favicon.ico'
          },
          {
            title: 'Bun',
            desc: 'Fast JavaScript runtime and package manager',
            link: 'https://bun.sh/',
            icon: 'https://bun.sh/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'UI Design & Prototyping',
    items: [
      {
        types: 'Design Tools',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'Figma',
            desc: 'Collaborative interface design tool, industry standard',
            link: 'https://www.figma.com/',
            icon: 'https://static.figma.com/app/icon/1/favicon.png',
            badge: { type: 'warning', text: 'Recommended' }
          },
          {
            title: 'Sketch',
            desc: 'Professional UI design tool for macOS',
            link: 'https://www.sketch.com/',
            icon: 'https://www.sketch.com/favicon.ico'
          },
          {
            title: 'Adobe XD',
            desc: 'Adobe UX/UI design and prototyping tool',
            link: 'https://www.adobe.com/products/xd.html',
            icon: 'https://www.adobe.com/favicon.ico'
          },
          {
            title: 'Axure RP',
            desc: 'Professional prototyping and wireframing tool',
            link: 'https://www.axure.com/',
            icon: 'https://www.axure.com/wp-content/uploads/2019/04/favicon.ico'
          }
        ]
      },
      {
        types: 'Design Collaboration',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'Lanhu',
            desc: 'Product design collaboration platform with auto specs',
            link: 'https://lanhuapp.com/',
            icon: 'https://lanhuapp.com/favicon.ico'
          },
          {
            title: 'Modao',
            desc: 'Online prototyping and collaboration tool',
            link: 'https://modao.cc/',
            icon: 'https://modao.cc/favicon.ico'
          },
          {
            title: 'MasterGo',
            desc: 'Online design collaboration tool',
            link: 'https://mastergo.com/',
            icon: 'https://mastergo.com/favicon.ico'
          },
          {
            title: 'Jishi Design',
            desc: 'Online UI design tool',
            link: 'https://js.design/',
            icon: 'https://js.design/favicon.ico'
          }
        ]
      },
      {
        types: 'Icons & Assets',
        TextColor: '#722ED1',
        dates: [
          {
            title: 'Iconfont',
            desc: 'Alibaba vector icon library',
            link: 'https://www.iconfont.cn/',
            icon: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg'
          },
          {
            title: 'Font Awesome',
            desc: 'Most popular icon library and toolkit',
            link: 'https://fontawesome.com/',
            icon: 'https://fontawesome.com/favicon.ico'
          },
          {
            title: 'Heroicons',
            desc: 'Beautiful SVG icon set',
            link: 'https://heroicons.com/',
            icon: 'https://heroicons.com/favicon.ico'
          },
          {
            title: 'Lucide',
            desc: 'Beautiful and consistent icon library',
            link: 'https://lucide.dev/',
            icon: 'https://lucide.dev/favicon.ico'
          },
          {
            title: 'Unsplash',
            desc: 'Free high-quality stock photos',
            link: 'https://unsplash.com/',
            icon: 'https://unsplash.com/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'DevTools',
    items: [
      {
        types: 'Version Control',
        TextColor: '#F05032',
        dates: [
          {
            title: 'Git',
            desc: 'Distributed version control system',
            link: 'https://git-scm.com/',
            icon: 'https://git-scm.com/favicon.ico'
          },
          {
            title: 'GitHub Desktop',
            desc: 'Official GitHub desktop client',
            link: 'https://desktop.github.com/',
            icon: 'https://desktop.github.com/favicon.ico'
          },
          {
            title: 'Sourcetree',
            desc: 'Free Git GUI client',
            link: 'https://www.sourcetreeapp.com/',
            icon: 'https://www.sourcetreeapp.com/favicon.ico'
          },
          {
            title: 'Fork',
            desc: 'Clean and beautiful Git client',
            link: 'https://git-fork.com/',
            icon: 'https://git-fork.com/favicon.ico'
          },
          {
            title: 'GitKraken',
            desc: 'Powerful Git GUI tool',
            link: 'https://www.gitkraken.com/',
            icon: 'https://www.gitkraken.com/favicon.ico'
          },
          {
            title: 'Lazygit',
            desc: 'Terminal-based Git TUI tool',
            link: 'https://github.com/jesseduffield/lazygit',
            icon: 'https://github.com/favicon.ico'
          }
        ]
      },
      {
        types: 'API Tools',
        TextColor: '#FF6C37',
        dates: [
          {
            title: 'Postman',
            desc: 'API development collaboration platform',
            link: 'https://www.postman.com/',
            icon: 'https://www.postman.com/favicon.ico'
          },
          {
            title: 'Insomnia',
            desc: 'Open source API debugging tool',
            link: 'https://insomnia.rest/',
            icon: 'https://insomnia.rest/images/favicon.ico'
          },
          {
            title: 'Hoppscotch',
            desc: 'Open source API development ecosystem',
            link: 'https://hoppscotch.io/',
            icon: 'https://hoppscotch.io/favicon.ico'
          },
          {
            title: 'Apifox',
            desc: 'API documentation, debugging, Mock platform',
            link: 'https://www.apifox.cn/',
            icon: 'https://www.apifox.cn/favicon.ico'
          },
          {
            title: 'Bruno',
            desc: 'Open source API testing tool, Git-friendly',
            link: 'https://www.usebruno.com/',
            icon: 'https://www.usebruno.com/favicon.ico'
          }
        ]
      },
      {
        types: 'Database Tools',
        TextColor: '#336791',
        dates: [
          {
            title: 'Navicat',
            desc: 'Multi-database management tool',
            link: 'https://www.navicat.com/',
            icon: 'https://www.navicat.com/favicon.ico'
          },
          {
            title: 'DBeaver',
            desc: 'Free open source database management tool',
            link: 'https://dbeaver.io/',
            icon: 'https://dbeaver.io/favicon.ico'
          },
          {
            title: 'TablePlus',
            desc: 'Modern database management tool',
            link: 'https://tableplus.com/',
            icon: 'https://tableplus.com/favicon.ico'
          },
          {
            title: 'MongoDB Compass',
            desc: 'Official MongoDB GUI tool',
            link: 'https://www.mongodb.com/products/compass',
            icon: 'https://www.mongodb.com/favicon.ico'
          },
          {
            title: 'RedisInsight',
            desc: 'Official Redis visualization tool',
            link: 'https://redis.io/insight/',
            icon: 'https://redis.io/favicon.ico'
          }
        ]
      },
      {
        types: 'Terminal & Containers',
        TextColor: '#2496ED',
        dates: [
          {
            title: 'Docker Desktop',
            desc: 'Docker desktop application',
            link: 'https://www.docker.com/products/docker-desktop/',
            icon: 'https://www.docker.com/favicon.ico'
          },
          {
            title: 'Rancher Desktop',
            desc: 'Kubernetes and container management',
            link: 'https://rancherdesktop.io/',
            icon: 'https://rancherdesktop.io/favicon.ico'
          },
          {
            title: 'Podman Desktop',
            desc: 'Open source container management tool',
            link: 'https://podman-desktop.io/',
            icon: 'https://podman-desktop.io/favicon.ico'
          },
          {
            title: 'Warp',
            desc: 'AI-powered modern terminal',
            link: 'https://www.warp.dev/',
            icon: 'https://www.warp.dev/favicon.ico'
          },
          {
            title: 'Tabby',
            desc: 'Modern cross-platform terminal',
            link: 'https://tabby.sh/',
            icon: 'https://tabby.sh/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'Mini Programs & Cross-platform',
    items: [
      {
        types: 'Mini Program Dev',
        TextColor: '#07C160',
        dates: [
          {
            title: 'WeChat DevTools',
            desc: 'WeChat Mini Program and Official Account development tool',
            link: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html',
            icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico'
          },
          {
            title: 'Alipay Mini Program IDE',
            desc: 'Alipay Mini Program development tool',
            link: 'https://opendocs.alipay.com/mini/ide',
            icon: 'https://gw.alipayobjects.com/mdn/rms_edf6e7/afts/img/A*GzMgSYlSJtIAAAAAAAAAAAAAARQnAQ'
          },
          {
            title: 'Baidu DevTools',
            desc: 'Baidu Smart Mini Program development tool',
            link: 'https://smartprogram.baidu.com/docs/develop/devtools/history/',
            icon: 'https://smartprogram.baidu.com/docs/img/favicon.ico'
          },
          {
            title: 'ByteDance DevTools',
            desc: 'Douyin/Toutiao Mini Program development tool',
            link: 'https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/developer-instrument/overview',
            icon: 'https://lf-cdn-tos.bytescm.com/obj/static/byte-developer-portal/1.1.12/favicon.ico'
          },
          {
            title: 'Kuaishou DevTools',
            desc: 'Kuaishou Mini Program development tool',
            link: 'https://developer.kuaishou.com/',
            icon: 'https://developer.kuaishou.com/favicon.ico'
          },
          {
            title: 'FinClip Studio',
            desc: 'Multi-platform Mini Program development tool',
            link: 'https://www.finclip.com/',
            icon: 'https://www.finclip.com/favicon.ico'
          }
        ]
      },
      {
        types: 'Cross-platform',
        TextColor: '#2C3E50',
        dates: [
          {
            title: 'Flutter',
            desc: 'Google UI toolkit for building cross-platform apps',
            link: 'https://flutter.dev/',
            icon: 'https://flutter.dev/favicon.ico'
          },
          {
            title: 'React Native',
            desc: 'Build native apps with React',
            link: 'https://reactnative.dev/',
            icon: 'https://reactnative.dev/favicon.ico'
          },
          {
            title: 'uni-app',
            desc: 'DCloud cross-platform app development framework',
            link: 'https://uniapp.dcloud.net.cn/',
            icon: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni.png'
          },
          {
            title: 'Taro',
            desc: 'JD multi-end unified development solution',
            link: 'https://taro.zone/',
            icon: 'https://taro.zone/favicon.ico'
          },
          {
            title: 'Electron',
            desc: 'Build desktop apps with Web technologies',
            link: 'https://www.electronjs.org/',
            icon: 'https://www.electronjs.org/favicon.ico'
          },
          {
            title: 'Tauri',
            desc: 'Build secure desktop apps with Web technologies',
            link: 'https://tauri.app/',
            icon: 'https://tauri.app/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'AI Tools',
    items: [
      {
        types: 'AI Chatbots',
        TextColor: '#10A37F',
        dates: [
          {
            title: 'ChatGPT',
            desc: 'OpenAI AI conversational assistant',
            link: 'https://chat.openai.com/',
            icon: 'https://chat.openai.com/favicon.ico',
            badge: { type: 'warning', text: 'Popular' }
          },
          {
            title: 'Claude',
            desc: 'Anthropic AI assistant, excels at long-form text',
            link: 'https://claude.ai/',
            icon: 'https://claude.ai/favicon.ico'
          },
          {
            title: 'Gemini',
            desc: 'Google AI conversational assistant',
            link: 'https://gemini.google.com/',
            icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'
          },
          {
            title: 'DeepSeek',
            desc: 'DeepSeek AI assistant, Chinese LLM',
            link: 'https://chat.deepseek.com/',
            icon: 'https://chat.deepseek.com/favicon.ico'
          },
          {
            title: 'Kimi',
            desc: 'Moonshot AI assistant with ultra-long context',
            link: 'https://kimi.moonshot.cn/',
            icon: 'https://kimi.moonshot.cn/favicon.ico'
          },
          {
            title: 'ERNIE Bot',
            desc: 'Baidu AI conversational assistant',
            link: 'https://yiyan.baidu.com/',
            icon: 'https://yiyan.baidu.com/favicon.ico'
          },
          {
            title: 'Tongyi Qianwen',
            desc: 'Alibaba AI assistant',
            link: 'https://tongyi.aliyun.com/',
            icon: 'https://tongyi.aliyun.com/favicon.ico'
          },
          {
            title: 'Doubao',
            desc: 'ByteDance AI assistant',
            link: 'https://www.doubao.com/',
            icon: 'https://www.doubao.com/favicon.ico'
          },
          {
            title: 'ChatGLM',
            desc: 'Zhipu AI GLM model assistant',
            link: 'https://chatglm.cn/',
            icon: 'https://chatglm.cn/favicon.ico'
          },
          {
            title: 'Perplexity',
            desc: 'AI search engine with cited sources',
            link: 'https://www.perplexity.ai/',
            icon: 'https://www.perplexity.ai/favicon.ico'
          }
        ]
      },
      {
        types: 'AI Writing & Editing',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'Grammarly',
            desc: 'AI-powered English writing assistant',
            link: 'https://www.grammarly.com/',
            icon: 'https://www.grammarly.com/favicon.ico'
          },
          {
            title: 'QuillBot',
            desc: 'AI paraphrasing and writing tool',
            link: 'https://quillbot.com/',
            icon: 'https://quillbot.com/favicon.ico'
          },
          {
            title: 'DeepL Write',
            desc: 'AI writing assistant by DeepL',
            link: 'https://www.deepl.com/write',
            icon: 'https://www.deepl.com/favicon.ico'
          },
          {
            title: 'Notion AI',
            desc: 'AI writing assistant built into Notion',
            link: 'https://www.notion.so/product/ai',
            icon: 'https://www.notion.so/images/favicon.ico'
          },
          {
            title: 'Xiezuocat',
            desc: 'Chinese AI writing assistant',
            link: 'https://xiezuocat.com/',
            icon: 'https://xiezuocat.com/favicon.ico'
          }
        ]
      },
      {
        types: 'AI Coding Assistants',
        TextColor: '#722ED1',
        dates: [
          {
            title: 'GitHub Copilot',
            desc: 'GitHub AI programming assistant',
            link: 'https://github.com/features/copilot',
            icon: 'https://github.com/favicon.ico'
          },
          {
            title: 'Cursor',
            desc: 'AI code editor with built-in GPT-4',
            link: 'https://www.cursor.com/',
            icon: 'https://www.cursor.com/favicon.ico'
          },
          {
            title: 'Trae',
            desc: 'ByteDance AI IDE with free Claude models',
            link: 'https://www.trae.ai/',
            icon: 'https://www.trae.ai/favicon.ico'
          },
          {
            title: 'Windsurf',
            desc: 'Codeium AI code editor',
            link: 'https://codeium.com/windsurf',
            icon: 'https://codeium.com/favicon.ico'
          },
          {
            title: 'Codeium',
            desc: 'Free AI programming assistant',
            link: 'https://codeium.com/',
            icon: 'https://codeium.com/favicon.ico'
          },
          {
            title: 'Tabnine',
            desc: 'AI code completion tool',
            link: 'https://www.tabnine.com/',
            icon: 'https://www.tabnine.com/favicon.ico'
          },
          {
            title: 'CodeGeeX',
            desc: 'Zhipu AI programming assistant',
            link: 'https://codegeex.cn/',
            icon: 'https://codegeex.cn/favicon.ico'
          },
          {
            title: 'Tongyi Lingma',
            desc: 'Alibaba AI programming assistant',
            link: 'https://tongyi.aliyun.com/lingma',
            icon: 'https://tongyi.aliyun.com/favicon.ico'
          }
        ]
      },
      {
        types: 'AI Image Generation',
        TextColor: '#FA8C16',
        dates: [
          {
            title: 'Midjourney',
            desc: 'Top-tier AI image generation tool',
            link: 'https://www.midjourney.com/',
            icon: 'https://www.midjourney.com/favicon.ico'
          },
          {
            title: 'DALL·E 3',
            desc: 'OpenAI AI image generation tool',
            link: 'https://openai.com/dall-e-3',
            icon: 'https://openai.com/favicon.ico'
          },
          {
            title: 'Stable Diffusion',
            desc: 'Open source AI image generation model',
            link: 'https://stability.ai/',
            icon: 'https://stability.ai/favicon.ico'
          },
          {
            title: 'Leonardo.ai',
            desc: 'Game assets and creative image generation',
            link: 'https://leonardo.ai/',
            icon: 'https://leonardo.ai/favicon.ico'
          },
          {
            title: 'ERNIE Yige',
            desc: 'Baidu AI art and creative platform',
            link: 'https://yige.baidu.com/',
            icon: 'https://yige.baidu.com/favicon.ico'
          },
          {
            title: 'Tongyi Wanxiang',
            desc: 'Alibaba AI image generation tool',
            link: 'https://tongyi.aliyun.com/wanxiang',
            icon: 'https://tongyi.aliyun.com/favicon.ico'
          },
          {
            title: 'Jimeng',
            desc: 'ByteDance AI creative platform',
            link: 'https://jimeng.jianying.com/',
            icon: 'https://jimeng.jianying.com/favicon.ico'
          }
        ]
      },
      {
        types: 'AI Video Generation',
        TextColor: '#EB2F96',
        dates: [
          {
            title: 'Sora',
            desc: 'OpenAI AI video generation model',
            link: 'https://openai.com/sora',
            icon: 'https://openai.com/favicon.ico'
          },
          {
            title: 'Runway',
            desc: 'AI video editing and generation platform',
            link: 'https://runwayml.com/',
            icon: 'https://runwayml.com/favicon.ico'
          },
          {
            title: 'Pika',
            desc: 'AI video generation tool',
            link: 'https://pika.art/',
            icon: 'https://pika.art/favicon.ico'
          },
          {
            title: 'HeyGen',
            desc: 'AI avatar video generation platform',
            link: 'https://www.heygen.com/',
            icon: 'https://www.heygen.com/favicon.ico'
          },
          {
            title: 'Kling',
            desc: 'Kuaishou AI video generation tool',
            link: 'https://klingai.kuaishou.com/',
            icon: 'https://klingai.kuaishou.com/favicon.ico'
          },
          {
            title: 'Jimeng Video',
            desc: 'ByteDance AI video generation platform',
            link: 'https://jimeng.jianying.com/',
            icon: 'https://jimeng.jianying.com/favicon.ico'
          }
        ]
      },
      {
        types: 'AI Productivity',
        TextColor: '#52C41A',
        dates: [
          {
            title: 'Notion',
            desc: 'AI-powered notes and collaboration tool',
            link: 'https://www.notion.so/',
            icon: 'https://www.notion.so/images/favicon.ico'
          },
          {
            title: 'Gamma',
            desc: 'AI-powered presentation generator',
            link: 'https://gamma.app/',
            icon: 'https://gamma.app/favicon.ico'
          },
          {
            title: 'Tome',
            desc: 'AI presentation generation platform',
            link: 'https://tome.app/',
            icon: 'https://tome.app/favicon.ico'
          },
          {
            title: 'iFlytek',
            desc: 'iFlytek speech-to-text tool',
            link: 'https://www.iflyrec.com/',
            icon: 'https://www.iflyrec.com/favicon.ico'
          },
          {
            title: 'Tongyi Tingwu',
            desc: 'Alibaba AI meeting transcription tool',
            link: 'https://tingwu.aliyun.com/',
            icon: 'https://tingwu.aliyun.com/favicon.ico'
          }
        ]
      }
    ]
  },
  {
    title: 'Learning Resources',
    items: [
      {
        types: 'Tech Communities',
        TextColor: '#FF6B6B',
        dates: [
          {
            title: 'GitHub',
            desc: 'World\'s largest code hosting platform',
            link: 'https://github.com/',
            icon: 'https://github.com/favicon.ico'
          },
          {
            title: 'Stack Overflow',
            desc: 'Q&A community for programmers',
            link: 'https://stackoverflow.com/',
            icon: 'https://stackoverflow.com/favicon.ico'
          },
          {
            title: 'Dev.to',
            desc: 'Developer community platform',
            link: 'https://dev.to/',
            icon: 'https://dev.to/favicon.ico'
          },
          {
            title: 'Reddit r/programming',
            desc: 'Programming discussion community',
            link: 'https://www.reddit.com/r/programming/',
            icon: 'https://www.reddit.com/favicon.ico'
          }
        ]
      },
      {
        types: 'Documentation',
        TextColor: '#1890FF',
        dates: [
          {
            title: 'MDN Web Docs',
            desc: 'Authoritative Web development documentation',
            link: 'https://developer.mozilla.org/en-US/',
            icon: 'https://developer.mozilla.org/favicon-48x48.png'
          },
          {
            title: 'W3Schools',
            desc: 'Web development tutorials',
            link: 'https://www.w3schools.com/',
            icon: 'https://www.w3schools.com/favicon.ico'
          },
          {
            title: 'freeCodeCamp',
            desc: 'Free coding curriculum platform',
            link: 'https://www.freecodecamp.org/',
            icon: 'https://www.freecodecamp.org/favicon.ico'
          }
        ]
      },
      {
        types: 'Online Tools',
        TextColor: '#722ED1',
        dates: [
          {
            title: 'Can I Use',
            desc: 'Browser compatibility checker',
            link: 'https://caniuse.com/',
            icon: 'https://caniuse.com/img/favicon-128.png'
          },
          {
            title: 'RegExr',
            desc: 'Regular expression testing tool',
            link: 'https://regexr.com/',
            icon: 'https://regexr.com/assets/favicon.ico'
          },
          {
            title: 'CodePen',
            desc: 'Online code editor',
            link: 'https://codepen.io/',
            icon: 'https://cpwebassets.codepen.io/assets/favicon/favicon-touch-de50acbf5d634ec6791894eba4ba9cf490f709b3d742599c6fc461424e0d1d1c.png'
          },
          {
            title: 'JSFiddle',
            desc: 'Online JavaScript code editor',
            link: 'https://jsfiddle.net/',
            icon: 'https://jsfiddle.net/favicon.ico'
          },
          {
            title: 'StackBlitz',
            desc: 'Online IDE supporting multiple frameworks',
            link: 'https://stackblitz.com/',
            icon: 'https://stackblitz.com/favicon.ico'
          }
        ]
      }
    ]
  }
]
