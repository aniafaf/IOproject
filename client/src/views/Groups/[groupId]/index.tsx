import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { get_group_details, GroupDetails } from '../../../api/groups'
import { LoggedInGuard } from '../../../components/LoggedInGuard'
import { Spinner } from '../../../components/Spinner'
import { TabPanel } from '../../../components/TabPanel'
import { useAlert } from '../../../hooks/alert'
import { Route } from '../../../routes'
import { EventItemElement } from './components/EventItemElement'
import { EventPanel } from './components/EventPanel'
import { UserPanel } from './components/UserPanel'

export const GroupView = () => {
  const { groupId } = useParams()
  const [{ users, events }, setGroup] = useState<GroupDetails>({
    events: [],
    users: [],
  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const alert = useAlert()
  const [tabIndex, setTabIndex] = useState(0)

  if (!groupId) {
    navigate(Route.groups.list())
  }

  useEffect(() => {
    get_group_details(+groupId!)
      .then(r => (r.ok ? setGroup(r.data) : alert.display(r.error, 'error')))
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [groupId])

  const onTabChange = (_: unknown, newIndex: number) => setTabIndex(newIndex)

  return (
    <>
      <LoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />
      <nav className='tab-control'>
        <Tabs value={tabIndex} onChange={onTabChange}>
          <Tab label='Events' />
          <Tab label='Users' />
        </Tabs>
      </nav>
      <div className='tabs'>
        <TabPanel index={0} value={tabIndex}>
          <UserPanel users={users} groupId={+groupId!} />
        </TabPanel>
        <TabPanel index={1} value={tabIndex}>
          <EventPanel events={events} groupId={+groupId!} />
        </TabPanel>
        {users.map(user => <div>{user.name}</div>)}
      </div>
    </>
  )
}
