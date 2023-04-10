import { fetch_api } from './call'

export interface GroupListItem {
  name: string
  id: string
}

export const get_group_list = () =>
  fetch_api<GroupListItem[]>({
    //! @todo update endpoint
    path: 'groups/',
    method: 'GET',
  })
