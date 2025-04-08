# broken-image-checker
ページ内のリンク切れ画像を調査するChrome拡張です。

DOM構築後にimgタグのsrc/srcsetのURLにリクエストを送って、正常取得できるかどうかを評価します。  
リンク切れが見つかった件数はバッジに表示されるので、Chrome拡張をピン留めして表示しておくと便利です。

ピン留めをクリックすると、リンク切れURLのコピーが出来ます。  
Spreadsheetとかにコピペして目視確認するのに役立ててください。

Chrome拡張機能のインストール方法は以下。
ストアへの登録はしていないので、デベロッパーモードでインストールする必要があります。    
[https://support.google.com/chrome/a/answer/2714278?hl=ja](https://support.google.com/chrome/a/answer/2714278?hl=ja)

## 注意
Googleの検索画面とかでもデッドリンクチェック走るので、たまにBOTチェックが入ることがあるようです。  
不要な時は無効化しておいたほうが良いかも。  
