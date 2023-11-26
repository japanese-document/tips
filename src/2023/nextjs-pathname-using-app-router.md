{ "header": {"name": "Next.js", "order": 9}, "order": 0, "date": "2023-11-27 00:15"  }
---
# Next.jsのApp RouterでURLのpathnameを取得する

Next.js 13で導入されたApp RouterでURLのpathnameを取得するには、下記のように[usePathname()](https://nextjs.org/docs/app/api-reference/functions/use-pathname)を使います。
`'use client'`を指定する必要があることに注意してください。

```jsx
'use client'

import { usePathname } from 'next/navigation'

export function Foo() {
  const pathname = usePathname()
  return pathname
}
```