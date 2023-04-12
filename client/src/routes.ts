const prefixed = <R extends Object>(prefix: string, target: R): R => {
  ;(Object.keys(target) as (keyof R)[])
    .filter(k => target[k] instanceof Function)
    .forEach(k => {
      const f = target[k] as Function
      target[k] = ((...args: any[]): any =>
        `${prefix}${f(...args)}`) as R[keyof R]
    })
  return Object.seal(target)
}

export class Route {
  static home = () => '/'
  static login = () => '/login'
  static sign_up = () => '/sign-up'
  static activate = () => '/activate'
  static recovery = () => '/recovery'

  static groups = prefixed('/groups', {
    list: () => '/',
    byId: (id: number) => `${id}`,
    create: () => '/create',
    join: () => '/join',
  })
}

export class RoutePattern {
  static group = () => '/groups/:groupId'
}
