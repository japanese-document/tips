import fs from 'node:fs'
import path from 'node:path'
import glob from 'glob'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import { BASE_URL, BODY, CSS_PATH, DESCRIPTION, SEPARATOR, TITLE, CSS, URL } from './config.js'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window as unknown as Window)

const layout = fs.readFileSync('src/layout.html', 'utf8')
const renderer = {
  link(href: string, _title: string, text: string) {
    return `<a href="${href}" class="Link">${text}</a>`
  },
  heading(text: string, level: number) {
    const document = new window.DOMParser().parseFromString(text, 'text/html')
    const href = document.body.textContent!.replaceAll(/(\s|\?|\:)/g, '_')
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

interface Page {
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

function getMarkDownFileNames(): Promise<string[]> {
  return new Promise((resolve) => {
    glob('./src/**/*.md', (err, files) => {
      if (err !== null) {
        console.error(err)
        process.exit(1)
      }
      return resolve(files)
    })
  })
}

function getMetaAndMd(content: string): [Meta, string] {
  const [meta, md] = content.split(SEPARATOR)
  return [JSON.parse(meta), md.trim()]
}

function createTitle(md: string) {
  return md.slice(2, md.indexOf('\n'))
}

function createDescription(html: string) {
  const _html = html.slice(html.indexOf('\n'))
  const document = new window.DOMParser().parseFromString(_html, 'text/html')
  return document.body.textContent!.replaceAll(/\n/g, '').slice(0, 300)
}

function createURL(dir: string, name: string) {
  return `${BASE_URL}/${dir.slice(6)}/${name}.html`
}

function createHTML(title: string, body: string, description: string, url: string, cssPath: string) {
  const html = layout
    .replaceAll(TITLE, DOMPurify.sanitize(title)).replace(BODY, DOMPurify.sanitize(body))
    .replaceAll(DESCRIPTION, DOMPurify.sanitize(description)).replace(URL, DOMPurify.sanitize(url))
    .replace(CSS, DOMPurify.sanitize(cssPath))
  return html
}

async function createPage(md: string, title: string, url: string) {
  const body = marked.parse(md)
  const description = createDescription(body)
  const html = createHTML(title, body, description, url, CSS_PATH)
  return html
}

function createIndexPage(_pages: Page[]) {
  const pages = _pages.reduce((p, _p) => {
    const { order, name } = _p.meta.header
    const { title, url } = _p
    p[order] ??= {
      name,
      pages: [] 
    }
    p[order].pages[_p.meta.order] = {
      title,
      url
    }
    return p
  }, [] as IndexItem[])
  const title = 'Tips'
  const md = pages.reduce((md: string, p) => {
    return `${md}\n## ${p.name}\n${p.pages.map(p => `* [${p.title}](${p.url})`).join('\n')}`
  }, '# もくじ\n')
  const body = marked.parse(md)
  const description = 'もくじ'
  const html = createHTML(title, body, description, BASE_URL, CSS_PATH)
  return html
}

const markDownFileNames = await getMarkDownFileNames()
const pages: Page[] = []
for (let markDownfileName of markDownFileNames) {
  const content = await fs.promises.readFile(markDownfileName, 'utf8')
  const [meta, md] = getMetaAndMd(content)
  const title = createTitle(md)
  const { name, dir } = path.parse(markDownfileName)
  const url = createURL(dir, name)
  const page = await createPage(md, title, url)
  const dirPath = `./docs/${dir.slice(6)}`
  if (!fs.existsSync(dirPath)) {
    await fs.promises.mkdir(dirPath)
  }
  const htmlFileName = `${dirPath}/${name}.html`
  await fs.promises.writeFile(htmlFileName, page)
  pages.push({
    meta,
    title,
    url
  })
}

const indexPage = createIndexPage(pages)
await fs.promises.writeFile('docs/index.html', indexPage)