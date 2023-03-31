import { fetch_api } from './call'

export const post_register = (
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  password: string,
) =>
  fetch_api({
    path: 'signup/',
    method: 'POST',
    body: { first_name, last_name, username, email, password },
  })
