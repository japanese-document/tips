{ "header": {"name": "Go", "order": 6},  "order": 10, "date": "2024-02-16 23:10" }
---
# Goで文字列から最初の1行を取得する

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