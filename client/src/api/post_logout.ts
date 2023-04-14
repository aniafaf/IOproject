import { fetch_api } from './call'

export const post_logout = () =>
  fetch_api({
    path: 'logout/',
  })
