import { fetch_api } from '../call'
import { describe, expect, it } from 'vitest'
import path from 'path'

describe('fetch_api', () => {
  it('fails on unresolved url', () =>
    fetch_api({ path: '/inexistent/api' }).then(r => expect(r.ok).toBeFalsy()))

  it('resolves on existent url', () =>
    /**@todo replace by an existent api, and remove `transformer` */
    fetch_api({
      path: '',
      __path: 'https://dummyjson.com/products',
      method: 'GET',
      transformer: data => ({ ok: true, data, error: null }),
    }).then(r => expect(r.ok).toBeTruthy()))

  it('sends body record', () => {
    const title = 'an exciting new product name!'

    /**@todo replace by an existent api, and remove `transformer` */
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

  /**@todo add a transformerless test when the api is ready */
})
