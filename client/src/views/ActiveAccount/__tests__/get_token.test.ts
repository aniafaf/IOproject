// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest'
import { get_token } from '../helpers'

describe('get_token', () => {
  let base_url = location.href
  beforeEach(() => {
    location.href = base_url
  })

  it('throws without token', () => {
    return get_token()
      .then(r =>
        expect(
          false,
          `expected the promise to throw but got '${r}' instead`,
        ).toBeTruthy(),
      )
      .catch(e => expect(e).toBe('token not found in the url.'))
  })

  it('detects correct token', () => {
    const expected_token = 'bly3bt-1cba8075ab3db3fd138be362953fa8de'
    location.href += `?token=${expected_token}`
    return get_token()
      .catch(e =>
        expect(
          false,
          `expected the promise to resolve but caught '${e}' instead`,
        ).toBeTruthy(),
      )
      .then(r => expect(r).toBe(expected_token))
  })
})
