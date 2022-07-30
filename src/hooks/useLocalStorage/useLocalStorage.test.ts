import { renderHook } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'
import { act } from 'react-dom/test-utils'
describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should return initial value when local storage does not contain this value', () => {
    const testValues = {
      key: 'testKey',
      value: 'initialTestValue',
    }

    const { result } = renderHook(() => useLocalStorage(testValues.key, testValues.value))
    const [value] = result.current

    expect(value).toBe(testValues.value)
  })

  it('should return value from local storage after set value in local storage', () => {
    const testValues = {
      key: 'testKey',
      value: 'value',
    }
    window.localStorage.setItem(testValues.key, testValues.value)

    const { result } = renderHook(() => useLocalStorage(testValues.key, ''))
    const [value] = result.current

    expect(value).toBe(testValues.value)
  })

  it('should set value in local storage', async () => {
    const testValues = {
      key: 'testKey',
      value: 'initialTestValue',
      newValue: 'newTestValue',
    }

    const { result } = renderHook(() => useLocalStorage(testValues.key, testValues.value))
    act(() => {
      result.current[1](testValues.newValue)
    })
    expect(result.current[0]).toBe(testValues.newValue)
  })
})
