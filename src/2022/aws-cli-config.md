{ "header": {"name": "AWS", "order": 5}, "order": 0 }
---
# aws-cliの設定ファイルの例

`~/.aws/credentials`

```
[foo]
aws_access_key_id = ...
aws_secret_access_key = ...
```


`~/.aws/config`

```
[profile bar]
region = ap-northeast-1
output = text
source_profile = foo
mfa_serial = arn:aws:iam::...
role_arn = arn:aws:iam::...
```