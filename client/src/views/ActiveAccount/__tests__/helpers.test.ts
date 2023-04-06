// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest'
import { get_token, get_uid } from '../helpers'

describe('get_uid + get_token', () => {
  const valid_token = 'bly3bt-1cba8075ab3db3fd138be362953fa8de'
  const valid_uid = 'Mg'

  let base_url = location.href
  beforeEach(() => {
    location.href = base_url
  })

  it('uid throws when only token is present', () => {
    location.href += `?token=${valid_token}`
    return get_uid()
      .then(
        r =>
          expect(false, `Expected promise to throw but got ${r} instead.`)
            .toBeTruthy,
      )
      .catch(e => expect(e).toBe('UID not found in the url.'))
  })

  it('token throws when only uid is present', () => {
    location.href += `?uid=${valid_uid}`
    return get_token()
      .then(
        r =>
          expect(false, `Expected promise to throw but got ${r} instead.`)
            .toBeTruthy,
      )
      .catch(e => expect(e).toBe('token not found in the url.'))
  })

  it('both resolve when present', () => {
    location.href += `?uid=${valid_uid}&token=${valid_token}`
    return Promise.all([get_uid(), get_token()])
      .then(rs => expect(rs).toEqual([valid_uid, valid_token]))
      .catch(e =>
        expect(
          false,
          `Expected promise to resolve but got an unexpected error '${e}' instead`,
        ).toBeTruthy(),
      )
  })
})
