import { fetch_api } from './call'

export const post_login = async (email: string, password: string) => {
  const response = await fetch_api({
    path: '/login',
    method: 'POST',
    body: { email, password },
  })
  return response;
}

