{ "header": {"name": "Git", "order": 1}, "order": 0 }
---
# Gitでmainブランチ以外のブランチを削除する

下記のコマンドを実行します。

```
git branch | grep -v "main" | xargs git branch -D
```