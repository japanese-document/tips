{ "header": {"name": "TypeScript", "order": 5}, "order": 2 }
---
# 既存のObjectの値のうち1つが該当する型を定義する方法

下記のようにします。

```ts
const obj = {
  foo: 'abc',
  bar: 123,
  baz: true
} as const

type Value = typeof obj[keyof typeof obj]

const v: Value = 123
```