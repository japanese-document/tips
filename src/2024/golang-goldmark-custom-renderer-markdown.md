
{ "header": {"name": "Go", "order": 6},  "order": 8, "date": "2024-02-24 14:00" }
---
# goldmarkでカスタムレンダラ(custom renderer)を設定する

下記の例では、markdownのリンクをレンダリングするカスタムレンダラを登録することで、リンクのレンダリングを変更しています。
各カスタムレンダラの実装は[こちら](https://github.com/yuin/goldmark/blob/848dc665305d2ed09cf024eeca72be8f0840c4ef/renderer/html/html.go#L262-L287)を参考にすると良いと思います。

```go
package main

import (
	"bytes"
	"fmt"
	"log"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/util"
)

type customRenderer struct{}

func (r customRenderer) RegisterFuncs(reg renderer.NodeRendererFuncRegisterer) {
	reg.Register(ast.KindLink, r.renderLink)
}

func (r customRenderer) renderLink(w util.BufWriter, source []byte, node ast.Node, entering bool) (ast.WalkStatus, error) {
	if entering {
		n := node.(*ast.Link)
		w.WriteString(`<a href="`)
		w.Write(util.EscapeHTML(n.Destination))
		w.WriteString(`" class="Link">`)
	} else {
		w.WriteString("</a>")
	}
	return ast.WalkContinue, nil
}

func newMarkdown() goldmark.Markdown {
	option := goldmark.WithRendererOptions(renderer.WithNodeRenderers(
		util.Prioritized(customRenderer{}, 200),
	))
	markdown := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		option,
	)
	return markdown
}

func main() {
	markdown := newMarkdown()
	var body bytes.Buffer
	if err := markdown.Convert([]byte("[test](https://example.com)"), &body); err != nil {
		log.Fatal(err)
	}
	// <p><a href="https://example.com" class="Link">test</a></p>
	fmt.Println(body.String())
}
```