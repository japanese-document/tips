import fs from 'node:fs'
import { INDEX_PAGE_DESCRIPTION , BASE_URL , INDEX_PAGE_TITLE , OUTPUT_DIR } from './config.js'
import { createPages, getMarkDownFileNames } from './utils.js'

export class SortedLimitedArray<T> extends Array {
  limit = 0
  compareFn: Parameters<Array<T>['sort']>[0]

  static create<T> (arrayLike: Parameters<typeof Array.from<T>>[0], limit: number, compareFn: Parameters<Array<T>['sort']>[0]): SortedLimitedArray<T> {
    const arr = SortedLimitedArray.from<T>(arrayLike) as SortedLimitedArray<T>
    arr.limit = limit
    arr.compareFn = compareFn
    arr.#sortAndTruncate()
    return arr
  }

  push<T> (...args: Parameters<Array<T>['push']>) {
    super.push(...args)
    this.#sortAndTruncate()
    return this.length
  }

  #sortAndTruncate() {
    this.sort(this.compareFn)
    if (this.length > this.limit) {
      this.length = this.limit
    }
  }
}

const markDownFileNames = await getMarkDownFileNames()

const pages = (await createPages(markDownFileNames)).filter(page => page.meta.date)
const sortedPages = SortedLimitedArray.create(pages, 20, (page1, page2) => {
  return Date.parse(page2.meta.date!) - Date.parse(page1.meta.date!)
})

const items = sortedPages.reduce((pv, { title, url, meta }) => {
  const pubDate = new Date(Date.parse(meta.date!)).toUTCString()
  return `${pv}
  <item>
    <title>${title}</title>
    <pubDate>${pubDate}</pubDate>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
  </item>`
}, '')

const pubDate = (new Date()).toUTCString()

const rss = `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${INDEX_PAGE_TITLE}</title>
    <description>${INDEX_PAGE_DESCRIPTION}</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <pubDate>${pubDate}</pubDate>
    <lastBuildDate>${pubDate}</lastBuildDate>
  </channel>
  ${items}
</rss>
`

fs.writeFileSync(`${OUTPUT_DIR}/rss.xml`, rss)