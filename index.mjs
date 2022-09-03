import fs from 'fs'
import path from 'node:path'
import glob from 'glob'
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const TITLE = /__TITLE__/g
const BODY = '__BODY__'
const BASE_URL = 'https://japanese-document.github.io/tips'
const URL = '__URL__'
const DESCRIPTION = /__DESCRIPTION__/g
const layout = fs.readFileSync('src/layout.html', 'utf8')

function getMarkDownFileNames() {
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

function createTitle(md) {
  return md.slice(2, md.indexOf('\n'))
}

function createDescription(html) {
  const _html = html.slice(html.indexOf('\n'))
  const document = new window.DOMParser().parseFromString(_html, 'text/html')
  return document.body.textContent.replaceAll(/\n/g, '').slice(0, 300)
}

function createURL(dir, name) {
  return `${BASE_URL}/${dir.slice(6)}/${name}.html`
}

function createHTML(title, body, description, url) {
  const html = layout
    .replaceAll(TITLE, title).replace(BODY, body)
    .replaceAll(DESCRIPTION, description).replace(URL, url)
  return html
}

function createIndexPage(pages) {
  const title = 'Tips'
  const body = DOMPurify.sanitize(marked.parse(pages.map(p => `* [${p.title}](${p.url})`).join('\n')))
  const description = createDescription(body)
  const html = createHTML(title, body, description, BASE_URL)
  return html
}

const markDownFileNames = await getMarkDownFileNames()
const pages = []
for (let markDownfileName of markDownFileNames) {
  const md = await fs.promises.readFile(markDownfileName, 'utf8')
  const title = createTitle(md)
  const body = DOMPurify.sanitize(marked.parse(md))
  const description = createDescription(body)
  const { name, dir } = path.parse(markDownfileName)
  const dirPath = `./docs/${dir.slice(6)}`
  if (!fs.existsSync(dirPath)) {
    await fs.promises.mkdir(dirPath)
  }
  const htmlFileName = `${dirPath}/${name}.html`
  const url = createURL(dir, name)
  const html = createHTML(title, body, description, url)
  await fs.promises.writeFile(htmlFileName, html)
  pages.push({
    title,
    url
  })
}

const indexPage = createIndexPage(pages)
await fs.promises.writeFile('docs/index.html', indexPage)