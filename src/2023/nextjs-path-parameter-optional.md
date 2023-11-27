{ "header": {"name": "Next.js", "order": 9}, "order": 1, "date": "2023-11-27 21:30"  }
---
# Next.jsのApp RouterでURLのpathのパラメータをオプショナルにする

App RouterでURLのpathのパラメータをオプショナルにするには、[Optional Catch-all Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments)を使います。
`app/foo/[[...id]]/page.tsx`は`https://www.example.com/foo`と`https://www.example.com/foo/1`の両方にマッチします。