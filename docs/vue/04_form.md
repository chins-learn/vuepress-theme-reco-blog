---
title: フォームの操作
date: '2023/02/04 19:00:00'
categories:
 - vue
---

## computedでデータを表示

computedは、例えばdataで指定した2つ以上の値をつなげて表示したい場合や、ユーザーから入力された値に任意の文字列が入っているのかを判定する場合など、管理しているデータを加工したり、検証したりできる機能です。

computedプロパティは、Vueインスタンスを作成する際に引数として渡すオプションオブジェクトにキー名としてcomputedを、値としてオブジェクトを指定して登録します。computedに指定するオブジェクトは基本的にはキー名に何かの値を返す関数となります。

computed内では関数を指定しますが、関数を実行する()は不要であることに注意してください。

computedで指定した関数は、その内部で参照しているdataの値や他のcomputedのプロパティに変化があった場合に再度実行されます。関数内部で参照しているdataの値や他のcomputedのプロパティに変化がない場合は、前回実行した結果を返すように保存してある（キャッシュしている）値を返すようにしています。これにより、不必要な処理を行わないようにしています。

また、computedで指定した関数が実行されるためには、内部でdataやcomputedといったVueインスタンスがその変更を検知している値を参照している必要があります。

### ポイント
computedはデータを加工したり、データの真偽を判定したりと使われる場面は多々あります。
- computedはdataオブジェクトや他のcomputedのプロパティの値を参照し別の値を返却する用途で使用される
- computed内の関数内ではdataオブジェクトや他のcomputedのプロパティの値を参照する際、thisというVueインスタンスを指す変数を経由して参照する
- computedの計算結果はキャッシュされる
- computedはdataやcomputedといったVueインスタンスがその変更を検知している値を参照していない場合、最初の1度鹿実行されない

## methodsでメソッドを定義

methodsもcomputedプロパティと同様に、オブジェクトを指定し、そのオブジェクトはキー名に関数を指定します。

指定した関数はcomputedと同様にHTMLテンプレート内のMustache記法の中や、ほかのmethodsの関数、computedの関数の中で使用できます。

HTMLテンプレート内ではthisは不要ですが、methodsの関数、computedの関数の中ではthisが必要になる点もcomputedと同様です。しかし、関数を実行する()が必要になる点が、computedと異なるので注意しましょう。

computedのように何かの値を返すような関数をmethodsに指定した場合、computedと同様の結果を得ることができますが、computedは結果を保存しておくのに対し、methodsは毎回実行されるので結果は保存されません。そのため、methodsで指定した関数が、dataやcomputedなど、Vueインスタンスがその変更を検知している値を参照しているかどうかにかかわらず、常にその関数が実行され、実行された結果を返します。

### ポイント
- ボタンのクリックなどのイベントが発生したときに実行されるような関数を指定する
- computed同様、関数内ではthisを使用してdataやcomputedのプロパティ、またはほかのmethodsのプロパティを参照できる
- computedのように値を返す関数を指定することも可能だが、その結果はキャッシュされず毎回実行される

## v-onでイベントを購読＆実行

v-onディレクティブは`v-on:イベント名="メソッド名"`もしくは`v-on:イベント名="式"`を指定して任意の処理を実行させることが可能です。

### v-onディレクティブにメソッド名を指定する

~~~HTML
<div id="app">
    <button type="button" v-on:click="onClickCountUp">Count Up</button>
    <p>{{ categoryText }}</p>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            count: 0,
        }
    },

    methods: {
        onClickCountUp(event) {
            return this.count += 1
        },
    },
}).mount('#app')
~~~

onClickCountUpメソッドに指定している関数にeventという引数が渡されていますが、これはaddEventListenerで指定するイベントリスナの引数に渡されるイベントオブジェクトと同様のものになります。例えば、mousemoveイベントを購読し、eventという名前でイベントオブジェクトを引数に取り、event.offsetX、event.offsetYといったようにマウスの位置を参照できます。

v-onディレクティブにメソッド名を指定した場合、デフォルトでイベントオブジェクトが渡されることも覚えておきましょう。

このように、イベントを購読し、イベントが発行するとdataの値を変更する。また、computedの値も参照しているdataの値に変更があれば自動的に再計算が行われます。

### v-onディレクティブに式を指定する

~~~HTML
<div id="app">
    <button type="button" v-on:click="count += 1">Count Up</button>
    <p>{{ count }}</p>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            count: 0,
        }
    },
}).mount('#app')
~~~

式の中でイベントオブジェクトを参照する必要がある場合、`$event`という変数名で参照することができます。

methodsのプロパティ名だけを指定して、methodsの関数を実行させていましたが、()を付けた関数呼び出しもできます。
この場合、引数のeventには何も渡されていません。

~~~HTML
<button type="button" v-on:click="onClickCountUp">Count Up</button>
<!-- 下記と同じ -->
<button type="button" v-on:click="onClickCountUp($event)">Count Up</button>
~~~

### v-on:の省略記法

`v-on:`という表記は`@`に置き換えることが可能です。具体的には`v-on:click="onClickCountUp"`は`@click="onClickCountUp"`と記述できます。

#### 修飾子

v-onにも修飾子が存在します。`v-on:イベント名.修飾子名`
例えば、&lt;form>のデフォルトのsubmitイベントをキャンセルするために、@submit.preventとしてイベントを付与します。

| 修飾子名 | 挙動 |
| :---- | :---- |
| stop | event.stopPropagation()の動作 |
| prevent | event.preventDefault()の動作 |
| capture | キャプチャリングフェーズでイベントをキャッチ |
| self | event.target === event.currentTargetのときだけイベントを実行 |
| once | 1度だけしか実行されないイベント |
| passive | addEventListenerのpassiveオプションをtrueにした場合と同様 |

### ポイント

* v-on:イベント名="メソッド名 または 式"という記法で記述する
* v-on:は@で置き換えが可能
* v-onもv-model同様に修飾子があり、挙動を変更できる

リアクティブなデータ
---------------------

### 配列

Vueではdataプロパティの値を監視し、値が変更されるとcomputedの再計算やHTMLテンプレートの更新を自動で行います。
しかし、配列やオブジェクトをdataプロパティの値にしている場合、特定の配列のメソッドを使用することでVueは表示の更新をします。

Vueでは配列をdataプロパティの値にしている場合、そのプロパティの値に新たな値を代入せずとも特定の配列のメソッドを呼ぶことで表示の更新を行うことができます。
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

これらのメソッド以外、例えばfilterやconcat,sliceメソッドは配列そのものを変更するメソッドではないく、常に新しい配列を返すメソッドとなるので、これらを使用したい場合は、
dataプロパティを置き換える形で使用します。
~~~javaScript
this.items = this.items.filter(function(item) { return item.done })
~~~

#### ポイント
- 配列の特定のメソッドを使用することで、プロパティの値を再代入することなく表示などの更新を行うことができる
- 新しい配列を返すメソッドはプロパティの値を再代入して表示などの更新を行う

watchでデータの変更を監視
----------------------------

watchは、dataやcomputedのプロパティの値を監視して、変更があると任意の処理を実行させることのできる機能です。

watchもdataやcomputedと同様にオプションオブジェクトのプロパティとして指定します。値はオブジェクトになります。
監視したいdataやcomputedのプロパティ名をそのままwatchのプロパティ名にして関数を指定する形が基本です。
また、その関数の第一引数に監視したプロパティの値の変化後の値が、そして第二引数には変化前の値が渡されます。

~~~HTML
<div id="app">
    <input type="text" v-model.trim="todoTitle" />
    <p>{{ resultString }}</p>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            todoTitle: '',
            resultString: '',
        }
    },

    watch: {
        todoTitle: function(next, prev) {
            this.resultString = 'next: ' + next + ', prev: ' + prev
        }
    }
}).mount('#app')
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            todoTitle: '',
            resultString: '',
        }
    },

    computed: {
        todoTitleString() {
            return 'todoTitleは' + this.todoTitle + 'です。'
        }
    },
    watch: {
        todoTitleString: function(next, prev) {
            this.resultString = 'next: ' + next + ', prev: ' + prev
        }
    }
}).mount('#app')
~~~

### 配列内のオブジェクトのデータを監視する

これまでの記述では、watchは配列内のオブジェクトのプロパティの変更を検出することができません。

Vueにはwatchのプロパティにオブジェクトを指定し、そのオブジェクトにdeepというプロパティをtrueにすることで、
監視しているプロパティのネストの深さに関係なく変更を検知できるようになります。


~~~ HTML
<button type="button" @click="onClick">todo[1]のタイトルを変更</button>
<p>{{ todos }}</p>
~~~

~~~ javaScript
Vue.createApp({
    data: function(){
        return {
            todos: [
                { title: 'タスク1', },
                { title: 'タスク2', },
            ],
        }
    },
    watch: {
        todos: {
            handler: function(next, prev) {
                console.log('todosに変更がありました')
            },
            deep: true,
        },
    },
    methods: {
        onClick: function(event) {
            this.todos[1].title = 'たすく２'
        },
    },
    
}).mount('#app')
~~~

### ポイント
配列内のオブジェクトの変数検知にはwatchオブジェクトのプロパティに関数を指定するのではなく、
deepプロパティとhandlerプロパティを持ったオブジェクトを指定することで、配列内のオブジェクトまで変更を監視できるようになります。

<a id="v-bind"></a>
v-bindでHTML属性を変更
-------------------------

HTML要素の属性を状態に応じて変更するため使用することができます。

v-bindは`v-bind:属性名="値または式"`という形式で使用します。「値または式」にはdataやcomputedオブジェクトのプロパティ名、methodsのプロパティ名に()を付けた関数呼び出しの式を指定することができます。その際、Vueインスタンスを指すthisは不要です。

~~~HTML
<div id="app">
    <button type="button" @click="onClick">画像差し替え</button>
    <div>
    <img v-bind:src="imgSrc" alt="" />
    </div>
</div>
~~~

~~~javaScript
Vue.createApp({
data: function(){
    return {
        imgSrc: 'img/cat.jpg',
    }
},

methods: {
    onClick: function(event) {
        this.imgSrc = 'img/dog.jpg'
    },
},
}).mount('#app')
~~~

値を取らず、単に存在するような属性、例えば`displayed`属性などは、v-bindで紐付けたプロパティの値がnull、undefined、またはfalseの場合、disabled属性は付与されません。
~~~HTML
<button v-bind:disabled="isDisabled">ボタン</button>
~~~
このisDisabledプロパティがnull、undefined、またはfalseの場合、以下のような出力結果となります。
~~~HTML
<button>ボタン</button>
~~~

### class属性に使う場合

v-bindでclass属性を紐づけるとき、その値にはプロパティ名だけではなく、配列やオブジェクトを指定できます。

#### 配列を指定した場合

配列を指定する場合は`v-bind:class="[プロパティ名, 式]"`という形で使用します。このプロパティ名はdataオブジェクトやcomputedオブジェクトのプロパティ名や()を付けた関数呼び出しのmethodsオブジェクトのプロパティや文字列を指定することができます。

~~~HTML
<div id="app">
    <div v-bind:class="[className, 'selected', classNameComputed, classNameMethod()]">
    </div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            className: 'from-data-class-name',
        }
    },
    computed: {
        classNameComputed: function() {
            return 'from-computed-class-name'
        },
    },
    methods: {
        classNameMethod: function() {
            return 'from-methods-class-name'
        },
    },
}).mount('#app')
~~~

~~~HTML
<!--  出力結果 -->
<div class="from-data-class-name selected from-computed-class-name from-methods-class-name"></div>
~~~

配列をdataやcomputedなどの値として指定することも可能です。
~~~HTML
<div v-bind:class="classArr"></div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            classArr: ['class-name-1','class-name-2'],
        }
    },
}).mount('#app')
~~~

~~~HTML
<!--  出力結果 -->
<div class="class-name-1 class-name-2"></div>
~~~

#### オブジェクトを指定した場合

オブジェクトを指定した場合は`v-bind:class="{プロパティ名:値}"`という形で使用します。

値にはdataオブジェクトのプロパティ名やcomputedオブジェクトのプロパティ名、()を付けた関数呼び出しのmethodsオブジェクトのプロパティ名などを指定することができます。

この値がtruthy、つまり、false、0、-0、0n、""、null、undefined、NaNを除くすべての値であれば、そのプロパティ名がクラス名として付与されます。

~~~HTML
<div id="app">
    <div v-bind:class="{'is-active': isActive, 'is-inactive': !isActive}"></div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            isActive: true,
        }
    },
}).mount('#app')
~~~

~~~HTML
<!-- isActiveがtrueのHTML -->
<div class="is-active"></div>
<!-- isActiveがfalseのHTML -->
<div class="is-inactive"></div>
~~~

オブジェクトを指定する場合も、dataやcomputedオブジェクトのプロパティの値にオブジェクトを指定し、そのプロパティ名をv-bindで紐付けることができます。

オブジェクトの場合、dataの状態によってクラス名を動的に付与・削除することが多いため、computedのプロパティに指定するのがほとんどです。

~~~HTML
<div id="app">
    <div v-bind:class="className"></div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            isActive: true,
        }
    },
    computed: {
        className: function() {
            return {
                'is-active': this.isActive,
                'is-inactive': !this.isActive,
            }
        },
    },
}).mount('#app')
~~~

また、v-bind:classは通常のclass属性と同時に使用することが可能です。同時に使用することで通常のclass属性に加え、v-bind:classで指定したクラス属性を付与することができます。
~~~HTML
<div id="app">
    <div class="default-class" v-bind:class="className"></div>
</div>
~~~

~~~HTML
<!-- 出力されるHTML -->
<div class="default-class is-inactive"></div>
~~~

#### styleに使う場合

style属性に使用する場合はJavaScriptのオブジェクトを指定します。そのオブジェクトのプロパティ名がCSSのプロパティ名、値がそのままCSSプロパティの値となります。

この値もdataオブジェクトやcomputedオブジェクトのプロパティ名を指定することができます。

~~~HTML
<div v-bind:style="{ color: defaultColor }"></div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            defaultColor: 'blue',
        }
    },
}).mount('#app')
~~~

~~~HTML
<!-- 出力されるHTML -->
<div style="color: blue;"></div>
~~~

オブジェクトのプロパティ名は、CSSのプロパティ名をそのまま使用するケバブケース(kebab-case)、またはCSSプロパティのハイフンに続くアルファベットを大文字にし、ハイフンを除いたキャメルケース(camelCase)を使用することができます。

~~~HTML
<div id="app">
    <div v-bind:style="{ fontSize: '14px', 'background-color': defaultColor }"></div>
</div>
~~~

~~~HTML
<!-- 出力されるHTML -->
<div style="font-size: 14px; background-color: blue;"></div>
~~~

#### ポイント

v-bindでHTMLテンプレートの属性とVueのdataやcomputedなどのプロパティを紐付けて、動的にHTMLの属性値を変更で来ます。
- v-bind:属性名="値または式"でHTMLテンプレートの属性とVueのdataやcomputedなどのプロパティを紐付けることができる
- classやstyleを紐付けるときは特別な挙動になる
- v-bindには省略記法が存在し、単純に属性名の先頭に:(コロン)を付与した記法で記述できる

<a id="show_if"></a>
HTML要素を表示・非表示にする
-----------------------------

<a id="v-show"></a>
### v-showによる表示・非表示

v-showディレクティブは`v-show="値もしくは式"`という形で記述します。

値にはdataオブジェクトやcomputedオブジェクトのプロパティ名、()を付与した関数呼び出しのmethodsオブジェクトのプロパティ名を指定することができます。

v-showディレクティブはHTML要素の表示・非表示をCSSのdisplayプロパティを変更して実現しています。値もしくは式がfalse、つまり、false、0、-0、0n、""、null、undefined、NaNのいずれかの値であれば、`style="display: none;`を付与し、truthyであれば、`style="display: none;`を削除して表示・非表示を切り替えています。

~~~HTML
<div id="app">
    <div v-show="isShow"></div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            isShow: false,
        }
    },
}).mount('#app')
~~~

~~~HTML
<!-- 出力されるHTML -->
<div style="display: none;"></div>
~~~

<a id="v-if"></a>
### v-ifによる表示・非表示

`v-if="値もしくは式"`という形で記述します。v-showと異なる点は、v-showはCSSのdisplayプロパティを変更して表示・非表示を切り替えているのに対し、v-ifはHTMLそのものの出力を制御することで表示・非表示を切り替えています。

~~~HTML
<div id="app">
    <div v-if="isShow"></div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            isShow: false,
        }
    },
}).mount('#app')
~~~

~~~HTML
<!-- 出力されるHTML -->
<!--v-if-->
~~~

v-ifはHTML要素そのものの出力を制御するのでブラウザの描画負荷が高いです。ですので、v-showとv-ifの使い分けは、表示・非表示の切り替え頻度が高いものに対してはv-showを、頻度が低いものに対してはv-ifを使用することを選択するのが一般的です。

v-ifディレクティブを付与したHTML要素の直後のHTML要素に使用できるディレクティブとしてv-else-ifとv-elseディレクティブがあります。  
v-else-ifとv-elseディレクティブはv-ifディレクティブもしくはv-else-ifディレクティブを付与したHTML要素の直後のHTML要素でのみ使用することができます。  
また、v-elseディレクティブは値や式を指定することなく、v-elseのみを使用します。

~~~HTML
<div id="app">
    <div v-if="value >= 10">10以上</div>
    <div v-else-if="value >= 5">5以上</div>
    <div v-else>5未満</div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            value: 7,
        }
    },
}).mount('#app')
~~~

### ポイント

- v-showは、CSSのdisplayプロパティを変更して表示・非表示を切り替える
- v-ifは、HTMLの出力を制御して表示・非表示を切り替える
- 表示・非表示の切り替え頻度が高いものに対してはv-showを、頻度が低いものに対してはv-ifを使用する
- v-ifディレクティブの直後にはv-else-if、v-elseディレクティブを使用できる

<a id="v-for"></a>
v-forでデータ配列の内容を表示
------------------------------

### 配列で使用する

v-forディレクティブはプロパティ名や式を指定するのではなく、`v-for="要素 in 配列"`という構文を用いて使用します。
配列はdataやcomputedオブジェクトのプロパティ名、または直接配列を指定できます。

~~~HTML
<div id="app">
    <div v-for="item in items">{{ item }}</div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            items: ['item-1', 'item-2'],
        }
    },
}).mount('#app')
~~~

また、配列のindex値が必要な場合は`v-for="(要素, インデックス) in 配列"`という構文で使用することが可能です。
~~~HTML
<div id="app">
    <div v-for="(item, index) in items">{{ index }}: {{ item }}</div>
</div>
~~~

### オブジェクトで使用する

```v-for="値 in オブジェクト```

~~~HTML
<div id="app">
    <div v-for="value in object">{{ value }}</div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            object: {
                name: '山田',
                age: 40,
                gender: '女',
            },
        }
    },
}).mount('#app')
~~~

また、オブジェクトの場合、プロパティ名やインデックス値を以下のようにして参照することが可能です。  
`v-for="(値, プロパティ名, インデックス値) in オブジェクト"`

~~~HTML
<div id="app">
    <div v-for="(value, key, index) in object">{{ index }}: [{{ key }}] {{ value }}</div>
</div>
~~~

### key属性を付与する

Vueでは要素を識別するために、特別なkeyという属性を参照し一つ一つの要素を識別します。

key属性を付与することで、Vueは要素の変更前後の差分を検出し、効率の良い処理を行うことが可能となっています。
~~~HTML
<div id="app">
    <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function(){
        return {
            items: [
                { id: 1, name: 'item-1'},
                { id: 2, name: 'item-2'},
            ],
        }
    },
}).mount('#app')
~~~

効率よく繰り返しの処理をするためにも、v-forで繰り返し処理を実行させる時には、key属性は必ず付与するようにしましょう。
また、以下のようにインデックス値をkeyの値として指定することもできます。  

~~~HTML
<div v-for="(item, index) in items" :key="index"></div>
~~~

しかし、sortやfilterなどによって配列の順番が変更になると、意図した出力にならないので注意が必要です。配列の最初の要素がsortで順番が変わった場合、インデックス値0の要素は別の要素になります。その場合、keyの値は変更していないので、Vueはその要素の変更をスキップしてしまいます。

v-forで繰り返し処理をする配列またはオブジェクトでは、要素に一意となる値を指定するようにしましょう。

### ポイント
- v-forディレクティブを使用して`v-for="item in items"`という構文で、配列やオブジェクトを繰り返し処理できる
- 配列のインデックス値が必要な場合は`v-for="(item, index) in items"`で参照できる
- オブジェクトのプロパティ名、インデックス値が必要な場合は`v-for="(value, key, index) in object`で参照できる
- v-forディレクティブを使用する時は要素に一意となる値を持たせ、key属性の値を指定して効率よく処理をさせる
- key属性の値は要素に一意となる値を指定する

