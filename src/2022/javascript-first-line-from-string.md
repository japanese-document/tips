# JavaScriptで最初の1行を取得する

[Array.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)と[String.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)を使う。

```
const a = '123\n456\n789\n'
const b = a.slice(0, a.indexOf('\n'))
console.log(b)
// 123 
```