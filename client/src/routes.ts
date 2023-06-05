const prefixed = <R extends Object>(prefix: string, target: R): R => {
  ;(Object.keys(target) as (keyof R)[])
    .filter(k => target[k] instanceof Function)
    .forEach(k => {
      const f = target[k] as Function
      target[k] = ((...args: any[]): any => {
        const res = f(...args)

        if (typeof res === 'string') {
          return `${prefix}${res}`
        } else if (typeof res === 'object') {
          return prefixed(prefix, res)
        }

        return res
      }) as R[keyof R]
    })
  return Object.seal(target)
}

export class Route {
  static home = () => '/'
  static login = () => '/login'
  static sign_up = () => '/sign-up'
  static activate = () => '/activate'
  static recovery = () => '/recovery'
  static reset_password_sent = () => '/reset_password_sent'
  static reset_password_complete = () => '/reset_password_complete'
  static reset_password_confirm = () => '/reset_password_confirm'

  static groups = prefixed('/groups', {
    list: () => '/',
    byId: (id: number) => `/${id}`,
    create: () => '/create',
    join: (id: number) => `/${id}/join`,
    events: (group_id: number) =>
      prefixed(`/${group_id}/events`, {
        add: () => '/add',
        byId: (event_id: number) => `/${event_id}`,
        payments: (event_id: number) =>
          prefixed(`/${event_id}/payments`, {
            add: () => '/add',
          }),
      }),
  })
}

export class RoutePattern {
  static group = () => '/groups/:groupId'
  static group_join = () => '/groups/:groupId/join'
  static group_event_add = () => '/groups/:groupId/events/add'
  static group_event = () => '/groups/:groupId/events/:eventId'
  static group_event_payment_add = () =>
    '/groups/:groupId/events/:eventId/payments/add'
}
