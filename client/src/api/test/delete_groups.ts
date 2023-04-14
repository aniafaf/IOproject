import { fetch_api } from '../call'

export const delete_groups = () =>
  fetch_api({
    path: 'delete-all-groups/',
  })
