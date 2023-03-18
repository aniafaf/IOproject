import { API_URL } from './constants'
import { ApiCall } from './types'

/**
 * A utility wrapper around `fetch` for API calls.
 */
export const fetch_api = <T = unknown, O extends Object = Object, E = string>(
  path: string,
  body?: O,
): ApiCall<T, E> =>
  fetch(`${API_URL}/${path}`, {
    method: 'POST',
    credentials: 'include',
    ...(body ? { body: JSON.stringify(body, null, 0) } : {}),
  })
    .then(r => r.json() as ApiCall<T, E>)
    .catch(e => ({
      ok: false,
      data: null,
      error: JSON.stringify(e) as E,
    }))
