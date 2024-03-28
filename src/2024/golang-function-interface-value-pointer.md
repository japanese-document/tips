{ "header": {"name": "Go", "order": 6},  "order": 11, "date": "2024-03-29 00:35" }
---
# Goで引数がインターフェイスの場合、値とポインタを渡すことができる

Goで関数の引数の型がインターフェイスの場合、その引数には値とポインタの両方を渡すことができます。

```go
package main

import "fmt"

type IAdd interface {
	Add(a, b int) int
}

type AddValue struct {}

func (t AddValue) Add(a, b int) int {
	return a + b
}

type AddPointer struct {}

func (t *AddPointer) Add(a, b int) int {
	return a + b
}

func f(a IAdd) {
	fmt.Printf("%d\n", a.Add(1, 2))
}

func main() {
	v := AddValue{}
	f(v)
    // 3
	p := &AddPointer{}
	f(p)
    // 3
}
```