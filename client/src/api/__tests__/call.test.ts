import { fetch_api } from '../call'
import { describe, expect, it } from 'vitest'

describe('fetch_api', () => {
  it('fails on unresolved url', () =>
    fetch_api('/inexistent/api').then(r => expect(r.ok).toBeFalsy()))
})
