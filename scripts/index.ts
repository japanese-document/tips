import fs from 'node:fs'
import path from 'node:path'
import { createTitle, getMarkDownFileNames, getMetaAndMd, createURL, createPage, createIndexPage, Page } from './utils.js'

const layout = fs.readFileSync('src/layout.html', 'utf8')

const markDownFileNames = await getMarkDownFileNames()
const pages: Page[] = []
for (const markDownfileName of markDownFileNames) {
  const content = await fs.promises.readFile(markDownfileName, 'utf8')
  const [meta, md] = getMetaAndMd(content)
  const title = createTitle(md)
  const { name, dir } = path.parse(markDownfileName)
  const url = createURL(dir, name)
  const page = await createPage(layout, md, title, url)
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
const indexPage = createIndexPage(layout, pages)
await fs.promises.writeFile('docs/index.html', indexPage)