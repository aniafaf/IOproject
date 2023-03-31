import { afterEach, describe, expect, it } from 'vitest'
import { delete_users } from '../test/detele_users'

describe('delete_users', () => {
  it('succeeds', () =>
    delete_users().then(r => {
      console.dir(r)
      return expect(r.ok).toBeTruthy()
    }))
})
