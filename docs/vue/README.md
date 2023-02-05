---
title: インストール方法
date: '2023/02/04 19:00:00'
categories:
 - vue
---

Vue.jsのインストール
-------------------

1. CDN  
https://v3.ja.vuejs.org/guide/installation.html#vue-devtools  
https://unpkg.com/browse/vue@next/dist/
~~~
#フォーマット
<script src="https://unpkg.com/vue@next"></script>
# 開発モード
<script src="https://unpkg.com/vue@3.2.36/dist/vue.global.js"></script>
# 本番モード
<script src="https://unpkg.com/vue@3.2.36/dist/vue.global.prod.js"></script>
~~~

2. 自分でホストする
3. npm

Vue.js devtoolsのインストール
----------------------------

https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=ja

Vue.js devtoolsの設定で<ins>**ファイルの URL へのアクセスを許可する**</ins>を有効にします。

Vue3について
-------------------

### インスタンスの生成方法

Vue2までは`new Vue({...})`とインスタンスを作成していました。Vue3では、これが`Vue.createApp({...})`というメソッドに変更しました。

また、Vue2ではマウントはオプションオブジェクトの`el`プロパティでマウント位置を指定するか、`$mount`メソッドを使用してマウントしていましたが、Vue3では`mount`メソッドに変更されています。

```javaScript
// Vue2
new Vue({
    el: '#app',
})
// or
new Vue({
}).$mount('#app')

// Vue3
Vue.createApp({
}).mount('#app')
```

### dataプロパティ

インスタンスを作成する際に、指定するオプションオブジェクトに`data`プロパティを付与することができます。Vue2ではそのプロパティの値にオブジェクトまたはオブジェクトを返す関数を指定できましたが、Vue3ではオブジェクトを返す関数のみ指定することができます。

~~~javaScript
// Vue2
new Vue({
    data: {
        message: 'this is Vue2'
    }
})

// Vue3
Vue.createApp({
    data: function() {
        return {
            message: 'this is Vue3'
        }
    }
}).mount('#app')
~~~

### Vue2からの変更点

https://v3.ja.vuejs.org/guide/migration/introduction.html





