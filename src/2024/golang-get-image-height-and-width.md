{ "header": {"name": "Go", "order": 6},  "order": 7, "date": "2024-01-03 15:00" }
---
# Goで画像のheightとwidthを取得する

下記の例では、bmp、tiff、webp、jpeg、gif、pngのファイルのheightとwidthを取得することができます。
詳しくは[こちら](https://go.dev/blog/image)を見てください。

```go
package main

import (
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"log"
	"os"

	_ "golang.org/x/image/bmp"
	_ "golang.org/x/image/tiff"
	_ "golang.org/x/image/webp"
)

func main() {
	file, err := os.Open("./path/to/image-file")
	if err != nil {
		log.Fatal(err)
	}

	img, format, err := image.Decode(file)
	if err != nil {
		log.Fatal(err)
	}

	b := img.Bounds()
	width := b.Dx()
	height := b.Dy()
	fmt.Printf("format: %s, width: %d, height: %d", format, width, height)
}
```