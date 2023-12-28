{ "header": {"name": "Go", "order": 6},  "order": 3, "date": "2023-12-28 18:00" }
---
# GoでArray.find()のような関数を使う

GoでJavaScriptの[Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)ような関数を使うには、
下記のようにloの[Find()](https://github.com/samber/lo?tab=readme-ov-file#find)を使います。

```go
package main

import (
	"fmt"

	"github.com/samber/lo"
)

type Item struct {
	Name  string
	Price int
}

func main() {
	items := []*Item{
		{
			Name:  "foo",
			Price: 11,
		},
		{
			Name:  "bar",
			Price: 23,
		},
		{
			Name:  "baz",
			Price: 15,
		},
		{
			Name:  "qux",
			Price: 23,
		},
	}
	item, result := lo.Find(items, func(i *Item) bool { return i.Price == 23 })
	if result {
        // &main.Item{Name:"bar", Price:23}
		fmt.Printf("%#v\n", item)
	}
}
```