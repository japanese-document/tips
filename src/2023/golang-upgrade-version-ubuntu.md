{ "header": {"name": "Go", "order": 6}, "order": 1, "date": "2023-05-16 18:30" }
---
# UbuntuでGoのバージョンをアップグレードする方法

公式サイトからGoをダウンロードしてインストールした場合、公式サイトの[インストール手順](https://go.dev/doc/install)のように古いバージョンを削除して最新のバージョンをダウンロードしてインストールします。

例:

```
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.20.4.linux-amd64.tar.gz
```