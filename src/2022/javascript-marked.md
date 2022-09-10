# Marked

## NodeJSでsanitizeする方法

[DOMPurify](https://github.com/cure53/DOMPurify)を使う。

```
import { marked } from 'marked'
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)
const html = DOMPurify.sanitize(marked.parse('# Foo'))
```