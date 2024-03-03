{ "header": {"name": "JavaScript", "order": 2}, "order": 13 , "date": "2024-03-03 10:00"}
---
# NodeJSでIPv6よりIPv4を優先する

NodeJSでIPv6よりIPv4を優先するには下記のようにします。

* [server.listen()](https://nodejs.org/api/net.html#socketconnectport-host-connectlistener)の`host`にIPv4のアドレス(例: `0.0.0.0`)を渡します。
* [--dns-result-order](https://nodejs.org/api/cli.html#--dns-result-orderorder)もしくは[dns.setDefaultResultOrder()](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)に`ipv4first`をセットします。
