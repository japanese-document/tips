{ "header": {"name": "JavaScript", "order": 2}, "order": 10 , "date": "2023-11-14 20:00"}
---
# ReferenceError: jest is not definedの対処法

下記２つの方法のうち1つを選択します。

* テストのファイルでjestをimportする。

* setupFilesでjestをimportする。

## テストでjestをimportする

各テストのファイルで下記のコードを記述します。

```js
import { jest } from '@jest/globals'
```

## setupFilesでjestをimportする。

下記のファイルを作成して、jestの設定ファイルに追加します。

jestSetup.js

```js
import { jest } from '@jest/globals'

global.jest = jest
```

jest.config.js

```js
module.exports = {
  ...
  setupFiles: [
    '<rootDir>/jestSetup.js'
  ],
  ...
}
```