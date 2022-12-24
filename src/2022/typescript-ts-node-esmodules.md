{ "header": {"name": "TypeScript", "order": 6}, "order": 0 }
---
# ts-nodeでESModulesを使う方法

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

[Native ECMAScript modules](https://typestrong.org/ts-node/docs/imports#native-ecmascript-modules)  
[paths and baseUrl](https://typestrong.org/ts-node/docs/paths/)