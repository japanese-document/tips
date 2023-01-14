{ "header": {"name": "JavaScript", "order": 2}, "order": 4 }
---
# JavaScript(NodeJS)でコールバック関数をPromise化する 

[util.promisify(original)](https://nodejs.org/api/util.html#utilpromisifyoriginal)を使います。
コールバック関数は関数の最後の引数である必要があります。
コールバック関数はエラーが最初の引数として渡される必要があります。(`(err, value) => {...}`)

下記は[glob](https://github.com/isaacs/node-glob)をPromise化する例です。

```js
import { promisify } from 'node:util'
import glob from 'glob'

function getFileNames(): Promise<string[]> {
  return promisify(glob)('./**/*.md').catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
```