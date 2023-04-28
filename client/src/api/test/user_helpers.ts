import { post_login } from '../post_login'
import { post_register } from '../post_register'
import { User } from '../users'
import { delete_users } from './delete_users'

type UserHelperProps = Partial<Omit<User, 'id'>> & {
  username: string
  password: string
}

const default_user_props: Omit<User, 'id' | 'username'> = {
  email: 'agavin@gmail.com',
  first_name: 'Ashley',
  last_name: 'Gavin',
}

export interface AuxProps {
  form: UserHelperProps
  login: () => ReturnType<typeof post_login>
  register: () => ReturnType<typeof post_register>
  free_register: () => ReturnType<typeof post_register>
}

export const mkUserHelper = async <
  F extends (args: AuxProps) => PromiseLike<any>,
>(
  form: UserHelperProps,
  aux_func?: F,
) => {
  const { password, username, email, first_name, last_name } = form
  const register = () =>
    post_register(
      first_name ?? default_user_props.first_name,
      last_name ?? default_user_props.last_name,
      username,
      email ?? default_user_props.email,
      password,
    )
  const free_register = () => delete_users().then(register)
  const login = () => post_login(username, password)
  const base = { register, login, free_register, form }

  const data = aux_func ? await aux_func(base) : {}
  return {
    ...base,
    data: data as Awaited<ReturnType<F>>,
  }
}
