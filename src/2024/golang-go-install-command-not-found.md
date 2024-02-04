{ "header": {"name": "Go", "order": 6},  "order": 9, "date": "2024-02-04 22:00" }
---
# go installして実行するとcommand not foundになる

`go install`でインストールしたアプリケーションを実行すると`command not found`が表示されました。
`$GOPATH/bin`にPATHが通ってないことが原因かもしれません。
その場合は下記のように`.bashrc`で`:$GOPATH/bin`を`$PATH`の末尾に追加してPATHを通します。
そして、`.bashrc`を反映します(`source ~/.bashrc`)。

```
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```