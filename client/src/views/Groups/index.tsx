import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get_group_list, Group } from '../../api/groups'
import { LoggedInGuard } from '../../components/LoggedInGuard'
import { Spinner } from '../../components/Spinner'
import { useAlert } from '../../hooks/alert'
import { Route } from '../../routes'
import { GroupListItemElement } from './components/GroupListItemElement'
import { FormLink } from '../../components/FormLink'
import { FormButton } from '../../components/FormButton'
import { LoggedInPanel } from '../../components/LoggedInPanel'
import { GroupDetailsBox } from '../../components/GroupDetailsBox'

export const GroupListView = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const alert = useAlert()
  const navigate = useNavigate()

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
        <GroupDetailsBox />
      </div>
    </>
  )
}
