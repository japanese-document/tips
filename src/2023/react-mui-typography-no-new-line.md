{ "header": {"name": "React", "order": 8}, "order": 1, "date": "2023-08-06 18:00"  }
---
# Material UI(MUI)のTypographyコンポーネントを改行させない方法

Material UI(MUI)のTypographyを改行させない方法は下記の2つです。

* [sx](https://mui.com/system/display/)に`display: 'inline'`を指定する。

* [component](https://mui.com/material-ui/api/typography/#Typography-prop-component)に`span`を指定する。

## sxにdisplay: inlineを指定する

```
<Typography sx={{ display: 'inline' }}>テスト</Typography>
```

## componentにspanを指定する

```
<Typography component="span">テスト</Typography>
```