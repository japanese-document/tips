{ "header": {"name": "TypeScript", "order": 5}, "order": 5, "date": "2023-08-19 21:00"  }
---
# TypeScriptでオブジェクトのプロパティの値の型をプロパティ名のパターン毎に定義する方法

TypeScriptでオブジェクトのプロパティの値の型をプロパティ名のパターン毎に定義するには、下記のように、[Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)を使ってプロパティ名の型を定義します。そして、それをオブジェクトの型定義で使用します。

```ts
type NumberProperty = `number${string}`
type StringProperty = `string${string}`

interface Foo {
  [bar: NumberProperty]: number,
  [baz: StringProperty]: string,
}

const foo: Foo = {
  numberA: 1,
  stringA: 'a',
}
```