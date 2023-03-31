import { fetch_api } from './call'

export const post_recover = (email: string) =>
  fetch_api({
    path: '/',
    method: 'POST',
    body: { email },
  })
