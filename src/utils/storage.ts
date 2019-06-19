export const setItem = (key: string, value: any): void => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const getItem = (key: string): any => {
  const value = sessionStorage.getItem(key)

  return value ? JSON.parse(value) : null
}

export default {
  setItem,
  getItem
}
