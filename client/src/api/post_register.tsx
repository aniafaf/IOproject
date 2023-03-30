import { fetch_api } from './call'

export const post_register =  (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) =>
  fetch_api({
    path: 'signup/',
    method: 'POST',
    body: {firstName, lastName, username, email, password},
  })
