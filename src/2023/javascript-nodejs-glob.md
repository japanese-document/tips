{ "header": {"name": "JavaScript", "order": 2}, "order": 9 }
---
# NodeJSでパターンにマッチしたパスのリストを取得する方法

NodeJSでパターンにマッチしたパスの一覧を取得するには[glob](https://github.com/isaacs/node-glob)を使います。

## インストール

```sh
npm install glob
```

## 使い方

`glob()`はパスのリストを解決するPromiseを返します。

```js
import { glob } from 'glob'

const paths = await glob('src/**/*.md')
// ['src/2023/ubuntu-screenshot-area.md', 'src/2023/typescript-type-one-of-object-values.md', ...]
```