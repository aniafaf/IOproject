import { describe, it, expect } from 'vitest'
import { s, str } from '../str'

const obj = {
  a: 1,
  b: {
    c: [2, 3],
  },
}

describe('str', () => {
  it('stringifies objects', () => {
    expect(str(obj)).toEqual(JSON.stringify(obj, null, 2))
  })

  it('stringifies primitives', () => {
    expect(str(5)).toEqual('5')
    expect(str('Hello')).toEqual('Hello')
  })
})

describe('s', () => {
  it('stringifies strings', () => {
    expect(s`str`).toEqual('str')
  })

  it('stringifies objects', () => {
    expect(s`${obj}`).toEqual(JSON.stringify(obj, null, 2))
  })

  it('stringifies combinations', () => {
    expect(s`obj=${obj}, ${5} is five`).toEqual(`obj=${str(obj)}, 5 is five`)
  })
})
