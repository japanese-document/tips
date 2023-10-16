{ "header": {"name": "TypeScript", "order": 5}, "order": 8, "date": "2023-10-16 22:00"  }
---
# Type AnnotationsとSatisfies Operatorの違い

TypeScriptの[Type Annotations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables)と[Satisfies Operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)の違いは、
Type Annotationsを使う場合、値の各プロパティの型は指定した型の対応するプロパティの型になります。
一方、Satisfies Operatorを使用した場合、変数の宣言時に変数に代入された値のプロパティの型になります。

```ts
type Foo = {
  bar: number | string
}

const foo1 = {
  bar: "1",
} satisfies Foo

const foo2: Foo = {
  bar: "1",
}

// (property) bar: string
foo1.bar = "2"
// エラーになる
foo1.bar = 2

// (property) bar: string | number
foo2.bar = "2"
// エラーにならない
foo2.bar = 2
```