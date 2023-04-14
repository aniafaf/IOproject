import { fetch_api } from './call'
import { User } from './users'

export interface Group {
  id: number
  name: string
  admin_id: number
  hash: number
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

export interface GroupJoinForm {
  group_id: number
  hash: number
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
  fetch_api<Group>({
    path: 'create_group/',
    method: 'POST',
    body: form,
  })

export const post_group_join = (form: GroupJoinForm) =>
  fetch_api({
    path: 'join/',
    method: 'POST',
    body: form,
  })
