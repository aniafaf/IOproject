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
  group: Group
}

export interface GroupCreationForm {
  name: string
}

export const get_group_list = () =>
  fetch_api<{ groups: Group[] }>({
    path: 'group_list/',
    method: 'POST',
  })

export const get_group_details = (id: number) =>
  fetch_api<GroupDetails>({
    path: `group/${id}/`,
    method: 'POST',
  })

export const post_group_create = (form: GroupCreationForm) =>
  fetch_api({
    path: 'create_group/',
    method: 'POST',
    body: form,
  })
