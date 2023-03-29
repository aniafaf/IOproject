import { fetch_api } from './call'

const post_login = async (email: string, password: string) => {
  const response = await fetch_api({
    path: '/api/login',
    method: 'POST',
    body: { email, password },
  })
  return response;
}

