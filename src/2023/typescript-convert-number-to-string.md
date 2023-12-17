{ "header": {"name": "TypeScript", "order": 5}, "order": 11, "date": "2023-12-17 10:00" }
---
# TypeScriptでnumber型の型定義をstring型の型定義に変換する

TypeScriptでnumber型の型定義をstring型の型定義に変換するには、下記のようにnumber型の型定義を``${}``で囲みます。

```ts
type A = 1

type B = `${A}`

const b: B = '1'
```

また、下記のようにnumberのUnion型の型定義をstringのUnion型の型定義へ変換することができます。

```ts
type A = 1 | 2 | 3

// type B = "1" | "2" | "3"
type B = `${A}`

const b: B = '1'
```