
{ "header": {"name": "JavaScript", "order": 2}, "order": 11 , "date": "2023-11-15 20:00"}
---
# Jest用のprocess.envの値を設定する方法

Jest用の`process.env`の値を設定するには下記の2つの方法があります。

* Jest用の`.env`ファイルを指定する。(NodeJS 20.6以上)

* setupFilesで値をセットする。

## Jest用の`.env`ファイルを指定する

[NodeJS 20.6](https://nodejs.org/en/blog/release/v20.6.0)で導入された`--env-file`オプションを使用して、
Jest用の`.env`ファイルを指定します。

`<rootDir>/scripts/.env.test`

```
FOO=foo
BAR=bar
```

package.jsonを下記のように記述します。

```json
{
  ...
  "scripts": {
    "test": "node --env-file=scripts/.env.test node_modules/.bin/jest"
  },
  ...
}
```

## setupFilesで値をセットする

[setupFiles](https://jestjs.io/docs/configuration#setupfiles-array)に`process.env`に値をセットする処理を行うファイルをセットします。

jestSetup.js

```js
process.env.FOO = 'foo'
process.env.BAR = 'bar'
```

jest.config.js

```js
module.exports = {
  ...
  setupFiles:['<rootDir>/jestSetup.js'],
  ...
}
```