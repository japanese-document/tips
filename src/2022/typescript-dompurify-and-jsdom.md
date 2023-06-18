{ "header": {"name": "TypeScript", "order": 5}, "order": 1 }
---
# TypeScriptでDOMPurifyとjsdomを使う方法

下記のようにDOMPurifyとjsdomの型をインストールします。

```sh
npm install @types/dompurify @types/jsdom --save-dev 
```

`JSDOM.window`の型は`DOMWindow`です。`createDOMPurify()`の引数の型は`Window`です。だから、`JSDOM.window`を`createDOMPurify()`に渡すと型が合わないのでエラーになります。それは下記のように解決します。

```ts
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window as unknown as Window)
```
