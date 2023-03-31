import { fetch_api } from './call'

export const post_activate = (
  activationCode: string,
) =>
  fetch_api({
    path: '/',
    method: 'POST',
    body: { activationCode },
  })
