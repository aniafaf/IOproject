import { fetch_api } from '../call'

export const delete_users = () =>
  fetch_api({
    path: 'delete-all/',
    method: 'POST',
    body: {}
  })
