{ "header": {"name": "Ubuntu", "order": 7}, "order": 1, "date": "2023-12-22 19:00" }
---
# WSLのUbuntuで突然にGithubにsshで接続できなくなった

sshでGithubに接続できていたにもかかわらず、突然にsshで接続できなくなりました。
`ssh -T git@github.com`を実行すると下記のエラーメッセージが表示される。

`ssh: Could not resolve hostname github.com: Temporary failure in name resolution`

以下の手順で解決しました。

1. `/etc/wsl.conf`の変更

`/etc/resolv.conf`の内容を下記のように[generateResolvConf](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#network-settings)を変更します。
下記の内容に変更して不具合が生じないか注意してください。

```
[network]
generateResolvConf=false
```

2. Windowsを再起動する

3. `/etc/resolv.conf`の変更

`/etc/resolv.conf`の内容を下記のように[8.8.8.8](https://en.wikipedia.org/wiki/Google_Public_DNS)に変更します。
下記の内容に変更して不具合が生じないか注意してください。

(変更を保存できない場合は`/etc/resolv.conf`を削除して新たに`/etc/resolv.conf`を作成します。
削除しても不具合が生じないか注意してください。)

```
nameserver 8.8.8.8
```

4. Windowsの再起動する

5. `ssh -T git@github.com`を試す