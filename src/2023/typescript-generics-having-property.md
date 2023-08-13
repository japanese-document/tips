{ "header": {"name": "TypeScript", "order": 5}, "order": 4, "date": "2023-08-13 23:00"  }
---
# TypeScriptで特定のプロパティを持つジェネリクスを定義する方法

下記のように、ジェネリクスが持つべきプロパティを持つ型を継承します。

```ts
function foo<T extends {bar: unknown}>(v: T) {
  console.log(v.bar)
}
foo({bar: 1})
```