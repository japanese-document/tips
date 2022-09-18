# 特定の子要素を持つ要素を指定するCSSセレクタ

[:has() CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)を使います。

```
div:has(p) {
  background-color: red
}
```

```
<div>
  <p>foo</p>
</div>
```