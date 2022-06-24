import { useState } from 'react'

export const useLocalStorage = <T = string>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const getInitialStoredValue = () => {
    const storageItem = window.localStorage.getItem(key)
    return storageItem ? (JSON.parse(JSON.stringify(storageItem)) as T) : initialValue
  }

  const [storedValue, setStoredValue] = useState(getInitialStoredValue())

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  console.log('updateValue', storedValue)

  return [storedValue, setValue]
}
