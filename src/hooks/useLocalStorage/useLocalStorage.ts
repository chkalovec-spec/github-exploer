import { useState } from 'react'

export const useLocalStorage = <T = string>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const getInitialStoredValue = () => {
    const storageItem = window.localStorage.getItem(key) || ''
    let result
    try {
      result = JSON.parse(storageItem) as T
    } catch (err) {
      result = JSON.parse(JSON.stringify(storageItem)) as T
    } finally {
      return storageItem ? (result as T) : initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(getInitialStoredValue())

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
