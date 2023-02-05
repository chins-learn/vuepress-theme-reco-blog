---
title: テキストボックスを操作する
date: '2023/02/04 19:00:00'
categories:
 - vue
---

v-modelディレクティブ
-----------------------

Vueのディレクティブとは、HTML要素に「v-」から始まる属性名を付与し、HTML要素を拡張できるものになります。v-model以外にも、v-bindやv-on、v-ifなど、様々ディレクティブがその用途ごとに用意されています。

Vueでは、ユーザーが`<input type="text">`や`<textarea>`にどのような文字を入力しているのかを`v-model`を使用してリアルタイムに管理できます。

~~~HTML
<div id="app">
    <input type="text" v-model="message" />
    <p>{{ message }}</p>
</div>
~~~

~~~javaScript
Vue.createApp({
    data: function() {
        return {
            message: 'ToDoアプリケーション',
        }
    },
}).mount('#app')
~~~

チェックボックス処理のポイント
-----------------------

- 単体で使用する場合は、値が`true`もしくは`false`になる
- 複数で使用する場合は、選択されている`<input type="checkbox">`のvalue属性の値が配列に格納される

セレクトボックスの処理のポイント
-----------------------

- `<input type="checkbox">`と同じように、単体の選択肢を選択できる場合と複数の選択肢を選択できる場合で挙動が異なる
- 単体の場合は選択された`<option>`のvalue属性の値が指定したプロパティの値になる
- 複数の場合は選択された`<option>`のvalue属性の値が指定したプロパティの配列に格納される

修飾子を使用して動作を変更
-----------------------

### v-modelの修飾子

v-modelは、**修飾子**というものを使用して、挙動を調整できます。修飾子はv-modelに、**(ドット)修飾子名**という形で付与します。

#### .lazy修飾子

.lazy修飾子は、`v-model.lazy`というプロパティ名で使用します。  
`<input type="text">`にv-modelを付与した場合、通常`<input type="text">`のinputイベントに反応して、値を更新します。  
.lazy修飾子を使用すると、inputイベントではなく、changeイベントに反応します。

#### .number修飾子

.number修飾子は、v-model.numberというプロパティ名で使用します。この修飾子を使用すると、ユーザーから入力された値がNumber型の値になります。
`<input>`はユーザーから入力された値は常に文字列になり、意図しない挙動してしまうこともあります。

.number修飾子を使用すると入力された文字列を数値に変更して、もし数値へ変換できなかった場合は通常の文字列のまま扱うようになります。

#### .trim修飾子
.trim修飾子は、v-model.trimというプロパティ名で使用します。trim修飾子はユーザーから入力された値の両端の空白を削除する修飾子になります。
動作はJavaScriptの`String.prototype.trim()`と同様です。






