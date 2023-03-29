import { fetch_api } from './call'

export const post_login = async (username: string, password: string) => {
  const response = await fetch_api({
    path: 'login/',
    method: 'POST',
    body: { username, password },
  })
  return response;
}

