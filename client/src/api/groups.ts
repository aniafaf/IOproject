import { fetch_api } from './call'
import { User } from './users'

export interface Group {
  id: number
  name: string
  admin: User
}

export interface Event {
  id: number
  name: string
  group: Group
}

export interface GroupDetails {
  users: User[]
  events: Event[]
}

export const get_group_list = () =>
  fetch_api<{ groups: Group[] }>({
    path: 'group_list/',
    method: 'GET',
  })

export const get_group_details = (id: number) =>
  fetch_api<GroupDetails>({
    path: `group_selected/?pk=${id}`,
    method: 'GET',
  })