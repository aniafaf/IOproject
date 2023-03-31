import { fetch_api } from './call'

export const post_activate = (uid: string, token: string) =>
  fetch_api({
    path: `activate/`,
    method: 'PATCH',
    body: {
      token,
      uid,
    },
  })
