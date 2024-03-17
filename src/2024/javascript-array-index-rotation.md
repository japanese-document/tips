{ "header": {"name": "JavaScript", "order": 2}, "order": 14 , "date": "2024-03-17 10:00"}
---
# 配列のインデックス(index)をローテーションする

以下のような処理をして次のインデックスを取得します。
`length`は配列の長さです。

```js
const nextIndex = (currentIndex, length) => (currentIndex + 1) % length
nextIndex(0, 3)
// 1
nextIndex(1, 3)
// 2
nextIndex(2, 3)
// 0
```