{ "header": {"name": "Next.js", "order": 9}, "order": 2, "date": "2023-11-29 21:30"  }
---
# Next.jsでホストとポートを変更する

Next.jsでホスト(host)とポート(port)を変更するには下記のようにコマンドラインでパラメータをセットします。
`.env`でそれらを[変更することはできません](https://nextjs.org/docs/pages/api-reference/next-cli#development)。

## ホストを変更する

ホストを変更するには下記のように`-H`オプションを使ってホストを指定します。

```
  "scripts": {
    "dev": "next dev -H 127.0.0.1",
  },
```

## ポートを変更する

ポートを変更するには下記のように`-p`オプションを使ってポートを指定します。

```
  "scripts": {
    "dev": "next dev -p 1234",
  },
```