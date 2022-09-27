{ "header": {"name": "CSS", "order": 0}, "order": 1 }
---
# CSSセレクタで共通の子要素を持つ親要素をまとめる

[:is() CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)を使います。

以下は等価です。

```
:is(h1, h2, h3) a {
  color: red;
}
```

```
h1 a, h2 a, h3 a {
  color: red;
}
```