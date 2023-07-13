## How to use

Contentfulのマークダウンエディタで執筆した記事を、[Zenn](https://zenn.dev/)風に出力してプレビューできるContentful Appです。  
[zenn-editor](https://github.com/zenn-dev/zenn-editor)のパッケージをベースに作られており、zenn独自記法を含むzennのスタイリングが適用されます。  
Contentful上で動作するため、フロントエンドのフレームワークの影響は受けません。

## 使い方

### ローカルでAppを起動する場合
1. リポジトリを `clone` する
2. `npm install`
3. `npm run dev` 
4. ローカルの App URL (例: `http://localhost:3000`)をContentful Appに登録する

### Cloudflare PagesにAppをデプロイする場合
https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/

### 書き方
[ZennのMarkdown記法一覧](https://zenn.dev/zenn/articles/markdown-guide) を使えます。

なお、本Appで利用されている `zenn-markdown-to-html` は、現時点で `<br>` 以外のHTMLタグの埋め込みには対応していません。  
（Contentfulのマークダウンエディタ自体にはHTMLの入力が可能ですが、プレビューできません）

## 関連パッケージ

- [zenn-editor](https://github.com/zenn-dev/zenn-editor) - Zenn独自記法をHTMLに変換するパーサー
- [Forma 36](https://f36.contentful.com/) – ContentfulのUIキット
- [Create Contentful App](https://github.com/contentful/create-contentful-app) - Contentful Appの作成