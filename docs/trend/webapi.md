---
title: ネットワーク経由のAPI（Web API）
date: '2023/02/02 19:00:00'
categories:
 - vue
prev: ./framework.md
next: false
---

概要
------------

主に2種類の用途があります。  
1つ目は同じシステム内のバックエンドとのデータ交換です。例えば、社内システムでユーザが入力したキーワードをもとにバックエンドのデータベースを検索する場合です。同じシステム内なので、どのような方法でデータ交換しても構わないのですが、Web技術をペースにしたWeb APIが使い勝手がよいという理由から採用されることがあります。

2つ目は、外部のサービスを利用する場合です。例えばGoogleマップのような自分で用意するのが難しいデータサービスをWeb APIを使って、簡単に利用できます。

Webサービスの検索ページ  
<https://www.programmableweb.com/category/all/apis>

### Web APIの仕組み

Web APIの基本ルールとしてXML形式でデータ交換を行う「SOAP（Simple Object Access Protocol）」が主流でした。しかし、最近ではJSON形式でデータ交換を行う「REST（REpresentational State Transfer）」がよく利用されます。

REST-APIの場合、フロントエンドのJavaScriptコードは、通信相手先の仕様に基づいてURLを指定してリクエストを適切なHTTPメソッドで送信し、返信されたJSON形式のデータを利用することになります。

### Web APIのプログラミング

JavaScriptのコードからWeb APIを呼び出します。以下の3種類の方法があります。  
1. 通信機能をもつブラウザAPIを利用
2. 通信ライブラリを利用
3. フレームワーク内蔵の通信機能を利用

ReactとVueは、通信機能を含まないので、ブラウザAPIの「Fetch」または通信ライブラリの「Axios」、Angularでは、内蔵した通信機能「HttpClientモジュール」を利用することが多いです。どのほうほうでも、ユーザの操作を妨げないバックグラウンド通信が可能です。

Fetch API解説ページ  
<https://developer.mozilla.org/ja/docs/Web/API/Fetch_API>

Axios公式サイト  
<https://axios-http.com/>

HttpClientモジュールの利用方法  
<https://angular.io/guide/http>

