{ "header": {"name": "Go", "order": 6},  "order": 4, "date": "2023-12-31 00:10" }
---
# Goメモ

## sliceの分割

```go
package main

import "fmt"

func main() {
	a := []int{1, 2, 3}
	b := []int{4, 5, 6}
	c := append(a, b...)
	fmt.Printf("%#v", c)
}
```

## slice、map、channelはポインタで配列は値

詳しくは[こちら](https://go.dev/doc/faq#references)を見てください。

## JSONのエンコードとデコード

``json:"foo"``のようなフィールドタグはvscode-goでは[Go: Add Tags To Struct Fields](https://github.com/golang/vscode-go/blob/master/docs/commands.md#go-add-tags-to-struct-fields)を使うと自動で付与することができます。

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type Meta struct {
	Foo string `json:"foo"`
	// `json:"-"`にするとエンコード時に結果に反映されない
	Bar string `json:"bar"`
}

type Item struct {
	Name  string `json:"name"`
	Price int    `json:"price"`
	Meta  Meta   `json:"meta"`
}

func main() {
	items := []Item{
		{
			Name:  "name1",
			Price: 11,
			Meta: Meta{
				Foo: "foo",
				Bar: "bar",
			},
		},
		{
			Name:  "name2",
			Price: 23,
			Meta: Meta{
				Foo: "foo",
				Bar: "bar",
			},
		},
	}

	resultString, err := json.Marshal(items)
	if err != nil {
		log.Fatal(err)
	}
	// [{"name":"name1","price":11,"meta":{"foo":"foo","bar":"bar"}},{"name":"name2","price":23,"meta":{"foo":"foo","bar":"bar"}}]
	fmt.Println(string(resultString))

	resultStruct := []Item{}
	if err := json.Unmarshal(resultString, &resultStruct); err != nil {
		log.Fatal(err)
	}
	// []main.Item{main.Item{Name:"name1", Price:11, Meta:main.Meta{Foo:"foo", Bar:"bar"}}, main.Item{Name:"name2", Price:23, Meta:main.Meta{Foo:"foo", Bar:"bar"}}}
	fmt.Printf("%#v", resultStruct)
}
```