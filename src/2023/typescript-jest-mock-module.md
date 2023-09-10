{ "header": {"name": "TypeScript", "order": 5}, "order": 6, "date": "2023-09-10 16:20"  }
---
# TypeScriptでJestを使ってモジュールをモック(mock)する

[jest.mock()](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options)でモジュールをモック(mock)すると、モックにJestの[Mock functions](https://jestjs.io/docs/mock-function-api)の型が付与されていません。
下記のように[jest.mocked()](https://jestjs.io/docs/mock-function-api/#jestmockedsource-options)にモックを渡します。
その戻り値にはMock functionsの型が付与されてています。
その戻り値にモックの設定を付与します。

下記の例では`fs.promise.readFile`をモックして、モックの設定をしています。

```ts
import { readFile } from 'node:fs/promises'
jest.mock('node:fs/promises')
import { targetFunc } from './target.js'

const mockedReadFile = jest.mocked(readFile)
// モックの設定を付与
mockedReadFile.mockResolvedValue('ファイルの中身')
targetFunc()
```