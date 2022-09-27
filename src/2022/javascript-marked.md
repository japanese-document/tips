{ "header": {"name": "JavaScript", "order": 2}, "order": 3 }
---
# Marked

## NodeJSでsanitizeする方法

[DOMPurify](https://github.com/cure53/DOMPurify)を使います。

```
import { marked } from 'marked'
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)
const html = DOMPurify.sanitize(marked.parse('# Foo'))
```

## 置き換えるHTML要素を変更する

rendererを設定します。

```
import { marked } from 'marked'

const renderer = {
  link(href, _title, text) {
    return `<a href="${href}" class="Link">${text}</a>`
  }
}
marked.use({ renderer })
```