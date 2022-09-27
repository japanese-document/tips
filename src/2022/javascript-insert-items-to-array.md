{ "header": {"name": "JavaScript", "order": 2}, "order": 1 }
---
# JavaScriptで配列に値を挿入する

[Array.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)を使う。

```
const a = [0, 1, 2, 3, 4]
a.splice(2, 0, 10, 11, 12)
console.log(a)
// [0, 1, 10, 11, 12, 2, 3, 4]
```