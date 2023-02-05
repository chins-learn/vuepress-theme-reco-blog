---
title: SPAの特徴
date: '2023/02/02 19:00:00'
categories:
 - vue
---

待ち時間ゼロのデータ検索
-----------------------

* データベース検索で、見かけ上の待ち時間をゼロにできる手法がある。
    - 無限スクロール
    - 予測ダウンロード
* モダンWebでは、ユーザー操作より前にデータを準備することが可能。

仕様書通り動作すればよかったバックエンド開発と比べ、フロンドエンド開発は、ユーザー目線で、ストレスを感じさせないことが必要。例えば、検索条件を絞ったとき、検索結果件数をリアルタイムで表示するため、データベースに検索条件と件数のデータが事前用意する。記事一覧を表示するとき、まず文字情報を先にダウンロードし、バックグラウンド通信でが画像などのほかの情報をダウンロードする。

画面復元
---------------

* 画面の表示と入力途中のデータのどちらも復元できる。
* バラメータ付きURLによる画面復元は、Amazonでも導入されている。
* PC間でもネットワーク経由で画面復元が可能。


オフライン化
--------------

* フロントエンドにWebサーバーと同等機能を作ることでオフライン対応が可能。
* Webサーバーと同等機能はWebブラウザの組み込み機能「ServiceWorker」を使う。
* ページの閲覧だけでなく、Webサイトへの送信もオフライン対応可能。

フロントエンドにWebサーバーと同じ機能を作り、そこにアクセスする。
遅延ダウンロード
データ容量の制限上、重要なページのみダウンロードする。
オフラインの時はオフライン用のメニューを表示して、表示できるページのみ選択可能にすれば、エラーを回避できる。
フロントエンドにWebサーバーを作るには、Webブラウザーに内蔵されている**ServiceWorker**という機能を利用する。


