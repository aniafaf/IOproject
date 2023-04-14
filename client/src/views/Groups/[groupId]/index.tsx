import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  get_group_details,
  get_group_list,
  GroupDetails,
} from '../../../api/groups'
import { LoggedInGuard } from '../../../components/LoggedInGuard'
import { Spinner } from '../../../components/Spinner'
import { TabPanel } from '../../../components/TabPanel'
import { useAlert } from '../../../hooks/alert'
import { Route } from '../../../routes'
import { EventItemElement } from './components/EventItemElement'
import { EventPanel } from './components/EventPanel'
import { UserPanel } from './components/UserPanel'
import { LoggedInPanel } from '../../../components/LoggedInPanel'
import { GroupListItemElement } from '../components/GroupListItemElement'
import { GroupDetailsBox } from '../../../components/GroupDetailsBox'
import { Group } from '../../../api/groups'

export const GroupView = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const { groupId } = useParams()
  const [{ users, events, group }, setGroup] = useState<Partial<GroupDetails>>({
    events: [],
    users: [],
    group: undefined,
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const alert = useAlert()

  if (!groupId) {
    navigate(Route.groups.list())
  }

  useEffect(() => {
    get_group_details(+groupId!)
      .then(r => (r.ok ? setGroup(r.data) : alert.display(r.error, 'error')))
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [groupId])

  useEffect(() => {
    get_group_list()
      .then(r =>
        r.ok ? setGroups(r.data.groups) : alert.display(r.error, 'error'),
      )
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <LoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <div className='main_page_box'>
        <div className='user_info'>
          <div className='user_info--top'>
            <LoggedInPanel
              setLoading={setLoading}
              onLogoutError={e => alert.display(e, 'error')}
            />
          </div>
          <div className='user_info--bottom'>
            <div className='group_list_box'>
              <h2 style={{ color: '#073B78', fontFamily: 'Libre Bodoni' }}>
                groups
              </h2>
              <ul className='group_list'>
                {groups.map((group, i) => (
                  <GroupListItemElement {...group} key={i} />
                ))}
              </ul>
            </div>
            <div>
              <button
                className='groups_button'
                onClick={() => navigate(Route.groups.create())}
              >
                add
              </button>
            </div>
          </div>
        </div>
        <GroupDetailsBox group={group} users={users!} events={events!} />
      </div>
    </>
  )
}
