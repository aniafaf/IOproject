// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { useForm } from '../form'
import { renderHook } from '@testing-library/react'

describe('useForm', () => {
  it('Id when unmodified', () => {
    const obj = { a: 2 }
    const {
      result: {
        current: [_, form],
      },
    } = renderHook(() => useForm(obj))
    expect(form).toEqual(obj)
  })

  it('Modifies field', () => {
    const obj = { a: 2 }
    const { result, rerender } = renderHook(() => useForm(obj))
    result.current[0]('a', 5)
    rerender()
    expect(result.current[1]).toEqual({ a: 5 })
  })
})
