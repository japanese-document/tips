import { createTitle }  from './utils.js'

describe('createTitle', () => {
  test('output', () => {
    const title = createTitle('0123456789\n012346789\n0123456789')
    expect(title).toBe('23456789')
  })
})