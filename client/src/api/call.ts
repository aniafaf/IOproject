import { API_URL } from './constants'
import { ApiCall, ApiResponse } from './types'

export type RequestMethod =
  | 'POST'
  | 'GET'
  | 'INSERT'
  | 'PUT'
  | 'DELETE'
  | 'UPDATE'
  | 'HEAD'
  | 'PATCH'

export interface FetchApiArgs<
  T = unknown,
  O extends Object = Object,
  E = string,
> {
  /**API path that will be appended to `API_URL`. Shouldn't start with a `/`. */
  path: string
  body?: O
  method?: RequestMethod
  headers?: Record<string, string>
  __path?: string
  transformer?: <R extends Object>(record: R) => ApiResponse<T, E>
}

/**
 * A utility wrapper around `fetch` for API calls.
 */
export const fetch_api = <T = unknown, O extends Object = Object, E = string>({
  path,
  method,
  body,
  headers: _headers,
  __path,
  transformer,
}: FetchApiArgs<T, O, E>): ApiCall<T, E> => {
  const headers = (_headers ?? {})!
  if (typeof body === 'object') {
    headers['Content-Type'] ??= 'application/json'
  }

  return fetch(__path ?? `${API_URL}/${path}`, {
    method: method ?? 'POST',
    credentials: 'include',
    ...(body ? { body: JSON.stringify(body, null, 0) } : {}),
    ...{ headers },
  })
    .then(r => r.json().then(json => (transformer ?? (x => x))(json)))
    .catch(e => ({
      ok: false,
      data: null,
      error: {
        source: 'fetch catch',
        ...e,
      } as E,
    }))
}
