export class Route {
  static home = () => '/'
  static login = () => '/login'
  static sign_up = () => '/sign-up'
  static activate = () => '/activate'
  static recovery = () => '/recovery'
  static groups = () => '/groups'
  static group = (id: number) => `/groups/${id}`
  static groupCreate = () => '/groups/create'
}
