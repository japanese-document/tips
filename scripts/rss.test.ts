import { SortedLimitedArray }  from './rss.js'

describe('SortedLimitedArray', () => {
  test('create', () => {
    const arr1 = SortedLimitedArray.create([7, 1, 5, 2, 6, 3, 4], 3, (a, b) => a - b)
    expect([...arr1]).toEqual([1, 2, 3])

    const arr2 = SortedLimitedArray.create([7, 1, 5], 4, (a, b) => a - b)
    expect([...arr2]).toEqual([1, 5, 7])
  })

  test('push', () => {
    const arr = SortedLimitedArray.create([7, 1, 5, 2, 6, 3, 4], 3, (a, b) => a - b)
    const length = arr.push(-1)
    expect([...arr]).toEqual([-1, 1, 2])
    expect(length).toBe(3)
  })
})