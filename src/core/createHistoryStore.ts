import { Location } from 'history'
import storage from '../utils/storage'

export interface HistoryStoreInterface {
  length: number
  current: Location
  previous: Location
  push: (location: Location) => void
  pop: () => void
  replace: (location: Location) => void
}

interface HistoryStoreOptions {
  cacheName?: string
}

class HistoryStore implements HistoryStoreInterface {
  private stack: Location[]
  private options: HistoryStoreOptions

  public constructor(options: HistoryStoreOptions) {
    this.options = { cacheName: '_rhs_', ...options }
    this.stack =
      storage.getItem(`${this.options.cacheName}_history_stack_`) || []
  }

  public get length(): number {
    return this.stack.length
  }

  public get current(): Location {
    return this.stack[this.length - 1]
  }

  public get previous(): Location {
    return this.stack[this.length - 2]
  }

  public push(location: Location): void {
    this.stack.push(location)
    storage.setItem(`${this.options.cacheName}_history_stack_`, this.stack)
  }

  public pop(): void {
    this.stack.pop()
    storage.setItem(`${this.options.cacheName}_history_stack_`, this.stack)
  }

  public replace(location: Location): void {
    this.stack.splice(this.length - 1, 1, location)
    storage.setItem(`${this.options.cacheName}_history_stack_`, this.stack)
  }
}

function createHistoryStore(
  options: HistoryStoreOptions
): HistoryStoreInterface {
  return new HistoryStore(options)
}

export default createHistoryStore
