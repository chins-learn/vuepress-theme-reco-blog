module.exports = {
  plugins: [
    // ["vuepress-plugin-nuggets-style-copy", {
    //   copyText: "copy",
    //   tip: {
    //     content: "success!"
    //   }
    // }],
    ['vuepress-plugin-code-copy', true],
    ['@vuepress/medium-zoom', {
        selector: ".page img",
        options: {
            margin: 16,
            background: "#616161",
            scrollOffset: 0
        }
    }],
    [ '@vuepress/last-updated',{
        transformer: (timestamp, lang) => {
            const moment = require('moment')
            moment.locale(lang)
            return moment(timestamp).fromNow()
        }
    }],
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang', {
      theme: ['blackCat', 'whiteCat', /*'haru1', 'haru2', */'haruto', 'koharu', /*'izumi', 'shizuku',*/ 'wanko'/*, 'miku', 'z16'*/], // wanko
      clean: true
    }],
    // ['permalink-pinyin'],

  ],


  "title": "ノートの復讐",
  "description": "learn",
  "dest": "public",
  locales: {
    "/": {
      lang: "ja-JP",
    },
  },
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/logo.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/gh/fudalijunyi/cdn/lovelijunyi/js/fish.js" }],
  ],
  "theme": "reco",
  "themeConfig": {
    locales: {
      '/': {
        recoloLocales: {
          article: 'ノート',
          tag: 'タグ',
          category: 'カテゴリー'
        },
      },
    },

    "nav": [
      {
        "text": "Home",
        "link": "/",
        // "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        // "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-book",
        "items": [
          // {
          //   "text": "vuepress-reco",
          //   "link": "/docs/theme-reco/"
          // },
          { "text": "フロントエンド技術入門", "link": "/docs/trend/" },
          { "text": "Vueの基本", "link": "/docs/vue/" },
        ]
      },
      {
        "text": "Contact",
        "items": [
          { text: "掲示板", link: '/docs/message-board' },
          { text: "GitHub", link: "https://github.com/chins-learn", icon: "reco-github", },
        ]
      }
      // {
      //   "text": "Forum",
      //   "link": '/docs/message-board',
      //   // "icon": "reco-message"
      // },
      // {
      //   "text": "Contact",
      //   "link": "https://github.com/chins-learn",
      //   "icon": "reco-github"
      // }
    ],

    // "sidebar": {
    //   "/docs/theme-reco/": [
    //     "",
    //     "theme",
    //     "plugin",
    //     "api"
    //   ],

    //   "/docs/trend/": [
    //     "",
    //     "SPA",
    //     "highspeed",
    //     "basic",
    //     "browser",
    //     "framework",
    //     "webapi"
    //   ],
    // },
    sidebar: require('./sidebarConf'),

    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      },
      socialLinks: [
        { icon: "reco-github", link: "https://github.com/chins-learn" },
      ],
    },

    // keyPage: {
    //   keys: ['aab08c302f11143b6cf49197468d9eb9'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    absoluteEncryption: true,
    subSidebar: 'auto',
    // "friendLink": [
    //   {
    //     "title": "午后南杂",
    //     "desc": "Enjoy when you can, and endure when you must.",
    //     "email": "1156743527@qq.com",
    //     "link": "https://www.recoluan.com"
    //   },
    //   {
    //     "title": "vuepress-theme-reco",
    //     "desc": "A simple and beautiful vuepress Blog & Doc theme.",
    //     "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //     "link": "https://vuepress-theme-reco.recoluan.com"
    //   }
    // ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "Shinrei Chin",
    "authorAvatar": "/avatar.png",
    "record": "ノートの復讐",
    "startYear": "2023",
    noFoundPageByTencent: false,
    valineConfig: {
      appId: 'OW9aJJRidcmN0ygFah91k6rX-MdYXbMMI',
      appKey: 'Mg0p8EQjjzlTmI89uBt1jRW0',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
      verify: true,
      notify: true,
      // recordIP: true,
      showComment: false,
      lang: 'ja',
      visitor: true,
    },
  },
  "markdown": {
    "lineNumbers": true
  }
}
