{ "header": {"name": "Go", "order": 6}, "order": 0 }
---
# Goで指定した値が配列内に存在するか判別する

下記のように[Go 1.18](https://tip.golang.org/doc/go1.18)で追加された[slices.Contains()](https://pkg.go.dev/golang.org/x/exp/slices#Contains)を使います。

```go
package main

import (
	"fmt"

	"golang.org/x/exp/slices"
)

func main() {
	items := []string{"foo", "bar", "baz"}
	result := slices.Contains(items, "foo")
	fmt.Println(result) // true
	result = slices.Contains(items, "abc")
	fmt.Println(result) // false
}
```