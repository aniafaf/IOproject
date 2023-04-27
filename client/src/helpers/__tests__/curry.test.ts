import { describe, it, expect } from 'vitest'
import { curry } from '../curry'

describe('curry', () => {
  it('curry2', () => {
    const f = curry((a: number, b: string): string => `${a}${b}`)
    expect(f.length).toBe(1)
    expect(f(1)('H')).toBe('1H')
  })
})
