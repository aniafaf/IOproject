import { describe, it, expect } from 'vitest'
import { delete_groups } from '../test/delete_groups'

describe('delete_groups', () => {
  it(`succeeds`, () =>
    delete_groups()
      .then(r => (expect(r.ok).toBeTruthy(), expect(r.data).toBeTruthy()))
      .catch(e => expect(e).toBeUndefined()))
})
