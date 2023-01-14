import { promisify } from 'node:util'
// eslint-disable-next-line import/no-named-as-default
import glob from 'glob'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import {
  BASE_URL, BODY, CSS_PATH, DESCRIPTION, SEPARATOR, TITLE, CSS, URL,
  INDEX_PAGE_DESCRIPTION, INDEX_PAGE_HEADER, INDEX_PAGE_TITLE, SOURCE_DIR
} from './config.js'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window as unknown as Window)

const renderer = {
  link(href: string, _title: string, text: string) {
    return `<a href="${href}" class="Link">${text}</a>`
  },
  heading(text: string, level: number) {
    const document = new window.DOMParser().parseFromString(text, 'text/html')
    const href = document.body.textContent!.replaceAll(/(\s|\?|:)/g, '_')
    return `<h${level} id="${href}"><a href="#${href}">${text}</a></h${level}>\n`
  }
}

marked.use({ renderer })

interface Meta {
  header: {
    name: string
    order: number
  }
  order: number
}

export interface Page {
  meta: Meta
  title: string
  url: string
}

interface IndexItem {
  name: string
  pages: {
    title: string
    url: string
  }[]
}

export function createTitle(md: string) {
  return md.slice('# '.length, md.indexOf('\n'))
}

export function getMarkDownFileNames(): Promise<string[]> {
  return promisify(glob)(`${SOURCE_DIR}/**/*.md`).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

export function getMetaAndMd(content: string): [Meta, string] {
  const [meta, md] = content.split(SEPARATOR)
  return [JSON.parse(meta), md.trim()]
}

export function createDescription(html: string) {
  const _html = html.slice(html.indexOf('\n'))
  const document = new window.DOMParser().parseFromString(_html, 'text/html')
  return document.body.textContent!.replaceAll(/\n/g, '').replaceAll(/"/g, '&quot;').slice(0, 300)
}

export function createURL(dir: string, name: string) {
  const prefixDirCount = SOURCE_DIR.length + 1
  return `${BASE_URL}/${dir.slice(prefixDirCount)}/${name}.html`
}

export function createHTML(
  layout: string, title: string, body: string, description: string, url: string, cssPath: string) {
  const html = layout
    .replaceAll(TITLE, DOMPurify.sanitize(title)).replace(BODY, DOMPurify.sanitize(body))
    .replaceAll(DESCRIPTION, DOMPurify.sanitize(description)).replace(URL, DOMPurify.sanitize(url))
    .replace(CSS, DOMPurify.sanitize(cssPath))
  return html
}

export async function createPage(layout: string, md: string, title: string, url: string) {
  const body = marked.parse(md)
  const description = createDescription(body)
  const html = createHTML(layout, title, body, description, url, CSS_PATH)
  return html
}

export function createIndexPage(layout: string, _pages: Page[]) {
  const pages = _pages.reduce((p, _p) => {
    const { order, name } = _p.meta.header
    const { title, url } = _p
    p[order] ??= {
      name,
      pages: []
    }
    const page = p[order].pages[_p.meta.order]
    if (page) {
      console.error(page, _p)
      throw Error('page already exists.')
    }
    p[order].pages[_p.meta.order] = {
      title,
      url
    }
    return p
  }, [] as IndexItem[])
  const md = pages.reduce((md: string, p) => {
    return `${md}\n## ${p.name}\n${p.pages.map(p => `* [${p.title}](${p.url})`).join('\n')}`
  }, `# ${INDEX_PAGE_HEADER}\n`)
  const body = marked.parse(md)
  const html = createHTML(layout, INDEX_PAGE_TITLE, body, INDEX_PAGE_DESCRIPTION, BASE_URL, CSS_PATH)
  return html
}