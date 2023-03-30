import { fetch_api } from './call'

export const post_login = (username: string, password: string) =>
  fetch_api({
    path: 'login/',
    method: 'POST',
    body: { username, password },
  })
