import { History, Location, Action } from 'history'
import { HistoryStoreInterface } from './createHistoryStore'

const syncHistory = (
  history: History,
  store: HistoryStoreInterface
): HistoryStoreInterface => {
  const handleLocationChange = (location: Location, action: Action): void => {
    switch (action) {
      case 'PUSH':
        store.push(location)
        break
      case 'POP':
        /**
         * history 默认页面总是 pop, 首次加载页面时, action 为 pop
         * 但是实际应为 push, 此处需要进行判断
         * 首次 action 为 pop 时, location 不生成 key
         */
        if (!location.key) {
          store.push(location)
        } else {
          store.pop()
        }
        break
      case 'REPLACE':
        store.replace(location)
        break
    }
  }

  history.listen(handleLocationChange)

  handleLocationChange(history.location, history.action)

  return store
}

export default syncHistory
