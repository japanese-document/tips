import { createTitle, createDescription }  from './utils.js'

describe('createTitle', () => {
  test('output', () => {
    const title = createTitle('0123456789\n012346789\n0123456789')
    expect(title).toBe('23456789')
  })
})

describe('createDescription', () => {
  test('output', () => {
    const html = `foo\n${'1234"'.repeat(40)}`
    const result = '1234&quot;'.repeat(30)
    const description = createDescription(html)
    expect(description).toBe(result)
  })
})