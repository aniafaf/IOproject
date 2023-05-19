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

export type PaymentCategory = 'HH' | 'F' | 'E' | 'O'
export const payment_categories: PaymentCategory[] = ['HH', 'F', 'E', 'O']
export const string_of_payment_category = (str?: PaymentCategory) => {
  const map: Record<PaymentCategory, string> = {
    HH: 'Household',
    F: 'Food',
    E: 'Entertainment',
    O: 'Other',
  }

  return str && str in map ? map[str] : ''
}

export interface Payment {
  id: number
  name: string
  amount: string
  event: Event
  category: string
  description?: string
  lender: User
}

export interface EventDetails {
  event: Event
  payments: Payment[]
}

export interface GroupCreationForm {
  name: string
}

export interface GroupJoinForm {
  group_id: number
  hash: number
}

export interface PaymentCreationForm {
  name: string
  amount: number
  category?: PaymentCategory
  description?: string
  even?: boolean
  users_id: number[]
  users_debt: number[]
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

export const get_event_details = (group_id: number, event_id: number) =>
  fetch_api<EventDetails>({
    path: `group/${group_id}/event/${event_id}/`,
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

export const get_payment_add_details = (groupId: number, eventId: number) =>
  fetch_api<{ users: User[] }>({
    path: `group/${groupId}/event/${eventId}/create_payment/`,
    method: 'GET',
  })

export const post_payment_add = (
  groupId: number,
  eventId: number,
  form: PaymentCreationForm,
) =>
  fetch_api<true>({
    path: `group/${groupId}/event/${eventId}/create_payment/`,
    method: 'POST',
    body: Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== undefined),
    ),
  })
