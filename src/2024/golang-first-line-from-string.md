{ "header": {"name": "Go", "order": 6},  "order": 10, "date": "2024-02-17 09:45" }
---
# Goで文字列から最初の1行を取得する

以下のように[strings.Index()](https://pkg.go.dev/strings#Index)を使って、最初の改行の位置を取得します。
そして、改行位置より前にある文字列を取得します。

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	text := "123\n45678\n9"
	start := strings.Index(text, "\n")
	if start != -1 {
		text = text[:start]
	}
	fmt.Print(text)
}
```