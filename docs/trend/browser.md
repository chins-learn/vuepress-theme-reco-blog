---
title: 最新Webブラウザの機能
date: '2023/02/02 19:00:00'
categories:
 - vue
prev: ./basic.md
next: ./framework.md
---

## 機能拡張したブラウザAPI

1. ブラウザAPI
2. JavaScriptライブラリが提供するAPI
3. フロントエンド向けアプリケーションフレームワークが提供するAPI
4. ネットワーク経由で利用するWebAPI

ブラウザAPI
----------------

ブラウザAPIのインターフェイス一覧  
<https://developer.mozilla.org/ja/docs/Web/API#interfaces>

APIの使い方は、Webブラウザ側で生成済のオブジェクトのプロパティやメソッドを操作することがほとんどですが、コンストラクタを使って新規オブジェクトを生成することもあります。これらのオブジェクトの型定義（プロパティ、メソッドなど）を「インターフェイス」と呼びます。最新のWebブラウザでは約1000種類のインターフェイスが準備されています。

ブラウザAPI仕様一覧  
<https://developer.mozilla.org/ja/docs/Web/API#specifications>


JavaScriptライブラリ
-------------------------

npmレポジトリからソフトウェアパッケージをダウンロードして利用します。

JavaScriptとブラウザAPIだけで、ライブラリやフレームワークなしでアプリを作れます。ただし、ブラウザAPIは、低レベルのAPIが多いため、コードが複雑、大量になり開発生産性が低下しがちです。コード量を減らして開発効率を向上させるためにライブラリが必要です。

#### よく利用するライブラリ
1. UIライブラリ
2. グラフィックライブラリ
3. データストアライブラリ

#### フレームワークとライブラリの共存
フレームワークは、「仮想DOM」と呼ばれる仕組みを使って、ページ全体を抽象化して集中管理します。そのため、フレームワークを使用しているとき、そのフレームワークを経由せずに直接ページ内の要素を操作すると、表示に不具合が発生する恐れがあります。特に事情がなければ、表示を操作するUIライブラリやグラフィックライブラリなどは、利用するフレームワークに対応しているものを推奨します。例えば、Bootstrapを直接利用せずに、Reactは「React Bootstrap」、Angularは「ng-bootstrap」、Vueは「Bootstrap Vue」を選択します。

* React Bootstrap公式サイト  <https://react-bootstrap.github.io/>
* ng-bootstrap公式サイト  <https://ng-bootstrap.github.io/#/home>
* BootstrapVue公式サイト  <https://bootstrap-vue.org/>

### UIライブラリ

Boostrapと同じカテゴリのライブラリです。見栄えのよいボタンや入力ボックス、アコーディオン表示、レスポンシブデザインなどのユーザーインターフェイス関連の機能を提供します。基本的に利用するフレームワークごとに選択肢が変わります。

#### React用

* Material UI  <https://mui.com/>
* React Bootstrap  <https://react-bootstrap.github.io/>
* Ant Design  <https://ant.design/>

#### Angular用

公式サイトにui-component(UIライブラリ)一覧  
<https://angular.io/resources?category=development#ui-components>

#### Vue用

* Vuetify  <https://vuetifyjs.com/ja/>
* Quasar  <https://quasar.dev/>
* BootstrapVue  <https://bootstrap-vue.org/>


### グラフィックライブラリ

ページ状の指定した範囲に自由にグラフィックを描画できます。**グラフ作成ライブラリ**と大量のデータを可視化する**インフォグラフィックくライブラリ**の2種類がよく使われます。これらのライブラリで作成したグラフィックは、その場で表示を操作できるインタラクティブ機能も実現できます。基本的に利用するフレームワークごとに選択肢が変わります。

### データストアライブラリ

データストアに書き込んだデータは、ブラウザを閉じでも、電源を切っても、保持されます。モダンWebの開発に欠かせない機能です。ブラウザAPIには、何種類もデータストアがありますが、最も高機能なのがindexedDBで、インデックスを使った検索やオブジェクトデータの保存ができます。データストアライブラリの多くは、このindexedDBを基盤として開発されています。

* indexedDBの使用  
<https://developer.mozilla.org/ja/docs/Web/API/indexedDB_API/Using_indexedDB>

データストアライブラリには**Dexie.js**、**PouchDB**というライブラリがあります。これらのライブラリは、React、Angular、Vueのどれでも利用できます。

Dexie.jsは、豊富なAPIを持つ使いやすいデータストアです。
* Dexie.jp公式サイト  <https://dexie.org/>

PouchDBは、分散データベースApache CouchDBのサブセットをWebブラウザに移植したデータストアライブラリです。バックエンドとフロントエンドのデータ同期、異なるデバイス間のデータ同期ができます。
* PouchDB公式サイト  <https://pouchdb.com/>











