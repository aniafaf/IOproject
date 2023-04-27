import { fetch_api } from './call'

export interface EventAddForm {
  name: string
  location?: string
}

export const post_event_add = (group_id: number, form: EventAddForm) =>
  fetch_api<boolean>({
    path: `group/${group_id}/create_event/`,
    body: form,
  })
