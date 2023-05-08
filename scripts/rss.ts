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