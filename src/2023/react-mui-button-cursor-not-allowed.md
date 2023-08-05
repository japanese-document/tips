{ "header": {"name": "React", "order": 8}, "order": 0, "date": "2023-08-05 14:00"  }
---
# CSSでMaterial UI(MUI)のボタンのカーソルをnot allowedにする

CSSでMaterial UI(MUI)のボタンのカーソルをnot allowedにするには、下記のように`pointer-events`プロパティに`auto`を指定します。詳しくは、[こちら](https://mui.com/material-ui/react-button/#cursor-not-allowed)を見てください。

```css
/* The MIT License (MIT) Copyright (c) MUI Team */
.MuiButtonBase-root:disabled {
  cursor: not-allowed;
  pointer-events: auto;
}
```