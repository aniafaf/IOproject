import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get_group_list, GroupListItem } from '../../api/groups'
import { LoggedInGuard } from '../../components/LoggedInGuard'
import { Spinner } from '../../components/Spinner'
import { useAlert } from '../../hooks/alert'
import { Route } from '../../routes'
import { GroupListItemElement } from './components/GroupListItemElement'

export const GroupListView = () => {
  const [groups, setGroups] = useState<GroupListItem[]>([])
  const [loading, setLoading] = useState(true)
  const alert = useAlert()

  useEffect(() => {
    get_group_list()
      .then(r => {
        if (r.ok) {
          setGroups(r.data)
        } else {
          alert.display(r.error, 'error')
        }
      })
      .catch(e => alert.display(e, 'error'))
      .finally(() => setLoading(false))
  }, [])

  /**@todo add layout */
  return (
    <>
      <LoggedInGuard />
      <alert.AlertComponent />
      <Spinner open={loading} />

      <Link to={Route.groupCreate()}>add group</Link>
      <ol className='group-list'>
        {groups.map((group, i) => (
          <GroupListItemElement {...group} key={i} />
        ))}
      </ol>
    </>
  )
}
