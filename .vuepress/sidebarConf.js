const getDocPath = require('./getDocPath')
module.exports = {
  '/docs/trend/': [ 
    getDocPath('フロントエンド技術入門',true,'/docs/trend/'),
  ],
  '/docs/vue/': [ 
    getDocPath('Vueの基本',true,'/docs/vue/'),
  ],
//   '/document/css/': [ 
//     getDocPath('css',true,'/document/css/'),
//   ],
}