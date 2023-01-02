{ "header": {"name": "TypeScript", "order": 6}, "order": 0 }
---
# ts-nodeでESModulesを使う方法

## 設定

下記の設定をします。

* `package.json`に`"type": "module"`を加えます。

* `tsconfig.json`の`compilerOptions.module`を`"ESNext"`にします。

* `tsconfig.json`の`ts-node`を次のようにします。
```
{
  "ts-node": {
    "esm": true,
    "require": ["tsconfig-paths/register"]
  }
}
```

* [tsconfig-paths](https://github.com/dividab/tsconfig-paths)をインストールします。
(しない場合、`CustomError: Cannot find module`のエラーが発生します。)

* importする際にpathに`.js`を付けます。

* `package.json`に下記のような処理を実行する設定を追加します。

```json
{
  "scripts": {
    "execute": "ts-node scripts/index.ts"
  }
}
```

[Native ECMAScript modules](https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules)  
[paths and baseUrl](https://typestrong.org/ts-node/docs/paths/)

## ESLint

ESLint(typescript-eslint)を使用する場合は設定ファイルの拡張子を`.cjs`にします。(例: `.eslintrc.cjs`)
これをしない場合、`Error [ERR_REQUIRE_ESM]`が発生します。

## Jest

[ts-jest](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support#manual-configuration)を使います。
設定ファイルの拡張子を`.cjs`にします。(例: `jest.config.cjs`)