/**
 * Generic API response type. `T` is the data type returned by the API. `E` is the error type of the given API endpoint.
 */
export type ApiResponse<T, E = string> =
  | {
      ok: true
      data: T
      error: null
    }
  | {
      ok: false
      data: null
      error: E
    }

/**
 * @description Value returned by call factories. Factories should themselves handle error detection, and only return the ready error/data.
 * @example
 *  ```ts
 *  const USER_ENDPOINT = `${API_URL}/user`
 *  export const user_get = (user_id: string): ApiCall<UserData, UserError> =>
 *    fetch_api(`${USER_ENDPOINT}/get`, { user_id })
 *  ```
 */
export type ApiCall<T, E = string> = Promise<ApiResponse<T, E>>
