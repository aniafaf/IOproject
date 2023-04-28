import { fetch_api } from '../call'
import { describe, expect, it } from 'vitest'

describe('fetch_api', () => {
  it('fails on unresolved url', () =>
    fetch_api({ path: '/inexistent/api' }).then(r => expect(r.ok).toBeFalsy()))

  it('resolves on existent url', () =>
    fetch_api({
      path: '',
      __path: 'https://dummyjson.com/products',
      method: 'GET',
      transformer: data => ({ ok: true, data, error: null }),
    }).then(r => expect(r.ok).toBeTruthy()))

  it('sends body record', () => {
    const title = 'an exciting new product name!'

    return fetch_api<{ title: string }>({
      path: '',
      __path: 'https://dummyjson.com/products/add',
      method: 'POST',
      body: { title },
      transformer: data => ({
        ok: true,
        data: data as any as { title: string },
        error: null,
      }),
    }).then(r => (expect(r.ok).toBeTruthy(), expect(r.data?.title).toBe(title)))
  })

  it('sends headers', () => {
    const body = 'x'
    const content_type = 'invalid/content/type'

    return fetch_api({
      path: '',
      __path: 'http://postman-echo.com/post',
      method: 'POST',
      headers: { 'content-type': content_type },
      body,
      transformer: data => ({
        ok: true,
        data: data as any,
        error: null,
      }),
    }).then(r => {
      expect(r.ok).toBeTruthy()
      expect(r.data.headers['content-type']).toBe(content_type)
      return expect(r.error).toBeNull()
    })
  })

  it('stringifies object error', () => {
    const obj = { a: 'Hello' }
    return fetch_api({
      path: '',
      __path: 'http://postman-echo.com/post',
      transformer: _ => {
        throw obj
      },
    }).then(r => {
      expect(r.ok).toBeFalsy()
      expect(r.error).toEqual({ source: 'fetch catch', ...obj })
    })
  })

  it('stringifies primitive error', () => {
    const error = 'Hello'
    return fetch_api({
      path: '',
      __path: 'http://postman-echo.com/post',
      transformer: _ => {
        throw error
      },
    }).then(r => {
      expect(r.ok).toBeFalsy()
      expect(r.error).toEqual({ source: 'fetch catch', error })
    })
  })
})
