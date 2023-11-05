{ "header": {"name": "TypeScript", "order": 5}, "order": 9, "date": "2023-11-05 18:30"  }
---
# TypeScriptで数値の範囲を指定する型を定義する

TypeScriptで数値(0以上の整数のみ)の範囲を指定するには、[type-fest](https://github.com/sindresorhus/type-fest)の`IntRange`を使います。

```ts
import type { IntRange } from 'type-fest'

let foo: IntRange<0, 101> = 0

const bar: IntRange<0, 101> = 100

const baz: IntRange<0, 101, 10> = 30

function isIntRange<S extends number, T extends number, U extends number = 1>(v: number, min: S, max: T): v is IntRange<S, T, U> {
  return v >= min && v < max
}

const a = 3

if (isIntRange(a, 1, 10)) {
  foo = a
}
```