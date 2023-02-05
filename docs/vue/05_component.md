---
title: コンポーネント
date: '2023/02/04 19:00:00'
categories:
 - vue
---

<a id="component"></a>
コンポーネント
===========================

コンポーネントとはHTMLテンプレートと機能などを一塊にした部品のようなもので、Vueのインスタンスになります。

コンポーネントはグローバルに使用できる**グローバルコンポーネント**と、Vueインスタンスやコンポーネント内のみ使用できる**ローカルコンポーネント**を定義することができます。

<a id="globalComponent"></a>
グローバルコンポーネント
--------------------------

`Vue.createApp({...}).component`を使用して定義したコンポーネントはグローバルコンポーネントとなります。

~~~JavaScript
Vue.createApp({}).component('my-title', {
    data: function() {
        return {
            title: '',
        }
    },
    template: `<input type="text" v-model=title" />`,
})
~~~

コンポーネントは名前付きの再利用できるVueのインスタンスとなります。
`Vue.createApp({...}).component`の第一引数に名前となる文字列を指定し、第二引数にはVue.createAppの引数に渡したようなオプションオブジェクトを指定することができます。

定義したコンポーネントを実際に使うには、第一引数に指定した文字列をHTML要素のように指定するだけになります。これを<u>**カスタム要素**</u>と呼びます。

~~~HTML
<div id="app">
    <my-title></my-title>
</div>
~~~

~~~javaScript
Vue.createApp({})
    .component('my-title', {
        data: function() {
            return {
                title: '',
            }
        },
        template: `<input type="text" v-model="title" /><p>{{ title }}</p>`,
    })
    .mount('#app')
~~~

また、コンポーネントが使用できるのはVue.createAppで作成されたインスタンスの内部のみです。今回の例では、`<div id="app">`内でのみ使用が可能となっています。

コンポーネントは再利用が可能なので、一度だけではなく何度でも出力することが可能です。
~~~HTML
<div id="app">
    <my-title></my-title>
    <my-title></my-title>
    <my-title></my-title>
</div>
~~~

<a id="localComponent"></a>
ローカルコンポーネント
--------------------------

グローバルコンポーネントでコンポーネントの名前が重複すると、意図しないコンポーネントが配置されてしまうなどトラブルの原因にもなります。

ローカルコンポーネントは、特定のVueインスタンスのみで使用できるコンポーネントなので、そのようなトラブルを回避できます。

~~~javaScript
Vue.createApp({
  components: {
    "my-title": {
      data: function () {
        return {
          title: "",
        };
      },
      template: `<input type="text" v-model="title" /><p>{{ title }}</p>`,
    },
  },
}).mount("#app");
~~~

Vue.createApp({...}).componentで定義した、コンポーネント名をプロパティ名として、値にオブジェクトを指定することでローカルコンポーネントの定義が可能となります。ローカルコンポーネントもグローバルコンポーネントと同様に、カスタム要素として`<my-title>`を配置するだけで使用できます。

template
-----------------
コンポーネントで使用するtemplateは、前述したサンプルコードではHTMLテンプレートを文字列として、直接指定していました。
しかし、HTMLテンプレートが複雑になってくると、この記述方法ではコードが長くなり可読性も損なわれます。
HTMLテンプレートは、HTML内に記述することもできます。`<script>`要素のtype属性値にtext/x-templateを指定してHTMLテンプレートを書き、JavaScriptでその`<script>`要素を指定します。

~~~JavaScript
Vue.createApp({
  components: {
    "my-title": {
      data: function () {
        return {
          title: "",
        }
      },
      template: '#title-template',
    },
  },
}).mount("#app")
~~~

HTML内`<script type="text/x-template" id="title-template">`というHTML要素を配置し、その内部はこれまで文字列として指定
していたHTMLテンプレートを記述します。JavaScriptからはtemplateプロパティに、`<script>`要素のid名のセレクタを指定することで、その内部に記述しているコードをHTMLテンプレートとして扱うことができます。

```JavaScript
const myTitle = {
  data: function() {
    return {
      title: '',
    }
  },
  template: '#title-template',
}

Vue.createApp({
  components: {
    'my-title': myTitle,
  },
}).mount('#app')
```
### ポイント

- コンポーネントは見た目や機能を一塊にした再利用可能なVueインスタンスオプション
- dataプロパティの値はオブジェクトを返す関数である必要がある
- グローバルコンポーネントとローカルコンポーネントを定義することができる
- グローバルコンポーネントはVue.componentで定義できる
- 使用する際はコンポーネント名をカスタム要素として配置する

<a id="props"></a>
親子コンポーネント間通信(props)
===============================

Vueでは親のインスタンスまたはコンポーネントからこのコンポーネントへpropsというプロパティを通じてデータを渡すことが可能となっています。

propsで値を受け取るには子コンポーネント側で受け取るpropsを定義する必要があります。

propsを定義するにはオプションオブジェクトにpropsプロパティを定義し、値にオプションを指定します。そのオブジェクトには親から受け取るプロパティ名にオプションとなるオブジェクトを指定します。

下記の例には、propsにnameというプロパティ名でtype、default、validator、requireというプロパティを持ったオブジェクトを指定しています。

```JavaScript
const myTitle = {
  props: {
    name: {
      type: String,
      default: '',
      validator: function(value) {
        return value.lenght > 0
      },
      required: true,
    },
  },
  template: '#title-template',
}

Vue.createApp({
  components: {
    'my-title': myTitle,
  },
}).mount('#app')
```

### type
受け取る値のデータ型を指定します。  
また、複数の型を[String, Number]のように指定することも可能です。

指定できる型は:String, Number, Boolean, Array, Object, Date, Function, Symbol

### default
propsとしてデータが渡ってこなかった場合のデフォルトの値を指定します。propsのデータ型がObjectやArrayの場合は、必ずObjectやArrayのデータの値を返す関数である必要があります。

```JavaScript
const myTitle = {
  props: {
    name: {
      type: String,
      default: function() {
        return { name: 'yamada', }
      },
      validator: function(value) {
        return value.lenght > 0
      },
      required: true,
    },
  },
  template: '#title-template',
}

Vue.createApp({
  components: {
    'my-title': myTitle,
  },
}).mount('#app')
```

### validator
渡されたpropsの値が任意の条件を満たすかどうかをtrueもしくはfalseで返す関数を指定することで、バリデーションすることができます。親コンポーネントから渡されたpropsの値が指定する関数の第一引数になります。

### required
親コンポーネントから渡されることが必須のpropsなのかどうかをtrueもしくはfalseを指定します。trueであれば、必ず親コンポーネントからpropsを渡す必要があります。

### propsの渡し方
親コンポーネントのHTMLテンプレートからv-bindで親コンポーネント値を紐付けます。v-bindで紐付けるプロパティは子コンポーネントのpropsのオブジェクトで定義したプロパティ名、値には親コンポーネントのdataやcomputedなどのプロパティ名を指定します。

```HTML
<div id="app">
  <my-title :name="authorName"></my-title>
</div>
<script type="text/x-template" id="title-template">
  <p>{{ upperCaseName }}</p>
</script>
```

```JavaScript
const myTitle = {
  props: {
    name: {
      type: String,
      default: '',
      validator: function(value) {
        return value.lenght > 0
      },
      required: true,
    },
  },
  computed: {
    upperCaseName: function() {
      return this.name.toUpperCase()
    },
  },
  template: '#title-template',
}

Vue.createApp({
  data: function() {
    return {
      authorName: 'yamada',
    }
  },
  components: {
    'my-title': myTitle,
  },
}).mount('#app')
```

子コンポーネントは受け取ったpropsを、computedやmethodsなどの関数からthis経由で参照できます。

### ポイント
- 親コンポーネントから子コンポーネントへはpropsを経由して値を渡すことが可能
- 子コンポーネントでは受け取ったporpsのデータの型、デフォルトの値、バリデータ関数、必須かどうかを定義できる
- 受け取るpropsのデータの型がArrayもしくはObjectの場合、デフォルトの値を設定するときは関数である必要がある
- 子コンポーネントで受け取ったpropsはcomputedやmethodsなどの関数から、this経由で参照できる

<a id="emit"></a>
親子コンポーネント間通信($emit)
===============================

親コンポーネントから子コンポーネントへはpropsを経由してデータを渡す場合、その値を子コンポーネントで変更することは許容されていません。なぜなら、コンポーネントが複雑になった場合、親のデータがどこで変更されたか把握するのが困難になってしまうからです。
そこでVueでは、子コンポーネントから親コンポーネントに$emitというインスタンスメソッドを使用してイベントを発火させ、親コンポーネントでデータを変更するいった方法を取っています。

親コンポーネントがイベントを監視するにはv-onディレクティブを使用し、コンポーネントがイベントを発火するときは$emitを使用します。

~~~HTML
<div id="app">
  <count-up-button @count-up="count += 1"></count-up-button>
  <div>{{ count }}</div>
</div>
<script type="text/x-template" id="btn-template">
  <button type="button" @click="$emit('count-up')">COUNT UP</button>
</script>
~~~

~~~JavaScript
const countUpButton = {
  template: '#btn-template',
}

Vue.createApp({
  data: function(){
    return {
      count: 0,
    }
  },
  components: {
    'count-up-button': countUpButton,
  },
}).mount('#app')
~~~

count-up-buttonコンポーネントのHTMLテンプレートに`<button>`要素を配置し、クリックすると$emit('count-up')を実行するようにしています。$emitの第一引数の親コンポーネントで監視しているイベントの名前を文字列で指定する必要があります。

これにより、親コンポーネントで監視しているイベントを子コンポーネントから発火させることができます。

```HTML
<div id="app">
  <count-up-button @count-up="countUp"></count-up-button>
  <div>{{ count }}</div>
</div>
<script type="text/x-template" id="btn-template">
  <button type="button" @click="onClick">COUNT UP</button>
</script>
```

```JavaScript
const countUpButton = {
  template: '#btn-template',
  methods: {
    onClick: function() {
      this.$emit('count-up')
    },
  },
}

Vue.createApp({
  data: function(){
    return {
      count: 0,
    }
  },
  components: {
    'count-up-button': countUpButton,
  },
  methods: {
    countUp: function() {
      this.count += 1
    },
  },
}).mount('#app')
```

$emitはVueのインスタンスメソッドとなるので、dataやcomputedプロパティのようにthisが必要になる点にも注意してください。

また、イベント発火の際に何か値を渡してイベント発火をさせたい場合もあるのでしょう。その際は、$emitの第二引数以降に任意の値を指定することで、親コンポーネントはその値を関数の第一引数から受け取ることができます。

```JavaScript
const countUpButton = {
  template: '#btn-template',
  methods: {
    onClick: function() {
      this.$emit('count-up', 3)
    },
  },
}

Vue.createApp({
  data: function(){
    return {
      count: 0,
    }
  },
  components: {
    'count-up-button': countUpButton,
  },
  methods: {
    countUp: function(volume) {
      this.count += volume
    },
  },
}).mount('#app')
```

また、HTMLテンプレートでは$eventという特別な変数で第一引数を受け取ることができます。
```HTML
<div id="app">
  <count-up-button @count-up="count += $event"></count-up-button>
  <div>{{ count }}</div>
</div>
<script type="text/x-template" id="btn-template">
  <button type="button" @click="onClick">COUNT UP</button>
</script>
```

```JavaScript
const countUpButton = {
  template: '#btn-template',
  methods: {
    onClick: function() {
      this.$emit('count-up', 3)
    },
  },
}

Vue.createApp({
  data: function(){
    return {
      count: 0,
    }
  },
  components: {
    'count-up-button': countUpButton,
  },
}).mount('#app')
```
親コンポーネントから渡した値を子コンポーネントで変更したい場合はv-bind、v-onディレクティブを用います。

```HTML
<div id="app">
  <count-up-button :count="count" @count-up="countUp"></count-up-button>
  <div>{{ count }}</div>
</div>
<script type="text/x-template" id="btn-template">
  <button type="button" @click="onClick">COUNT UP | {{  count }} + 1</button>
</script>
```

```JavaScript
const countUpButton = {
  template: '#btn-template',
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClick: function() {
      this.$emit('count-up', this.count + 1)
    },
  },
}

Vue.createApp( {
  data: function() {
    return { 
      count: 0,
    }
  },
  components: {
    'count-up-button': countUpButton,
  },
  methods: {
    countUp: function(nextCount) {
      this.count = nextCount
    },
  },
}).mount('#app')
```

v-modelディレクティブを使用してより簡潔に記述することができます。
```HTML
<div id="app">
  <count-up-button v-model:count="count"></count-up-button>
  <div>{{ count }}</div>
</div>
<script type="text/x-template" id="btn-template">
  <button type="button" @click="onClick">COUNT UP | {{  count }} + 1</button>
</script>
```

```JavaScript
const countUpButton = {
  template: '#btn-template',
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClick: function() {
      this.$emit('update:count', this.count + 3)
    },
  },
}

Vue.createApp( {
  data: function() {
    return { 
      count: 0,
    }
  },
  components: {
    'count-up-button': countUpButton,
  },
}).mount('#app')
```
子コンポーネントをカスタム要素として配置する際に、v-model:count="count"のようにv-modelディレクティブに:countプロパティを付与しています。こうすることで、親コンポーネントは自動的にupdate:プロパティ名というイベントを監視し、$emitで指定された値を、そのプロパティ名の値に代入しようとします。

このサンプルコードではcountプロパティを指定しているので、親コンポーネントはupdate:countイベントを監視するようになります。
さらにそのイベントが発火されると、count=$eventという処理を行います。

また、親コンポーネントから子コンポーネントに渡す値がオブジェクトの場合、そのオブジェクトのプロパティ一つ一つにV-modelディレクティブを付与して、子コンポーネントへpropsで渡すことも可能です。
```HTML
<div id="app">
  <update-author v-model:name="author.name" v-model:age="author.age"></update-author>
  <div>name: {{ author.name }}</div>
  <div>age: {{ author.age }}</div>
</div>
<script type="text/x-template" id="update-author-template">
  <div><button type="button" @click="onClickAge">Age + 1 | {{ age }} + 1</button>
  <input type="text" :value="name" @input="onInput">
</script>
```

```JavaScript
const updataAuthor = {
  template: '#update-author-template',
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClickAge: function() {
      this.$emit('update:age', this.age + 1)
    },
    onInput: function($event) {
      this.$emit('update:name', $event.target.value)
    },
  },
}

Vue.createApp( {
  data: function() {
    return { 
      author: {
        name: 'Yamada',
        age: 40,
      },
    }
  },
  components: {
    'update-author': updataAuthor,
  },
}).mount('#app')
```

### ポイント
- 親コンポーネントはカスタム要素として子コンポーネントを配置する際に監視するイベント名を指定する
- 子コンポーネントは$emitの第一引数にイベント名を指定し、イベントを発火させる
- $emitの第二引数には親コンポーネントに渡したい値を指定できる
- 親コンポーネントはmethodsの関数の第一引数、HTMLテンプレートの$eventでその値を参照できる
- v-modelディレクティブをしようすることで親コンポーネントは自動的にupdate:プロパティ名のイベントを監視する

<a id="transition"></a>
`<transition>`を用いたアニメーション
==================================

`<transition>`は、その子要素の以下の属性などの変化を検知してアニメーションさせることが可能です。

- v-if、v-showディレクティブの値の変化
- key属性の値の変化

```HTML
<transition>
  <div v-show="isShow">トランジション</div>
</transition>
```

この例では、isShowプロパティが変化するたびにアニメーションをさせることができます。
これらのディレクティブ、属性が変化し、要素が出現・表示(enter)もしくは消滅・非表示(leave)になるとその要素に対して自動でクラスを付与します。付与されるクラス名は以下の通りです。

| クラス名 | 付与されるタイミング |
| :--- | :---- |
| v-enter-from | 要素が出現・表示される前に付与され、アニメーションの開始時に削除されるクラス。出現・表示するアニメーションの初期のスタイルを適用するために使用 |
| v-enter-to | 要素が出現・表示されるアニメーションの開始時に付与され、アニメーション終了後に削除されるクラス。出現・表示するアニメーションの最終的なスタイルを適用するために使用 |
| v-enter-active | 要素が出現・表示される前からアニメーションの終了前までに付与されるクラス、transtionのスタイルを適用するために使用 |
| v-leave-from | 要素が消滅・非表示される前に付与され、アニメーションの開始時に削除されるクラス。消滅・非表示するアニメーションの初期のスタイルを適用するために使用 |
| v-leave-to | 要素が消滅・非表示されるアニメーションの開始時に付与され、アニメーション終了後に削除されるクラス。消滅・非表示するアニメーションの最終的なスタイルを適用するために使用 |
| v-leave-active | 要素が消滅・非表示される前にアニメーションの終了前までに付与されるクラス。transitionスタイルを適用するために使用 |

これらのクラス名の接頭語としてすべてv-から始まっていますが、`<transition>`にname属性を付与することでその接頭語を変更することが可能です。例えば、`<transition name="slide">`とすると、slide-enter-from、slide-enter-toなどのクラス名が付与されようになります。


### JavaScriptフック

`<transition>`ではCSSでトランジションのスタイルを定義する以外にJavaScriptでトランジションの制御をすることが可能です。

例えば他のアニメーションライブラリなどと組み合わせて使用したいときに利用します。JavaScriptでの制御の場合、トランジション中の各タイミングで実行されるイベントを指定します。そのタイミングとイベント名は以下のようになります。

| イベント名 | 実行するタイミング |
| :--- | :--- |
| before-enter | 要素が出現・表示される前に実行される |
| enter | 要素が出現・表示されてアニメーション実行前に実行される |
| after-enter | 要素が出現・表示されてアニメーション終了後に実行される |
| enter-cancelled | 要素が出現・表示のキャンセル時に実行される |
| before-leave | 要素が消滅・非表示される前に実行される |
| leave | 要素が消滅・非表示されてアニメーション実行前に実行される |
| after-leave | 要素が消滅・非表示されてアニメーション終了後に実行される |
| leave-cancelled | 要素が消滅・非表示のキャンセル時に実行される |

これらのイベントのリスナー関数はVueインスタンスのmethodsオブジェクトに定義し、`<transition>`のv-onディレクティブで紐付けします。
また、トランジションのアニメーションをJavaScriptのみで制御したい場合はCSS属性をfalseにする必要があります。これはv-bindを使用してfalseの値を渡しいます。

各イベントのリスナー関数の第一引数にはトランジションする要素が渡されます。この引数の要素のstyleプロパティなどを操作し、各タイミング出の要素の状態を定義します。また、enterとleaveイベントでは第二引数にアニメーションの完了をVueインスタンスに知らせるコールバック関数が渡されます。他のアニメーションライブラリなどを使用してる場合やトランジションをJavaScriptのみで制御する場合、アニメーション完了時にそのコールバック関数を呼び出す必要があります。

```HTML
<div id="app">
  <button @click="isShow = !isShow">Toggleボタン</button>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
    :css="false" >
    <div v-show="isShow">トランジション</div>
  </transition>
</div>
```

```JavaScript
Vue.createApp({
    data() {
        return {
            isShow: true,
        }
    },
    methods: {
        beforeEnter(el) {
            // 要素が出現・表示される前の状態をここで定義します。
        },
        enter(el, done) {
            // elに出現・表示されるアニメーションを実行します。
            // アニメーションが完了したら done コールバックを呼び出します。
        },
        afterEnter(el) {
            // 要素が出現・表示された後の状態を定義します。
        },
        enterCancelled(el) {
            // 要素が出現・表示するアニメーションをキャンセルされたときの状態を定義します。
        },
        beforeLeave(el) {
            // 要素が消滅・非表示される前の状態をここで定義します。
        },
        leave(el, done) {
            // elに消滅・非表示されるアニメーションを実行します。
            // アニメーションが完了したら done コールバックを呼び出します。
        },
        afterLeave(el) {
            // 要素が消滅・非表示するアニメーションをキャンセルされたときの状態を定義します。
        },
        leaveCancelled(el) {
            // 要素が消滅・非表示するアニメーションをキャンセルされたときの状態を定義します。
        },
    },
}).mount('#app')
```

### `<transition-group>`

v-forディレクティブのように複数の要素を描画するものに対してトランジションをさせたい場合は、`<transition-group>`という要素を使用します。`<transition>`と違う点は以下です。

- `<transition-group>`自体がデフォルトで`<span>`要素として描画される(これはtag属性を指定することで変更できる)
- クラス名は`<transition-group>`で囲まれた中の要素に対して付与される
- 中の要素にはkey属性が必須

```HTML
<div id="app">
  <button @click="filterDone = !filterDone">Toggleフィルターボタン</button>
  <transition-group tag="ul">
    <li v-for="item in filteredItems" :key="item.title">{{ item.title }}</li>
  </transition-group>
</div>
```

```JavaScript
Vue.createApp({
    data: function() {
        return {
            filterDone: false,
            items: [
                {
                    title: 'タイトル - 1',
                    done: false,
                },
                {
                    title: 'タイトル - 2',
                    done: true,
                },
                {
                    title: 'タイトル - 3',
                    done: true,
                },
                {
                    title: 'タイトル - 4',
                    done: false,
                },
            ],
        }
    },

    computed: {
        filteredItems: function() {
            if (this.filterDone) {
                return this.items.filter(function(item){
                    return item.done
                })
            }

            return this.items
        }
    },
}).mount('#app')
```

```CSS
.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 300ms ease;
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
}
```

`<transition-group>`のtag属性にulを指定し、itemsという配列のデータをリスト表示にしています。また、computedプロパティを使用し、filterDoneプロパティの値がtrueの場合はitemsデータのdoneプロパティがtrueのものだけを表示するようにしています。

Toggleフィルターボタンをクリックするたびにdoneプロパティがfalseのものがフェードします。ToDoアプリケーションもこの`<transition-group>`を利用し、タスクのフィルター時にトランジションするようにしています。

### ポイント

- トランジションのタイミングで付与されるクラス名があるので、それに応じたスタイルを定義する
- JavaScriptでのトランジションも可能なので、適宜使用する
- リストなどにトランジションのアニメーションをさせたい場合は`<transition-group>`を利用する




