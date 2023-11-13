{ "header": {"name": "TypeScript", "order": 5}, "order": 10, "date": "2023-11-13 12:15" }
---
# swc-nodeでESModulesを使う方法

@swc/coreと@swc-node/registerをインストールします。

## 設定

下記の設定をします。

* `package.json`に`"type": "module"`を加えます。

* `tsconfig.json`の`compilerOptions.module`を`"NodeNext"`にします。

* importする際にpathに`.js`を付けます。
(例: `import { createTitle } from './utils.js'`)

* `package.json`に下記のような処理を実行する設定を追加します。

```json
{
  ...
  "scripts": {
    "execute": "node --loader @swc-node/register/esm scripts/index.ts"
  },
  ...
}
```

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
    "include": [
      "./scripts/**/*"
    ]
}
```

## ESLint

[typescript-eslint](https://typescript-eslint.io/)を使います。設定ファイルの拡張子を`.cjs`にします。(例: `.eslintrc.cjs`)
これをしない場合、`Error [ERR_REQUIRE_ESM]`が発生します。

## Jest

[@swc/jest](https://github.com/swc-project/jest)を使います。

package.jsonの`scripts`を[以下のように](https://jestjs.io/docs/ecmascript-modules)します。

```
{
    ...
    "scripts": {
        ...
        "test": "NODE_OPTIONS=--experimental-vm-modules jest",
        ...
    },
    ...
}
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
  resetMocks: true,
}
```