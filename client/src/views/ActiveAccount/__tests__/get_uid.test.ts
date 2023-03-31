// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest'
import { get_uid } from '../helpers'

describe('get_uid', () => {
  let base_url = location.href
  beforeEach(() => {
    location.href = base_url
  })

  it('throws without uid', () => {
    return get_uid()
      .then(r =>
        expect(
          false,
          `expected the promise to throw but got '${r}' instead`,
        ).toBeTruthy(),
      )
      .catch(e => expect(e).toBe('UID not found in the url.'))
  })

  it('detects correct uid', () => {
    const expected_uid = '5dsa4f'
    location.href += `?uid=${expected_uid}`
    return get_uid()
      .catch(e =>
        expect(
          false,
          `expected the promise to resolve but caught '${e}' instead`,
        ).toBeTruthy(),
      )
      .then(r => expect(r).toBe(expected_uid))
  })
})
