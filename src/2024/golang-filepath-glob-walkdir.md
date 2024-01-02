{ "header": {"name": "Go", "order": 6},  "order": 6, "date": "2024-01-02 15:00" }
---
# Goで階層に制限なくパターンにマッチしたパスのリストを取得する

Goでディレクトリを指定して、ディレクトリの階層に制限なくパターンにマッチしたパスのリストを取得するには、
[filepath.WalkDir()](https://pkg.go.dev/path/filepath#WalkDir)を使って指定したディレクトリ以下のファイルを走査します。
下記は[NodeJSのglob](https://japanese-document.github.io/tips/2023/javascript-nodejs-glob.html)に`./foo/**/*.go`を指定することと同じような処理をするGoのコードです。

```go
package main

import (
	"errors"
	"fmt"
	"io/fs"
	"log"
	"path/filepath"
)

func createWalkDirFunc(paths *[]string, suffix string) (func(string, fs.DirEntry, error) error, error) {
	if paths == nil {
		return nil, errors.New("paths is nil")
	}
	walkDirFunc := func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		lastIndex := len(path) - len(suffix)
		if lastIndex >= 0 && path[lastIndex:] == suffix {
			*paths = append(*paths, path)
		}
		return nil
	}
	return walkDirFunc, nil
}

func main() {
	root := "./foo"
	paths := []string{}
	walkDirFunc, err := createWalkDirFunc(&paths, ".go")
	if err != nil {
		log.Fatal(err)
	}
	if err := filepath.WalkDir(root, walkDirFunc); err != nil {
		log.Fatal(err)
	}
	fmt.Println(paths)
}
```