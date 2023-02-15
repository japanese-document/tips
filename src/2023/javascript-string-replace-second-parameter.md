{ "header": {"name": "JavaScript", "order": 2}, "order": 6 }
---
# JavaScriptのString.replace()の第2引数の文字列をエスケープする

下記のようにString.replaceの第2引数に[特殊文字列](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_the_replacement)を含む文字列を渡すとターゲットを素の第2引数の文字列に置き換えません。

```js
'foo123bar'.replace('123', '$`')
// 'foofoobar'
```

下記のように第2引数に文字列を返す関数を渡すことで文字列をエスケープすることができます。

```js
'foo123bar'.replace('123', () => '$`')
// 'foo$`bar'
```