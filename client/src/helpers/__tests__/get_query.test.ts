// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest'
import { get_query } from '../get_query'

describe('get_token', () => {
  let base_url = location.href
  beforeEach(() => {
    location.href = base_url
  })

  it('throws without key', () => {
    const key = 'invalid_key'
    return get_query(key)
      .then(r =>
        expect(
          false,
          `expected the promise to throw but got '${r}' instead`,
        ).toBeTruthy(),
      )
      .catch(e => expect(e).toBe(`${key} not found in the url.`))
  })

  it('detects correct token', () => {
    const key = 'token'
    const expected_token = 'bly3bt-1cba8075ab3db3fd138be362953fa8de'
    location.href += `?${key}=${expected_token}`
    return get_query(key)
      .catch(e =>
        expect(
          false,
          `expected the promise to resolve but caught '${e}' instead`,
        ).toBeTruthy(),
      )
      .then(r => expect(r).toBe(expected_token))
  })
})
