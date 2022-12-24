import { parseArgs } from 'node:util'

const { values: { dev } } = parseArgs({
  options: {
    dev: {
      type: 'boolean'
    }
  }
})

export const TITLE = /__TITLE__/g
export const BODY = '__BODY__'
export const CSS = '__CSS__'
export const CSS_PATH = dev ? '/app.css?v=001' : '/tips/app.css?v=001'
export const BASE_URL = dev ? 'http://127.0.0.1:8000' : 'https://japanese-document.github.io/tips'
export const URL = '__URL__'
export const DESCRIPTION = /__DESCRIPTION__/g
export const SEPARATOR = /---(.*)/s