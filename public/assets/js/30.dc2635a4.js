(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{448:function(t,e,r){"use strict";r.r(e);var a=r(2),o=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"概要"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#概要"}},[t._v("#")]),t._v(" 概要")]),t._v(" "),e("p",[t._v("主に2種類の用途があります。"),e("br"),t._v("\n1つ目は同じシステム内のバックエンドとのデータ交換です。例えば、社内システムでユーザが入力したキーワードをもとにバックエンドのデータベースを検索する場合です。同じシステム内なので、どのような方法でデータ交換しても構わないのですが、Web技術をペースにしたWeb APIが使い勝手がよいという理由から採用されることがあります。")]),t._v(" "),e("p",[t._v("2つ目は、外部のサービスを利用する場合です。例えばGoogleマップのような自分で用意するのが難しいデータサービスをWeb APIを使って、簡単に利用できます。")]),t._v(" "),e("p",[t._v("Webサービスの検索ページ"),e("br"),t._v(" "),e("a",{attrs:{href:"https://www.programmableweb.com/category/all/apis",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.programmableweb.com/category/all/apis"),e("OutboundLink")],1)]),t._v(" "),e("h3",{attrs:{id:"web-apiの仕組み"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#web-apiの仕組み"}},[t._v("#")]),t._v(" Web APIの仕組み")]),t._v(" "),e("p",[t._v("Web APIの基本ルールとしてXML形式でデータ交換を行う「SOAP（Simple Object Access Protocol）」が主流でした。しかし、最近ではJSON形式でデータ交換を行う「REST（REpresentational State Transfer）」がよく利用されます。")]),t._v(" "),e("p",[t._v("REST-APIの場合、フロントエンドのJavaScriptコードは、通信相手先の仕様に基づいてURLを指定してリクエストを適切なHTTPメソッドで送信し、返信されたJSON形式のデータを利用することになります。")]),t._v(" "),e("h3",{attrs:{id:"web-apiのプログラミング"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#web-apiのプログラミング"}},[t._v("#")]),t._v(" Web APIのプログラミング")]),t._v(" "),e("p",[t._v("JavaScriptのコードからWeb APIを呼び出します。以下の3種類の方法があります。")]),t._v(" "),e("ol",[e("li",[t._v("通信機能をもつブラウザAPIを利用")]),t._v(" "),e("li",[t._v("通信ライブラリを利用")]),t._v(" "),e("li",[t._v("フレームワーク内蔵の通信機能を利用")])]),t._v(" "),e("p",[t._v("ReactとVueは、通信機能を含まないので、ブラウザAPIの「Fetch」または通信ライブラリの「Axios」、Angularでは、内蔵した通信機能「HttpClientモジュール」を利用することが多いです。どのほうほうでも、ユーザの操作を妨げないバックグラウンド通信が可能です。")]),t._v(" "),e("p",[t._v("Fetch API解説ページ"),e("br"),t._v(" "),e("a",{attrs:{href:"https://developer.mozilla.org/ja/docs/Web/API/Fetch_API",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://developer.mozilla.org/ja/docs/Web/API/Fetch_API"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("Axios公式サイト"),e("br"),t._v(" "),e("a",{attrs:{href:"https://axios-http.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://axios-http.com/"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("HttpClientモジュールの利用方法"),e("br"),t._v(" "),e("a",{attrs:{href:"https://angular.io/guide/http",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://angular.io/guide/http"),e("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=o.exports}}]);