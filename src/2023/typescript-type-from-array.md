{ "header": {"name": "TypeScript", "order": 5}, "order": 3, "date": "2023-08-12 21:00" }
---
# 配列から配列の各値のどれか１つに該当する型を生成する方法

下記のようにします。

```ts
const list = ['foo', 'bar', 'baz'] as const
type Values = typeof list[number]
// type Values = "foo" | "bar" | "baz"
```

各値の特定のプロパティに該当する型を生成する場合は下記のようにします。

```ts
const list = [
  { value: 'foo'},
  { value: 'bar'},
  { value: 'baz'},
] as const
type Values = typeof list[number]['value']
// type Values = "foo" | "bar" | "baz"
```