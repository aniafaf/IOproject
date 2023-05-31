import { fetch_api } from './call'

export const post_recover_password = (
  password: string,
  passwordConfirmation: string,
) =>
  fetch_api({
    path: '/',
    method: 'POST',
    body: { password, passwordConfirmation },
  })
