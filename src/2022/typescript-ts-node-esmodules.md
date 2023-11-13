{ "header": {"name": "TypeScript", "order": 5}, "order": 0, "date": "2023-11-13 12:15" }
---
# ts-nodeでESModulesを使う方法

NodeJSのバージョンが20で正常に動作しない場合はバージョン18を使う。
また、ts-nodeの代わりに[swc-node](https://japanese-document.github.io/tips/2023/typescript-swc-node-esmodules.html)を使うことができます。

## 設定

下記の設定をします。

* `package.json`に`"type": "module"`を加えます。

* `tsconfig.json`の`compilerOptions.module`を`"NodeNext"`にします。

* `tsconfig.json`の`ts-node`を次のようにします。
```
{
  ...
  "ts-node": {
    "esm": true,
    "require": ["tsconfig-paths/register"]
  },
  ...
}
```

* [tsconfig-paths](https://github.com/dividab/tsconfig-paths)をインストールします。
(しない場合、`CustomError: Cannot find module`のエラーが発生します。)

* importする際にpathに`.js`を付けます。
(例: `import { createTitle } from './utils.js'`)

* `package.json`に下記のような処理を実行する設定を追加します。

```json
{
  ...
  "scripts": {
    "execute": "ts-node scripts/index.ts"
  },
  ...
}
```

[Native ECMAScript modules](https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules)  
[paths and baseUrl](https://typestrong.org/ts-node/docs/paths/)

### tsconfig.jsonの例

```json
{
    "compilerOptions": {
      "target": "ESNext",
      "module": "NodeNext",
      "allowJs": true,
      "strict": true,
      "moduleResolution": "NodeNext",
      "esModuleInterop": true,
      "baseUrl": "./",
      "skipLibCheck": true,
      "typeRoots": ["node_modules/@types"],
      "sourceMap": false
    },
    "ts-node": {
      "esm": true,
      "require": ["tsconfig-paths/register"]
    },
    "include": [
      "./scripts/**/*"
    ]
}
```

## ESLint

[typescript-eslint](https://typescript-eslint.io/)を使います。設定ファイルの拡張子を`.cjs`にします。(例: `.eslintrc.cjs`)
これをしない場合、`Error [ERR_REQUIRE_ESM]`が発生します。

## Jest

[@swc/jest](https://github.com/swc-project/jest)、もしくは[ts-jest](https://kulshekhar.github.io/ts-jest/)を使います。

package.jsonの`scripts`を[以下のように](https://jestjs.io/docs/ecmascript-modules)します。

```json
{
    ...
    "scripts": {
        "test": "NODE_OPTIONS=--experimental-vm-modules jest",
    },
    ...
}
```

モックとimport処理を[以下のように](https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm)変更します。

変更前

```ts
import { readFile } from 'node:fs/promises'
jest.mock('node:fs/promises')
import { createTitle }  from './utils.js'
```

変更後

```ts
import { jest } from '@jest/globals'
jest.unstable_mockModule('node:fs/promises', () => ({ readFile: jest.fn() }))
const { readFile } = await import ('node:fs/promises')
const { createTitle } = await import('./utils.js')
```

### @swc/jest

jest、@types/jest、@swc/core、@swc/jestをインストールします。
設定ファイルの拡張子を`.cjs`にします。(例: `jest.config.cjs`)

#### jest.config.cjsの例

```js
module.exports = {
  roots: ['<rootDir>/scripts'],
  testMatch: ['**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      '@swc/jest',
    ],
  },
}
```

### ts-jest

jest、@types/jest、ts-jestをインストールします。
設定ファイルは[これ](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support#manual-configuration)を参考にします。
設定ファイルの拡張子を`.cjs`にします。(例: `jest.config.cjs`)

#### jest.config.cjsの例

```js
module.exports = {
  roots: ['<rootDir>/scripts'],
  testMatch: ['**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
}
```

## VSCode

VSCodeでdebugするには`.vscode/launch.json`の[runtimeExecutable](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes)に`${workspaceFolder}/node_modules/.bin/ts-node`をセットします。

### .vscode/launch.jsonの例

```json
{
    "version": "2.0.0",
    "configurations": [
        {
            "name": "ts-node",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/ts-node",
            "args": [
                "${workspaceFolder}/scripts/index.ts"
            ]
        }
    ]
}
```