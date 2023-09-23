{ "header": {"name": "TypeScript", "order": 5}, "order": 7, "date": "2023-09-23 11:00"  }
---
# objectとnullのUnion型のプロパティの型からnullを削除する

TypeScriptでobjectとnullのUnion型のプロパティからobjectのプロパティの型を抽出するには、
下記のように[NonNullable](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)を使います。

```ts
type Bar = {
  baz: string
}

type Foo = {
  bar?: Bar | null | undefined
}

type T = NonNullable<Foo['bar']>['baz']

// type T = string
```