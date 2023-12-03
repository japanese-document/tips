{ "header": {"name": "JavaScript", "order": 2}, "order": 12 , "date": "2023-12-03 20:00"}
---
# NodeJSで画像のheightとwidthを取得する

NodeJSで画像ファイルから画像のheightとwidthを取得するには[image-size](https://github.com/image-size/image-size)を使います。
下記はESMでの例です。それ以外の場合は[こちら](https://github.com/image-size/image-size#programmatic-usage)を見てください。

```js
import { imageSize } from 'image-size'

const { height, width } = imageSize('path/to/image.jpg')
console.log(`height=${height}, width=${width}`)
```